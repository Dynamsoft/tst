package com.dynamsoft.sample.mrz

import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

/**
 * Generates a self-signed PKCS12 keystore for the HTTPS dev server.
 *
 * We shell out to the JDK's `keytool` once and cache the result next to the
 * project, reusing it on subsequent starts.
 *
 * The certificate must name every address the demo is opened at, not just
 * localhost: a hostname missing from the SAN is rejected outright by mobile
 * browsers, which — unlike desktop — offer no way to proceed. Pass the extra
 * hosts via `APP_CERT_HOST`; see Application.kt.
 *
 * Browsers still show a certificate warning, because the certificate is
 * self-signed — expected for a demo.
 */
object DevKeystore {

    /** Recorded SAN of the cached certificate, so a host change forces a reissue. */
    private const val SAN_MARKER_SUFFIX = ".san"

    private val IPV4 = Regex("""^\d{1,3}(\.\d{1,3}){3}$""")

    fun ensure(keystore: Path, password: String, alias: String, hosts: List<String>) {
        val san = subjectAltName(hosts)
        val marker = keystore.resolveSibling(keystore.fileName.toString() + SAN_MARKER_SUFFIX)

        if (Files.isRegularFile(keystore)) {
            val cachedSan = runCatching { Files.readString(marker).trim() }.getOrNull()
            if (cachedSan == null) {
                // No marker means we did not generate this one. It could be a real
                // certificate someone dropped in, so leave it strictly alone.
                println("[INFO] Using existing keystore, which this sample did not generate: $keystore")
                return
            }
            if (cachedSan == san) {
                println("[INFO] Using existing dev certificate: $keystore")
                println("[INFO] Certificate covers: $san")
                return
            }
            // Our own certificate does not name the hosts we are about to serve on,
            // so it would be rejected. Reissue rather than fail late.
            println("[INFO] Dev certificate covers $cachedSan, need $san — regenerating.")
            Files.deleteIfExists(keystore)
        }

        val keytool = locateKeytool()
            ?: error(
                "keytool not found under java.home=${System.getProperty("java.home")}. " +
                    "Run with a JDK, or generate $keystore manually (see README)."
            )

        println("[INFO] Generating self-signed dev certificate: $keystore")
        println("[INFO] Certificate covers: $san")
        val process = ProcessBuilder(
            keytool.toString(),
            "-genkeypair",
            "-alias", alias,
            "-keyalg", "RSA",
            "-keysize", "2048",
            "-validity", "365",
            "-storetype", "PKCS12",
            "-keystore", keystore.toString(),
            "-storepass", password,
            "-keypass", password,
            "-dname", "CN=${hosts.firstOrNull() ?: "localhost"}, OU=Demo, O=Dynamsoft Sample, C=US",
            "-ext", "SAN=$san",
        ).redirectErrorStream(true).start()

        val output = process.inputStream.bufferedReader().readText()
        if (process.waitFor() != 0) {
            error("keytool failed to create $keystore:\n$output")
        }
        Files.writeString(marker, san)
    }

    /**
     * Build the SAN extension value, e.g. `dns:localhost,ip:127.0.0.1,ip:10.0.0.4`.
     * localhost is always included so the server stays usable on the host itself.
     */
    private fun subjectAltName(hosts: List<String>): String =
        (listOf("localhost", "127.0.0.1") + hosts)
            .map { it.trim() }
            .filter { it.isNotEmpty() }
            .distinct()
            .joinToString(",") { host ->
                if (IPV4.matches(host) || host.contains(':')) "ip:$host" else "dns:$host"
            }

    private fun locateKeytool(): Path? {
        val javaHome = System.getProperty("java.home") ?: return null
        val isWindows = System.getProperty("os.name").startsWith("Windows", ignoreCase = true)
        val candidate = Paths.get(javaHome, "bin", if (isWindows) "keytool.exe" else "keytool")
        return candidate.takeIf { Files.isExecutable(it) }
    }
}
