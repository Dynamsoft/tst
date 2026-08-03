package com.dynamsoft.sample.mrz

import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

/**
 * Generates a self-signed PKCS12 keystore for the HTTPS dev server.
 *
 * The Flask sample uses `ssl_context="adhoc"`, which mints a throwaway
 * certificate on every start. Java has no direct equivalent, so we shell out to
 * the JDK's `keytool` once and cache the result next to the project.
 *
 * Browsers will show a certificate warning — expected for a demo, same as Flask.
 */
object DevKeystore {

    fun ensure(keystore: Path, password: String, alias: String) {
        if (Files.isRegularFile(keystore)) {
            println("[INFO] Using existing dev certificate: $keystore")
            return
        }

        val keytool = locateKeytool()
            ?: error(
                "keytool not found under java.home=${System.getProperty("java.home")}. " +
                    "Run with a JDK, or generate $keystore manually (see README)."
            )

        println("[INFO] Generating self-signed dev certificate: $keystore")
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
            "-dname", "CN=localhost, OU=Demo, O=Dynamsoft Sample, C=US",
            "-ext", "SAN=dns:localhost,ip:127.0.0.1",
        ).redirectErrorStream(true).start()

        val output = process.inputStream.bufferedReader().readText()
        if (process.waitFor() != 0) {
            error("keytool failed to create $keystore:\n$output")
        }
    }

    private fun locateKeytool(): Path? {
        val javaHome = System.getProperty("java.home") ?: return null
        val isWindows = System.getProperty("os.name").startsWith("Windows", ignoreCase = true)
        val candidate = Paths.get(javaHome, "bin", if (isWindows) "keytool.exe" else "keytool")
        return candidate.takeIf { Files.isExecutable(it) }
    }
}
