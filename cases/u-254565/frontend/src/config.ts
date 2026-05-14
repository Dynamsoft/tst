// === Configuration ===
// Replace license keys with customer's keys for production use.
// Trial: https://www.dynamsoft.com/customer/license/trialLicense

// DWT + DDV trial license
const DWT_DDV_LICENSE = "t0200EQYAAKbLQxYkZIAUbLKCgMTYHyDBXpJj7pWszRAEBFppsVy4WbSTbTupTOjwqhI7owykpMWtwwzpURd4cRblSKcnCJrK48rJA5zS3ynU34kBTr7lJHpuXZtuW8V1fgF7YN4A2Z/DDqAE0l4OwKLj7JUhA7gFSAOQ1h7QAqqncMHnMnhheI7pfxdac/IAp/R3lgnSx4kBTr7ldAkyWVIfd9o1JQjKl5MB3AKkCuD3ITslCB0BbgFSBZZDFnMGuN+AUSzAF+O4PqM=";

// Dynamsoft Barcode Reader (Capture Vision) DLS license
const DCV_DLS_LICENSE = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjE2OTk4LU1qRTJPVGs0TFhkbFlpMVVjbWxoYkZCeWIybyIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21kbHMuZHluYW1zb2Z0b25saW5lLmNvbS8iLCJvcmdhbml6YXRpb25JRCI6IjIxNjk5OCIsInN0YW5kYnlTZXJ2ZXJVUkwiOiJodHRwczovL3NkbHMuZHluYW1zb2Z0b25saW5lLmNvbS8iLCJjaGVja0NvZGUiOjE2NzY3MDAxMjh9";

export const CONFIG = {
  // Dynamic Web TWAIN
  DWT_PRODUCT_KEY: DWT_DDV_LICENSE,
  DWT_RESOURCES_PATH: "/dwt-resources",

  // Dynamsoft Barcode Reader (via Capture Vision)
  DCV_LICENSE: DCV_DLS_LICENSE,
  DCV_ENGINE_PATH: "https://cdn.jsdelivr.net/npm/",

  // Dynamsoft Document Viewer
  DDV_LICENSE: DCV_DLS_LICENSE, // same DLS org license works for DDV
  DDV_ENGINE_PATH:
    "https://cdn.jsdelivr.net/npm/dynamsoft-document-viewer@4.0.0/dist/engine",

  // Backend API
  API_BASE_URL: "/api",
};
