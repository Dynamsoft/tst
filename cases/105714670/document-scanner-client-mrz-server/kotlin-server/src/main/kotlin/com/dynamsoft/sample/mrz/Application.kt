/**
 * Document Scanner client + server-side MRZ - Kotlin / Spring Boot Backend
 *
 * Serves the built React client (Mobile Document Scanner) and exposes
 * `POST /api/mrz`, backed by Dynamsoft Capture Vision Java Edition
 * (`com.dynamsoft:dcv`) using the `ReadPassportAndId` template.
 *
 * NOTE: Spring Boot is used here as a lightweight demo server only. It is NOT a
 * Dynamsoft SDK requirement. The only Dynamsoft dependency is `com.dynamsoft:dcv`.
 *
 * Usage:
 *     cd ../web-client && npm install && npm run build
 *     mvn package && java -jar target/mds-mrz-kotlin-server-1.0.0.jar
 *
 * To reach the demo from another machine, name that machine's address so the
 * dev certificate covers it — the camera needs a secure context:
 *     APP_CERT_HOST=demo.example.com java -jar target/...jar
 */
package com.dynamsoft.sample.mrz

import com.dynamsoft.core.EnumErrorCode
import com.dynamsoft.license.LicenseManager
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import java.net.Inet4Address
import java.net.NetworkInterface
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import kotlin.io.path.absolute
import kotlin.system.exitProcess

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
/**
 * Dynamsoft license key for the server-side engine. Override with the
 * DYNAMSOFT_LICENSE environment variable.
 *
 * This is the Capture Vision Java Edition key — separate from the client-side
 * Mobile Document Scanner key in web-client/src/App.tsx. The two halves,
 * separated by `;`, are passed to initLicense verbatim.
 */
private val LICENSE_KEY: String = System.getenv("DYNAMSOFT_LICENSE")
    ?: "t0096+wAAAHIXZrtjWZ18BFvwSWcizIrQQZReTySwquc2e8N0+J1A7tsGXOhAHw+/HPdrNrElZaao6dCjd+m4RC0CFRw/QP4TvXVS3WxuuzLemjOJjP+Z/MTaopKTyQ7YTjKL;" +
        "t0095+wAAACjW3YfRmVvi3rMkNcbSI3Ja/94W8BJGrjMHMcjsqiPvu9jMmGBGYOLkL5LPVeancrIrckXk3tDAhVdDpWSx11Nv6Qn25+TblfHWmCmo+J8pn9icQqunbt3wMpI="

/** Built React client. Produced by `npm run build` in ../web-client. */
private val STATIC_DIR: Path =
    Paths.get(System.getenv("APP_STATIC_DIR") ?: "../web-client/dist").absolute().normalize()

/**
 * Keystore holding the TLS key. By default a throwaway self-signed certificate is
 * generated here on first start, which is all a demo needs.
 *
 * Point APP_KEYSTORE at your own PKCS12 file to use a real CA-issued certificate
 * instead — then nothing is generated, and APP_KEYSTORE_PASSWORD / APP_KEY_ALIAS
 * describe it. Nothing about the generated certificate is specific to the sample,
 * so it is never committed; see .gitignore.
 */
private val KEYSTORE: Path =
    Paths.get(System.getenv("APP_KEYSTORE") ?: "keystore.p12").absolute().normalize()

/** True when the operator supplied their own keystore, so we must not touch it. */
private val KEYSTORE_IS_EXTERNAL: Boolean = !System.getenv("APP_KEYSTORE").isNullOrBlank()

private val KEYSTORE_PASSWORD: String = System.getenv("APP_KEYSTORE_PASSWORD") ?: "changeit"
private val KEYSTORE_ALIAS: String = System.getenv("APP_KEY_ALIAS") ?: "mds-mrz-demo"

/** Keep in sync with the default in application.yml. */
private val PORT: String = System.getenv("APP_PORT") ?: "8080"

