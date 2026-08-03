package com.dynamsoft.sample.mrz

import com.dynamsoft.core.EnumErrorCode
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

@RestController
class MrzController(private val mrzService: MrzService) {

    private val uploadsDir: Path = Paths.get("uploads")

    /**
     * Receive a document image, run server-side MRZ extraction + parsing,
     * and return the parsed result as JSON.
     *
     * Expects multipart/form-data with an 'image' file field.
     */
    @PostMapping("/api/mrz")
    fun processMrz(
        @RequestParam("image", required = false) image: MultipartFile?,
    ): ResponseEntity<Map<String, Any>> {
        if (image == null) {
            return failure("No image file provided", HttpStatus.BAD_REQUEST)
        }
        val filename = image.originalFilename
        if (filename.isNullOrEmpty()) {
            return failure("Empty filename", HttpStatus.BAD_REQUEST)
        }

        // Save to a temp file for DCV processing
        val suffix = filename.substringAfterLast('.', "").let { if (it.isEmpty()) ".png" else ".$it" }
        var tmpPath: Path? = null
        try {
            Files.createDirectories(uploadsDir)
            tmpPath = Files.createTempFile(uploadsDir, "upload-", suffix)
            image.inputStream.use { input ->
                Files.newOutputStream(tmpPath).use { output -> input.copyTo(output) }
            }

            // Process with Dynamsoft Capture Vision
            val result = mrzService.capture(tmpPath.toString())

            if (result.errorCode != EnumErrorCode.EC_OK) {
                return failure(
                    "DCV error ${result.errorCode}: ${result.errorString}",
                    HttpStatus.INTERNAL_SERVER_ERROR,
                )
            }

            val parsedResult = result.parsedResult
            val items = parsedResult?.items
            if (items.isNullOrEmpty()) {
                // A readable request that yielded no MRZ is reported with
                // HTTP 200 and success = false.
                return ResponseEntity.ok(
                    mapOf(
                        "success" to false,
                        "error" to "No MRZ detected in the image. Please try with a clearer image.",
                    )
                )
            }

            // Extract fields from the first parsed item
            val fields = mrzService.extractMrzFields(items[0])
            return ResponseEntity.ok(mapOf("success" to true, "data" to fields))
        } catch (e: Exception) {
            return failure(e.message ?: e.toString(), HttpStatus.INTERNAL_SERVER_ERROR)
        } finally {
            // Clean up temp file
            tmpPath?.let { runCatching { Files.deleteIfExists(it) } }
        }
    }

    private fun failure(message: String, status: HttpStatus): ResponseEntity<Map<String, Any>> =
        ResponseEntity.status(status).body(mapOf("success" to false, "error" to message))
}
