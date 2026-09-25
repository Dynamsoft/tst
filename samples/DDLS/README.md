# Dynamsoft Driver License Scanner (DDLS) — JavaScript

DDLS scans a driver's license with the device camera in one continuous session: it captures the front, prompts for a flip, captures the back the moment its PDF417 barcode decodes, crops the holder's portrait from the front, and returns the deskewed images together with the parsed data (name, address, dates, license number, …). It ships with a ready-to-use interface that opens with one call and can be replaced entirely.

- **Images**: a deskewed front image, a deskewed back image that is guaranteed to contain the readable barcode (image and barcode come from the same still), and the holder's portrait cropped from the front. The original uncropped frames are available on request.
- **Data**: the PDF417 barcode parsed into structured fields. Supported formats: AAMVA DL/ID (versions 2000–2016, all US states and Canadian provinces) and South African driver's licenses. Parsing of the AAMVA magnetic-stripe format is on the roadmap.
- **Flow**: one camera session for both sides, automatic capture once the card is steady and sharp, an inline Retake / Use photo check after each side, real-time positioning hints, business rules with typed rejections, and a 60-second safety timeout. The toolbar offers close, camera switch, torch, and sound and vibration toggles for the capture feedback.
- **Interface**: a pre-built UI configurable through theme colors, messages, toolbar buttons and feedback, or replaced wholesale by pointing at your own UI definition file.

This folder holds the library build (`dist/`), a Hello World page and a minimal custom-interface example. The Dynamsoft Capture Vision engine files it relies on load from jsDelivr.

## Simple guide

### Try it online

