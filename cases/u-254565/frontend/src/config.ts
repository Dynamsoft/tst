// === Configuration ===
// Replace license keys with customer's keys for production use.
// Trial: https://www.dynamsoft.com/customer/license/trialLicense

// Shared DLS trial license (valid for 24 hours)
const TRIAL_LICENSE = "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9";

export const CONFIG = {
  // Dynamic Web TWAIN
  DWT_PRODUCT_KEY: TRIAL_LICENSE,
  DWT_RESOURCES_PATH: "/dwt-resources",

  // Dynamsoft Barcode Reader (via Capture Vision)
  DCV_LICENSE: TRIAL_LICENSE,
  DCV_ENGINE_PATH:
    "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-bundle@3.4.2001/dist/",

  // Dynamsoft Document Viewer
  DDV_LICENSE: TRIAL_LICENSE,
  DDV_ENGINE_PATH:
    "https://cdn.jsdelivr.net/npm/dynamsoft-document-viewer@4.0.0/dist/engine",

  // Backend API
  API_BASE_URL: "/api",
};
