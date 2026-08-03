package com.dynamsoft.sample.mrz

import com.dynamsoft.cvr.CaptureVisionRouter
import com.dynamsoft.cvr.CapturedResult
import com.dynamsoft.dcp.EnumValidationStatus
import com.dynamsoft.dcp.ParsedResultItem
import org.springframework.stereotype.Service

/** MRZ template name used for passport and ID reading. */
const val MRZ_TEMPLATE = "ReadPassportAndId"

/** Parsed MRZ payload returned to the client as JSON. */
data class MrzFields(
    val documentType: String,
    val documentNumber: String,
    val lastName: String,
    val firstName: String,
    val nationality: String,
    val issuingState: String,
    val sex: String,
    val dateOfBirth: String,
    val dateOfExpiry: String,
    val mrzText: String,
)

@Service
class MrzService {

    /**
     * A single CaptureVisionRouter is created once and reused — constructing one is
     * expensive on the JVM. Access is serialized because a router instance is not
     * safe for concurrent capture calls. For real throughput, pool routers instead.
     */
    private val router = CaptureVisionRouter().apply {
        // Increase timeout for slow environments
        val settings = getSimplifiedSettings(MRZ_TEMPLATE)
        settings.timeout = 30_000 // 30 seconds (default is 2 s)
        updateSettings(MRZ_TEMPLATE, settings)
    }

    private val captureLock = Any()

    fun capture(imagePath: String): CapturedResult =
        synchronized(captureLock) { router.capture(imagePath, MRZ_TEMPLATE) }

    /**
     * Return field value only if it passes validation, otherwise empty string.
     */
    private fun validatedField(item: ParsedResultItem, fieldName: String): String {
        val value = item.getFieldValue(fieldName) ?: return ""
        if (item.getFieldValidationStatus(fieldName) == EnumValidationStatus.VS_FAILED) {
            return ""
        }
        return value
    }

    /** Extract and parse MRZ fields from a ParsedResultItem. */
    fun extractMrzFields(item: ParsedResultItem): MrzFields {
        val docType = item.codeType ?: ""

        // Determine document number field based on document type:
        // "passportNumber" for TD3 passports, falling back to
        // "documentNumber" for TD1/TD2 IDs.
        val docNumber = if (docType == "MRTD_TD3_PASSPORT") {
            validatedField(item, "passportNumber").ifEmpty { validatedField(item, "documentNumber") }
        } else {
            validatedField(item, "documentNumber")
        }

        // Collect raw MRZ lines
        val mrzLines = listOf("line1", "line2", "line3").mapNotNull { item.getFieldValue(it) }

        return MrzFields(
            documentType = docType,
            documentNumber = docNumber,
            lastName = validatedField(item, "primaryIdentifier"),
            firstName = validatedField(item, "secondaryIdentifier"),
            nationality = validatedField(item, "nationality"),
            issuingState = validatedField(item, "issuingState"),
            sex = validatedField(item, "sex"),
            dateOfBirth = validatedField(item, "dateOfBirth"),
            dateOfExpiry = validatedField(item, "dateOfExpiry"),
            mrzText = mrzLines.joinToString("\n"),
        )
    }
}