/**
 * Addresses the demo will be opened at, beyond localhost. Comma-separated
 * hostnames and/or IPs, e.g. `APP_CERT_HOST=demo.example.com,203.0.113.10`.
 *
 * On a cloud VM the public address is usually NAT'd and never appears on a local
 * interface, so it cannot be detected — set it here. The detected site-local
 * IPv4 is added as well, which covers plain LAN and same-VNet access.
 */
private val CERT_HOSTS: List<String> =
    ((System.getenv("APP_CERT_HOST") ?: "").split(',') + siteLocalIPv4())
        .map { it.trim() }
        .filter { it.isNotEmpty() }
        .distinct()

/** Site-local IPv4 addresses of the up, non-loopback interfaces. */
private fun siteLocalIPv4(): List<String> = runCatching {
    NetworkInterface.getNetworkInterfaces().asSequence()
        .filter { it.isUp && !it.isLoopback }
        .flatMap { it.inetAddresses.asSequence() }
        .filterIsInstance<Inet4Address>()
        .filter { it.isSiteLocalAddress }
        .mapNotNull { it.hostAddress }
        .toList()
}.getOrDefault(emptyList())

@SpringBootApplication
class Application

fun main(args: Array<String>) {
    // Check that the React client has been built
    val indexPath = STATIC_DIR.resolve("index.html")
    if (!Files.isRegularFile(indexPath)) {
        System.err.println("\n[ERROR] Built client not found at $STATIC_DIR.")
        System.err.println("Build the React client first:\n")
        System.err.println("    cd ../web-client")
        System.err.println("    npm install")
        System.err.println("    npm run build\n")
        exitProcess(1)
    }

    // ---------------------------------------------------------------------
    // Initialize Dynamsoft License (once at startup)
    // ---------------------------------------------------------------------
    try {
        val error = LicenseManager.initLicense(LICENSE_KEY)
        if (error.errorCode != EnumErrorCode.EC_OK &&
            error.errorCode != EnumErrorCode.EC_LICENSE_CACHE_USED &&
            error.errorCode != EnumErrorCode.EC_LICENSE_WARNING
        ) {
            println("[WARNING] License init: ${error.errorCode} - ${error.errorString}")
        } else {
            println("[INFO] Dynamsoft license initialized successfully.")
        }
    } catch (e: Exception) {
        println("[WARNING] License init threw: ${e.message}")
    }

    Files.createDirectories(Paths.get("uploads"))

    // HTTPS is required: the camera only works in a secure context.
    if (KEYSTORE_IS_EXTERNAL) {
        if (!Files.isRegularFile(KEYSTORE)) {
            System.err.println("\n[ERROR] APP_KEYSTORE points at $KEYSTORE, which does not exist.")
            exitProcess(1)
        }
        println("[INFO] Using the supplied keystore: $KEYSTORE")
    } else {
        DevKeystore.ensure(KEYSTORE, KEYSTORE_PASSWORD, KEYSTORE_ALIAS, CERT_HOSTS)
    }

    System.setProperty("spring.web.resources.static-locations", "file:${STATIC_DIR.toUri().path}")
    System.setProperty("server.ssl.key-store", "file:$KEYSTORE")
    System.setProperty("server.ssl.key-store-password", KEYSTORE_PASSWORD)
    System.setProperty("server.ssl.key-alias", KEYSTORE_ALIAS)

    println("\n=== Document Scanner + Server-side MRZ (Kotlin backend) ===")
    println("Open https://localhost:$PORT in your browser")
    for (host in CERT_HOSTS) {
        println("        or https://$host:$PORT from another machine")
    }
    if (System.getenv("APP_CERT_HOST").isNullOrBlank()) {
        println("(Set APP_CERT_HOST=<public host or IP> if you reach this from outside the network)")
    }
    println("(Camera access requires HTTPS; the self-signed certificate warning is expected)")
    println("Serving client from: $STATIC_DIR\n")

    runApplication<Application>(*args)
}
