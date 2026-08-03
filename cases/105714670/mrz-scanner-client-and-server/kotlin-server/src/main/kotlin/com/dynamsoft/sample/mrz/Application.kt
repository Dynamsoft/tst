/**
 * Server-side MRZ Reading - Kotlin / Spring Boot Backend
 *
 * Kotlin port of the Flask backend in ../server.py. Serves the same client-side
 * web app and exposes the same `POST /api/mrz` endpoint, backed by
 * Dynamsoft Capture Vision Java Edition (`com.dynamsoft:dcv`).
 *
 * NOTE: Spring Boot is used here as a lightweight demo server only. It is NOT a
 * Dynamsoft SDK requirement. For production, replace with your own backend
 * framework and deploy in your trusted server environment (AWS, Azure, Docker, etc.).
 * The only Dynamsoft dependency is `com.dynamsoft:dcv`.
 *
 * Usage:
 *     mvn spring-boot:run
 */
package com.dynamsoft.sample.mrz

import com.dynamsoft.core.EnumErrorCode
import com.dynamsoft.license.LicenseManager
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import kotlin.io.path.absolute
import kotlin.system.exitProcess

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
/** Replace with your Dynamsoft license key, or use the default trial key. */
private val LICENSE_KEY: String = System.getenv("DYNAMSOFT_LICENSE")
    ?: "t0088YQEAAFh/OZigpDdsTt66t1qqV+s+1FL+g1uMNkTAlHqBrWse9B4eUPu6T2TjQxM1po5jXUnOVTCwrvb+9/7+pZLvZhTM9INpH03uZuK9WbK7aVgHZO1KbQ=="

/**
 * Directory holding the client-side web app. Defaults to the `static/` folder of
 * the sibling Python project so both backends serve the exact same client, with
 * no duplication of the ~46 MB engine resources.
 */
private val STATIC_DIR: Path =
    Paths.get(System.getenv("APP_STATIC_DIR") ?: "../static").absolute().normalize()

private const val KEYSTORE_PASSWORD = "changeit"
private const val KEYSTORE_ALIAS = "mrz-demo"

@SpringBootApplication
class Application

fun main(args: Array<String>) {
    // Check that client-side resources have been set up (mirrors server.py)
    val bundlePath = STATIC_DIR.resolve("dist").resolve("mrz-scanner.bundle.js")
    if (!Files.isRegularFile(bundlePath)) {
        System.err.println("\n[ERROR] Client resources not found in $STATIC_DIR/dist/.")
        System.err.println("Run the setup script first:\n")
        System.err.println("    npm install")
        System.err.println("    bash setup_resources.sh\n")
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

    // Self-signed cert for HTTPS (camera access) — equivalent to Flask's
    // ssl_context="adhoc". Generated once, then reused.
    val keystore = Paths.get("keystore.p12").absolute().normalize()
    DevKeystore.ensure(keystore, KEYSTORE_PASSWORD, KEYSTORE_ALIAS)

    // Serve the client from STATIC_DIR, and point Boot's SSL config at the keystore.
    System.setProperty("spring.web.resources.static-locations", "file:${STATIC_DIR.toUri().path}")
    System.setProperty("server.ssl.key-store", "file:$keystore")
    System.setProperty("server.ssl.key-store-password", KEYSTORE_PASSWORD)
    System.setProperty("server.ssl.key-alias", KEYSTORE_ALIAS)

    println("\n=== Araxia Document Verification Demo (Kotlin backend) ===")
    println("Open https://localhost:5000 in your browser")
    println("(Camera access requires HTTPS or localhost)")
    println("Serving client from: $STATIC_DIR\n")

    runApplication<Application>(*args)
}
