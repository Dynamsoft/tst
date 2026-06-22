# Programmatic Focus

A demo that uses `CameraEnhancer.setFocus()` to programmatically control the camera's focus behavior, improving barcode readability on blurry or out-of-focus targets.

## Included files

- `index.html` — demo page (camera + UI).

## Features

- Three focus modes via `setFocus()`:
  - **Continuous** — camera focuses automatically and continuously (default)
  - **Focus Center** — manual focus on the center 50% area; SDK adjusts focus distance based on blurriness
  - **Manual (distance)** — set a specific focus distance with a slider
- Continuous barcode scanning with result deduplication

## How it works

- The demo calls `cameraEnhancer.setFocus()` with different settings based on the selected mode.
- "Continuous" mode lets the camera auto-focus normally.
- "Focus Center" mode uses the `area` parameter to focus on the center region of the frame.
- "Manual" mode sets a fixed focus distance via the `distance` parameter, controlled by a range slider.

## Browser compatibility

**`setFocus()` only works with Chromium-based browsers (Chrome, Edge) on Windows or Android.** Safari, Firefox, and all iOS browsers (which use WebKit) are not supported. The sample displays a notice banner on unsupported browsers.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here's a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## Notes

- Serve on localhost/HTTPS to enable camera access.
- Unlike `EF_TAP_TO_FOCUS` (an enhanced feature requiring a separate DCE license), `setFocus()` works with a standard DBR license but is limited to Chromium-based browsers.
