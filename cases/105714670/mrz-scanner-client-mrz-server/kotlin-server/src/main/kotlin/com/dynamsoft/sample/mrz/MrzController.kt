package com.dynamsoft.sample.mrz

import com.dynamsoft.core.EnumErrorCode
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
class MrzController(private val mrzService: MrzService) {

    /**
     * Receive a document image, run server-side MRZ extraction + parsing,
     * and return the parsed result as JSON.
     *
     * Expects multipart/form-data with an 'image' file field.
     *
     * The document never touches disk. The bytes are read into memory, passed
     * straight to the engine, and dropped when this method returns — nothing is
     * written, logged, or kept, so there is no document to delete afterwards and
     * nothing to find if the machine is later inspected.
     *
     * Two things make that true, and both matter:
     *  - `spring.servlet.multipart.file-size-threshold` in application.yml is
     *    raised above `max-file-size`, so the servlet container buffers the upload
     *    in memory instead of spilling it to its temp directory. At the default of
     *    0B, every upload would be written to disk before this method is entered.
     *  - MrzService.capture takes the bytes, not a path.
     */
    @PostMapping("/api/mrz")
    fun processMrz(
        @RequestParam("image", required = false) image: MultipartFile?,
    ): ResponseEntity<Map<String, Any>> {
        if (image == null) {
            return failure("No image file provided", HttpStatus.BAD_REQUEST)
        }
        if (image.isEmpty) {
            return failure("Empty image file", HttpStatus.BAD_REQUEST)
        }

        return try {
            val result = mrzService.capture(image.bytes)

            if (result.errorCode != EnumErrorCode.EC_OK) {
                return failure(
                    "DCV error ${result.errorCode}: ${result.errorString}",
                    HttpStatus.INTERNAL_SERVER_ERROR,
                )
            }

            val items = result.parsedResult?.items
            if (items.isNullOrEmpty()) {
                // A readable request that yielded no MRZ is reported with
                // HTTP 200 and success = false.
                ResponseEntity.ok(
                    mapOf(
                        "success" to false,
                        "error" to "No MRZ detected in the image. Please try with a clearer image.",
                    )
                )
            } else {
                // Extract fields from the first parsed item
                ResponseEntity.ok(mapOf("success" to true, "data" to mrzService.extractMrzFields(items[0])))
            }
        } catch (e: Exception) {
            failure(e.message ?: e.toString(), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private fun failure(message: String, status: HttpStatus): ResponseEntity<Map<String, Any>> =
        ResponseEntity.status(status).body(mapOf("success" to false, "error" to message))
}