Open **[hello-world.html](https://dynamsoft.github.io/tst/samples/DDLS/hello-world.html)** on a phone, point the camera at a license and follow the on-screen hints: scan the front, check the photo, flip, scan the back, and see the images and the parsed fields. The page carries a test license that only works on `dynamsoft.github.io`; to run it anywhere else you need your own key.

### Requirements

- **HTTPS.** Browsers only expose the camera in a secure context, and the license handshake requires one too. `http://localhost` works for development.
- **Browser**: WebAssembly, Blob, `URL.createObjectURL` and Web Workers. Minimum versions: Chrome 78, Firefox 79, Safari 15, Edge 92. On iOS, camera streaming in Chrome and Firefox needs iOS 14.3+.
- **A license key.** Get a 30-day trial from the [customer portal](https://www.dynamsoft.com/customer/license/trialLicense/?product=dcv&package=cross-platform) (renewable twice) or contact [Sales](https://www.dynamsoft.com/company/contact/) for a full license. A Driver License Scanner license covers the engine modules it uses: Document Normalizer, Barcode Reader, Code Parser, Label Recognizer and Camera Enhancer.

### Run it yourself

1. Download this folder ([samples/DDLS on GitHub](https://github.com/Dynamsoft/tst/tree/main/samples/DDLS)) and keep its layout: `hello-world.html` next to `dist/`.
2. Open `hello-world.html` and replace the `license` value with your key.
3. Serve the folder over HTTPS with any static file server. No special response headers are needed.
4. Open the page on a phone and tap **Scan a driver license**.

When you copy the page into your own project, keep `templateFilePath` and `uiPath` page-relative (`dist/…`) and ship `dist/` next to your page; the scanner needs both files at those paths. Leave `engineResourcePaths` unset unless you self-host the engine: by default the Dynamsoft Capture Vision engine files (WebAssembly, models, parser specs; a few megabytes, cached by the browser) are fetched from jsDelivr. For an offline or self-hosted deployment, copy the `dynamsoft-capture-vision-*` packages to your server and point `engineResourcePaths: { rootDirectory: "https://your-host/path/" }` at them.

### Hello World, step by step

This is the complete live page, identical to [hello-world.html](https://dynamsoft.github.io/tst/samples/DDLS/hello-world.html) except for the license value:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dynamsoft Driver License Scanner - Hello World</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1rem; }
      #images { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      #images canvas { max-height: 10rem; width: auto; border: 1px solid #ccc; }
      #out { white-space: pre-wrap; background: #f5f5f5; padding: 0.5rem; }
    </style>
    <script src="dist/ddls.bundle.js"></script>
  </head>
  <body>
    <h1>Driver License Scanner — Hello World</h1>
    <button id="scan">Scan a driver license</button>
    <div id="images"></div>
    <pre id="out"></pre>

    <script type="module">
      const { DriverLicenseScanner, DriverLicenseDataLabel, EnumResultStatus } = Dynamsoft;
      const out = document.getElementById("out");
      const images = document.getElementById("images");

      document.getElementById("scan").addEventListener("click", async () => {
        out.textContent = "";
        images.innerHTML = "";

        const scanner = new DriverLicenseScanner({
          license: "YOUR_LICENSE_KEY_HERE",
          templateFilePath: "dist/ddls.template.json",
          uiPath: "dist/ddls.ui.xml",
        });

        const result = await scanner.launch();
        out.textContent = `status: ${EnumResultStatus[result.status.code]}${
          result.rejectionReason ? ` (${result.rejectionReason})` : ""
        }\n`;

        const addCanvas = (label, item) => {
          if (item?.toCanvas) {
            const canvas = item.toCanvas();
            canvas.title = label;
            images.append(canvas);
          }
        };
        addCanvas("front", result.frontImage?.deskewedImageResult);
        addCanvas("back", result.backImage?.deskewedImageResult);
        addCanvas("portrait", result.portraitImage);
        for (const [field, value] of Object.entries(result.licenseData ?? {})) {
          if (value === undefined || value === "" || field === "status" || field.startsWith("_")) continue;
          out.textContent += `${DriverLicenseDataLabel[field] ?? field}: ${JSON.stringify(value)}\n`;
        }
      });
    </script>
  </body>
</html>
```

1. **Include the bundle.** `dist/ddls.bundle.js` is a UMD build that registers everything under the global `Dynamsoft` namespace, including the Dynamsoft Capture Vision classes it is built on. No DOM element is required for the scanner itself: it opens fullscreen on top of the page (pass `container` to mount it in your own element).
2. **Construct the scanner.** `license` is the one property you must set. `templateFilePath` (the capture template: the algorithm settings for detection, deskewing and barcode reading) and `uiPath` (the whole scanner interface in one file) point at the copies in `dist/`.
3. **Launch and wait.** `launch()` opens the camera, runs the complete session and always resolves with a result, on success, cancel and rejection alike. The camera, engine and UI are released before the promise settles, so nothing needs to be disposed.
4. **Read the result.** `status.code` tells the outcome, `rejectionReason` names a business-rule rejection, the image items convert to a canvas with `toCanvas()`, and `licenseData` holds the parsed fields with a display label for each in `DriverLicenseDataLabel`.

## API reference

### `DriverLicenseScanner`

`new DriverLicenseScanner(config?: DriverLicenseScannerConfig)` stores the configuration; all resources are created per `launch()` call and torn down when it resolves.

`launch(): Promise<DriverLicenseResult>` runs one complete scan and always resolves with a [`DriverLicenseResult`](#driverlicenseresult), on success, cancellation and rejection alike; inspect `status.code` and `rejectionReason` to tell them apart. Only one `launch()` per instance can run at a time. Business rules run on the parsed data as soon as it is available, and an unattended session ends after the scan timeout with the `Timeout` rejection and whatever was captured so far.

`DriverLicenseScanner.parse(rawData: string | Uint8Array, options?: { license?, engineResourcePaths?, returnBarcodeText? }): Promise<DriverLicenseData | null>` parses a PDF417 payload you already have (from your own barcode reader, a hardware scanner or a stored value) without a camera or UI, and returns `null` when the payload is not a supported license format. It still needs a license and downloads the code-parser engine and spec resources on first use. Pass `returnBarcodeText: true` to have the payload echoed back as `barcodeText`.

```js
const data = await Dynamsoft.DriverLicenseScanner.parse(rawPdf417String, { license: "YOUR_LICENSE_KEY_HERE" });
console.log(data?.firstName, data?.licenseNumber);
```

### `DriverLicenseScannerConfig`

Defaults are the values `launch()` applies.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `license` | `string` | — | Your license key. Required. |
| `container` | `HTMLElement \| string` | fullscreen | Where the scanner UI mounts (element or CSS selector). A fullscreen overlay is created when omitted. |
| `engineResourcePaths` | `EngineResourcePaths` | jsDelivr | Where the engine files (WebAssembly, models, parser specs) are served from. |
| `templateFilePath` | `string` | — | The capture template JSON. Set it to `dist/ddls.template.json`. |
| `utilizedTemplateNames` | `CaptureEngineTemplateNames` | shipped names | Template names inside the template file. Only needed with a renamed custom template. |
| `uiPath` | `string` | — | The UI definition file. Set it to `dist/ddls.ui.xml`, or to your own copy to replace the whole UI. |
| `workflowConfig` | `DriverLicenseWorkflowConfig` | see below | What to scan and which rules to enforce. |
| `scannerViewConfig` | `DriverLicenseScannerViewConfig` | see below | Theme, messages, toolbar, feedback, scan region. |
| `showCaptureConfirmation` | `boolean` | `true` | Show each captured side with Retake / Use photo before continuing. A barcode-only side has no photo and skips it. |
| `captureOptions` | `CaptureEngineOptions` (tuning part) | see below | Capture-gate tuning and debug logging. |

### `workflowConfig` (`DriverLicenseWorkflowConfig`)

Timeouts are in milliseconds. Expiry and age comparisons use the device clock; the scanner works offline.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `captureFrontImage` | `boolean` | `true` | Capture the front-side image. |
| `captureBackImage` | `boolean` | `true` | Capture the back-side image. `captureFrontImage: false, captureBackImage: false` gives a barcode-only scan whose result holds `licenseData` only. |
| `readBarcode` | `boolean` | `true` | Decode and parse the PDF417 barcode. `false` captures images only. |
| `scanOrder` | `EnumDriverLicenseScanSide[]` | `[Front, Back]` | The order the sides are scanned in. |
| `barcodeScanSide` | `EnumDriverLicenseScanSide` | `Back` | Which side carries the barcode. |
| `scanTimeout` | `number \| null` | `60000` | Session timeout; rejects with `Timeout`. Paused during confirmation. `null` disables it. Starts before the camera opens, so time on the permission prompt counts. |
| `rejectExpired` | `boolean` | off | Reject expired documents (`DocumentExpired`). |
| `rejectExpiringInDays` | `number \| null` | off | Reject documents expiring within N days (`DocumentExpiresSoon`). |
| `minimumHolderAge` | `number \| null` | off | Reject holders younger than N years (`HolderUnderage`). |
| `rejectNotRealIdCompliant` | `boolean` | off | Reject non-REAL-ID-compliant AAMVA licenses (`NotRealIdCompliant`). |
| `barcodeVerificationCallback` | `(data) => boolean \| Promise<boolean>` | none | Your own check, sync or async; `false` rejects with `VerificationFailed`. |
| `returnOriginalImage` | `boolean` | `false` | Include the full uncropped camera frame in each side's image result. |
| `returnPortraitImage` | `boolean` | `true` | Extract and include the portrait crop from the front side. |
| `requirePortraitImage` | `boolean` | `false` | Accept the front only once the portrait is located on it; retried until the timeout. Leave off for licenses without a portrait. |
| `returnBarcodeText` | `boolean` | `false` | Include the raw PDF417 payload as `licenseData.barcodeText`. |
| `enableCaptureConfirmation` | `boolean` | from `showCaptureConfirmation` | The session-level switch behind `showCaptureConfirmation`; an explicit value here wins. |
| `captureConfirmationTimeout` | `number \| null` | `null` | Auto-confirm after N ms; `null` waits for an explicit choice. |

### `scannerViewConfig` (`DriverLicenseScannerViewConfig`)

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `themeConfig` | `{ colors?: Record<string, string> }` | none | Each color key `x` becomes the CSS custom property `--ddls-color-x` on the UI root. The default UI uses `primary` (buttons and the torch/sound/vibrate on-states), `scanAccent` (guide border, spinner, flip card), `success` (guide flash on capture), `overlay`, `text`, `toolbar` and `spinnerBackground`. |
| `messagesConfig` | `Partial<DriverLicenseScannerMessages>` | English | Overrides for the UI strings, for wording or localization. Keys: `initializing`, `searchingFront`, `searchingBack`, `searchingBarcode`, `barcodeNotFound`, `rotateHorizontal`, `blurry`, `lowLight`, `portraitNotFound`, `holdSteady`, `processing`, `flipToBack`, `flipToFront`, `confirmationPrompt`, `retake`, `usePhoto`, `done`, `cancelled`, `rejected`. The defaults are exported as `DEFAULT_SCANNER_MESSAGES`. |
| `toolbarButtonsConfig` | `{ close?, cameraSwitch?, torch?, sound?, vibrate? }` | all shown | Per button a `DriverLicenseToolbarButtonConfig`: `icon` (inner HTML, e.g. an inline SVG), `label` (accessible label / tooltip), `isHidden`. The vibrate toggle only appears on touch devices with the Vibration API. |
| `feedbackConfig` | `DriverLicenseFeedbackConfig` | all `false` | `beepOnCapture` and `vibrateOnCapture` set the starting state of the sound and vibrate toggles; `beepOnRejection` beeps when the scan is rejected. |
| `enableScanRegion` | `boolean` | `true` | Show the card-shaped guide and restrict detection to it; `false` hides the guide and scans the full frame, where a small, distant card may not be detected. |
| `showScanRegionMask` | `boolean` | `false` | Debug: show the region the camera actually uses. |
| `flipPromptTimeout` | `number` | `3000` | Milliseconds the flip prompt stays before scanning continues. |
| `minHintDuration` | `number` | `1500` | Minimum milliseconds a positioning hint stays before the next one replaces it. Keep it below 2000. |

### `captureOptions`

The gates that decide when a frame is captured. On the side that carries the barcode the decode itself accepts the frame it came from (the boundary gates still choose the crop), so `stableFramesRequired`, `enableBoundaryVerification` and the clarity options only apply to a side captured without a barcode. Change these only with a concrete problem in hand.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `minBoundaryConfidence` | `number` | `60` | Minimum boundary-detection confidence (0–100) to accept a boundary. |
| `stableFramesRequired` | `number` | `3` | Consecutive valid frames required before auto-capture. |
| `enableBlurCheck` | `boolean` | `true` | Reject blurry frames. |
| `enableBoundaryVerification` | `boolean` | `true` | Accept a boundary only after it is confirmed across consecutive frames. |
| `cameraWarmupTime` | `number` | `1000` | Milliseconds after the camera opens during which frames are ignored while focus and exposure settle; `0` disables. |
| `minClarity` | `number` | `300` | Minimum clarity score (per 1000 measured pixels) a frame must reach; higher is stricter. Device-relative; tune it from the `debug` log. |
| `lowLightThreshold` | `number` | `100` | Card brightness (0–255) below which a blur rejection is reported as low light instead of motion blur. |
| `cardAspectTolerance` | `number` | `0.1` | Allowed deviation from the ID-1 card aspect ratio (1.588). |
| `debug` | `boolean` | `false` | Log per-frame gate decisions, the clarity measurement and the camera negotiation to the browser console. |

### `DriverLicenseResult`

| Property | Type | Description |
| --- | --- | --- |
| `status` | `{ code: EnumResultStatus; message?: string }` | `RS_SUCCESS`, `RS_CANCELLED` or `RS_FAILED` (rejections and timeouts), plus a message. |
| `rejectionReason` | `EnumRejectionReason` | The typed reason when the scan was rejected. |
| `frontImage` | `DriverLicenseImageResult` | The front-side capture. |
| `backImage` | `DriverLicenseImageResult` | The back-side capture; with barcode reading on, it contains the readable barcode. |
| `portraitImage` | `PortraitImage` | The holder's photo cropped from the front; converts via `toCanvas()`. |
| `licenseData` | `DriverLicenseData` | The parsed barcode fields. |

On cancellation and timeout the result carries everything captured up to that point.

A `DriverLicenseImageResult` has `status`, `deskewedImageResult` (the deskewed document image; `toCanvas()`), `originalImageResult` (the full camera frame, only with `returnOriginalImage`) and `detectedQuadrilateral` (the document boundary in original-image coordinates).

`DriverLicenseData` is keyed by `EnumDriverLicenseData`; every field is optional. `DriverLicenseDataLabel` maps each key to a display label, and the keys listed in `DriverLicenseDateFields` hold a `DriverLicenseDate` (`{ year?, month?, day? }`). Field groups: basics (`licenseType`, `licenseNumber`, `barcodeText`, `invalidFields`); document metadata (AAMVA version, issuer identification, document discriminator, issuing country, compliance type); personal information (names, `dateOfBirth`, `age`, `sex`, aliases); physical characteristics (height, weight, eye and hair color); address (street, city, state, postal code); dates and permits (`issueDate`, `expiryDate`, permit and endorsement details); vehicle classification, restrictions, endorsements, indicators; and the South Africa-specific fields. The complete list is in the bundled type declarations.

### Enums

`EnumResultStatus` — `RS_SUCCESS` (0), `RS_CANCELLED` (1), `RS_FAILED` (2).

`EnumRejectionReason` (string values):

| Member | Value | Triggered by |
| --- | --- | --- |
| `Timeout` | `"timeout"` | `scanTimeout` elapsed |
| `DocumentExpired` | `"documentExpired"` | `rejectExpired` |
| `DocumentExpiresSoon` | `"documentExpiresSoon"` | `rejectExpiringInDays` |
| `HolderUnderage` | `"holderUnderage"` | `minimumHolderAge` |
| `NotRealIdCompliant` | `"notRealIdCompliant"` | `rejectNotRealIdCompliant` |
| `VerificationFailed` | `"verificationFailed"` | `barcodeVerificationCallback` returning `false` |

`EnumDriverLicenseScanSide` — `Front` (`"frontSide"`), `Back` (`"backSide"`).

`EnumDriverLicenseType` (`licenseData.licenseType`) — `AAMVA_DL_ID`, `SOUTH_AFRICA_DL`; `AAMVA_DL_ID_WITH_MAG_STRIPE` is reserved for the magnetic-stripe format on the roadmap.

### Custom UI (`uiPath`)

The whole default experience (markup, styles, behavior) lives in `dist/ddls.ui.xml`. Point `uiPath` at your own copy to change anything, or at a file of your own to replace it entirely. A UI definition is an HTML fragment with exactly one element of class `dm-camera-core-container` (the camera layer injects the video there) and `<script>` blocks that run when the UI binds; inside them `document.currentScript.currentDMCamera.exportToUI` is the scanner's UI context:

| Property | What it is |
| --- | --- |
| `session` | The scan session: events `stateChanged`, `sideCaptured`, `confirmationPrompt`, `flipPrompt`, `barcodeParsed`, `resultReady`, `rejected`, `cancelled`; commands `confirmFlip()`, `confirm()`, `retake(side)`, `cancel()`. |
| `engine` | The capture engine; emits `hint` events (`searching`, `searchingBarcode`, `barcodeNotFound`, `rotateHorizontal`, `blurry`, `lowLight`, `portraitNotFound`, `holdSteady`, `processing`). |
| `cameraEnhancer` | The Dynamsoft Camera Enhancer, for camera controls (switch camera, torch, scan region, …). |
| `viewConfig` | The resolved `scannerViewConfig` with all messages merged against the defaults. |
| `close()` | Cancel the scan; the scanner tears the camera and UI down. |
| `feedback` | `beep()` and `vibrate()` helpers. |

Rules: keep the `.xml` extension; relative URLs inside a UI definition resolve against the host page, not the UI file, so inline your assets; write plain script without imports; handle `confirmationPrompt` (call `confirm()` or `retake(side)`) or launch with `showCaptureConfirmation: false`, otherwise the session waits forever after the first captured side; and set a scan region through `cameraEnhancer` if you draw your own guide, because without one detection runs on the full camera frame and a small, distant card may not be found. [minimal.ui.xml](minimal.ui.xml) in this folder is a deliberately bare but complete example (a status line and a cancel button, accepting every capture). The bundle also exports the headless core, `DriverLicenseScanSession` and `CaptureEngine`, for fully custom flows.

## Support

For questions or issues contact the [Dynamsoft Support Team](https://www.dynamsoft.com/company/contact/).
