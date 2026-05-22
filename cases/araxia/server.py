"""
Server-side MRZ Reading - Flask Backend

Serves the client-side web app and provides an API endpoint
to process document images with Dynamsoft MRZ Scanner (Python).

NOTE: Flask is used here as a lightweight demo server only. It is NOT a
Dynamsoft SDK requirement. For production, replace with your own backend
framework and deploy in your trusted server environment (AWS, Azure, Docker, etc.).
The only Dynamsoft dependency is `dynamsoft-capture-vision-bundle`.

Usage:
    pip install -r requirements.txt
    python server.py
"""

import os
import tempfile
from flask import Flask, request, jsonify, send_from_directory

from dynamsoft_capture_vision_bundle import (
    CaptureVisionRouter,
    LicenseManager,
    EnumErrorCode,
    EnumValidationStatus,
)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
# Replace with your Dynamsoft license key, or use the default trial key.
LICENSE_KEY = os.environ.get(
    "DYNAMSOFT_LICENSE",
    "t0122NQMAADL+j4AO3AmALiQXHqOQWx+5aRye+znAyEj8wrKvTHjp14Tma9zFVp+F7Kh1T/zCvBq0fgJDRi3nvhra1DPJjNxdZlvrEM8yTU8z4mPllBi4K8uUBkytz9xj+s9Ux7mYZ/gHn5nSgKn1mdk8XzCds2CArUhpqEc=;t0123NQMAAFYMBywwLw4+Jvf4Tnzyrcg62zzC+VlBOf9sjhWF3wuVy8559hMR2CZycfdm/QEuQ/KgiyKNH33zYY3BHkuFnL9YZdATh3iOKT1lbI+VY2LgrixTGjC1PnOv6T9THadin/EffGZKA6bWZ2b7fMF0zoIRtgBpxKhW",
)

app = Flask(__name__, static_folder="static", static_url_path="")

os.makedirs("uploads", exist_ok=True)

# ---------------------------------------------------------------------------
# Initialize Dynamsoft License (once at startup)
# ---------------------------------------------------------------------------
error_code, error_msg = LicenseManager.init_license(LICENSE_KEY)
if error_code != EnumErrorCode.EC_OK and error_code != EnumErrorCode.EC_LICENSE_CACHE_USED:
    print(f"[WARNING] License init: {error_code} - {error_msg}")
else:
    print("[INFO] Dynamsoft license initialized successfully.")


# ---------------------------------------------------------------------------
# MRZ field extraction helper
# ---------------------------------------------------------------------------
def get_validated_field(item, field_name):
    """Return field value only if it passes validation, otherwise empty string.

    Follows the pattern from the official Dynamsoft Python sample:
    https://github.com/Dynamsoft/capture-vision-python-samples/blob/main/Samples/mrz_scanner.py
    """
    value = item.get_field_value(field_name)
    if value is None:
        return ""
    if item.get_field_validation_status(field_name) == EnumValidationStatus.VS_FAILED:
        return ""
    return value


def extract_mrz_fields(item):
    """Extract and parse MRZ fields from a ParsedResultItem."""
    doc_type = item.get_code_type()

    # Determine document number field based on document type
    # Ref: official sample uses "passportNumber" for TD3 passports,
    # falls back to "documentNumber" for TD1/TD2 IDs
    if doc_type == "MRTD_TD3_PASSPORT":
        doc_number = (get_validated_field(item, "passportNumber")
                      or get_validated_field(item, "documentNumber"))
    else:
        doc_number = get_validated_field(item, "documentNumber")

    # Collect raw MRZ lines (with validation status annotation)
    mrz_lines = []
    for line_key in ("line1", "line2", "line3"):
        line = item.get_field_value(line_key)
        if line is not None:
            mrz_lines.append(line)

    return {
        "documentType": doc_type,
        "documentNumber": doc_number,
        "lastName": get_validated_field(item, "primaryIdentifier"),
        "firstName": get_validated_field(item, "secondaryIdentifier"),
        "nationality": get_validated_field(item, "nationality"),
        "issuingState": get_validated_field(item, "issuingState"),
        "sex": get_validated_field(item, "sex"),
        "dateOfBirth": get_validated_field(item, "dateOfBirth"),
        "dateOfExpiry": get_validated_field(item, "dateOfExpiry"),
        "mrzText": "\n".join(mrz_lines),
    }


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.after_request
def add_security_headers(response):
    """Required headers for SharedArrayBuffer (used by DCV WASM engine)."""
    response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
    response.headers["Cross-Origin-Embedder-Policy"] = "require-corp"
    return response


@app.route("/api/mrz", methods=["POST"])
def process_mrz():
    """
    Receive a document image, run server-side MRZ extraction + parsing,
    and return the parsed result as JSON.

    Expects multipart/form-data with an 'image' file field.
    """
    if "image" not in request.files:
        return jsonify({"success": False, "error": "No image file provided"}), 400

    image_file = request.files["image"]
    if image_file.filename == "":
        return jsonify({"success": False, "error": "Empty filename"}), 400

    # Save to a temp file for DCV processing
    suffix = os.path.splitext(image_file.filename)[1] or ".png"
    tmp_path = None
    try:
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix, dir="uploads")
        tmp_path = tmp.name
        image_file.save(tmp_path)
        tmp.close()

        # Process with Dynamsoft Capture Vision
        cvr = CaptureVisionRouter()

        # Increase timeout for slow environments (e.g. Render free tier)
        _, _, dcv_settings = cvr.get_simplified_settings("ReadPassportAndId")
        dcv_settings.timeout = 30000  # 30 seconds (default is 2 s)
        cvr.update_settings("ReadPassportAndId", dcv_settings)

        result = cvr.capture(tmp_path, "ReadPassportAndId")

        if result.get_error_code() != EnumErrorCode.EC_OK:
            return jsonify({
                "success": False,
                "error": f"DCV error {result.get_error_code()}: {result.get_error_string()}",
            }), 500

        parsed_result = result.get_parsed_result()
        if parsed_result is None or len(parsed_result.get_items()) == 0:
            return jsonify({
                "success": False,
                "error": "No MRZ detected in the image. Please try with a clearer image.",
            }), 200

        # Extract fields from the first parsed item
        item = parsed_result.get_items()[0]
        fields = extract_mrz_fields(item)

        return jsonify({"success": True, "data": fields})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

    finally:
        # Clean up temp file
        if tmp_path:
            try:
                os.unlink(tmp_path)
            except OSError:
                pass


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    # Check that client-side resources have been set up
    dist_dir = os.path.join("static", "dist")
    bundle_path = os.path.join(dist_dir, "mrz-scanner.bundle.js")
    if not os.path.isfile(bundle_path):
        print("\n[ERROR] Client resources not found in static/dist/.")
        print("Run the setup script first:\n")
        print("    npm install")
        print("    bash setup_resources.sh\n")
        raise SystemExit(1)

    print("\n=== Araxia Document Verification Demo ===")
    print("Open https://localhost:5000 in your browser")
    print("(Camera access requires HTTPS or localhost)\n")
    app.run(
        host="0.0.0.0",
        port=5000,
        ssl_context="adhoc",  # Self-signed cert for HTTPS (camera access)
        debug=True,
    )
