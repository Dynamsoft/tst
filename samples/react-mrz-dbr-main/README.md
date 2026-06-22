# MRZ + Barcode Scanner React Sample

A React sample that reads passports and Colombian IDs with one scanner. Point the camera at either document and the matching result page opens.

- **Passport**: the MRZ (Machine Readable Zone) is recognized and parsed. The result page shows the parsed fields (document number, name, date of birth, expiry, ...), the portrait, and the cropped document images.
- **Colombian ID**: the PDF417 barcode on the back of the card is decoded. The result page shows the format and the decoded payload.

Both documents are collected in one session, in any order:

```
Landing → Start Scanning → scanner (auto-detects)
            ├→ MRZ result page     [Retake | Scan Barcode]
            └→ Barcode result page [Retake | Scan Passport]
                 → scanner again → other result page [Retake | Done] → Landing
```

## How the unified scanner works

The [Dynamsoft MRZ Scanner](https://www.npmjs.com/package/dynamsoft-mrz-scanner) runs on the Dynamsoft Capture Vision engine, which also includes the barcode reader, so one camera session can read both:

1. [public/mrz-pdf417.template.json](public/mrz-pdf417.template.json) is a copy of the MRZ scanner's default template with a PDF417 decoding task (`task-pdf417`, restricted to `BF_PDF417`) added to the ROIs of the default `ReadAll` scan mode. Both `roi-passport-and-id` and `roi-passport-and-id-mrz-only` are patched because the scanner starts capturing with the `ReadAll-MRZOnly` template and switches to `ReadAll` mid-session. With this template, every camera frame runs MRZ recognition and PDF417 decoding.
2. `MRZScanner.initialize()` exposes the internal `CaptureVisionRouter`. [src/scanners.ts](src/scanners.ts) registers a `CapturedResultReceiver` on it to catch decoded barcodes.
3. `launch()` only ever resolves with MRZ results, so `scanDocument()` races it against the barcode receiver and returns whichever comes first, then disposes the scanner.

The MRZ guide frame and its scan region don't apply to barcodes, so the scanner runs with `enableScanRegion: false` (full-frame scanning) and a combined hint message via `messagesConfig`. The default document-boundary and MRZ text-line highlights are turned off via their camera-view drawing layers; the barcode highlight stays on. The flip animation for two-sided IDs lives inside the hidden guide frame, so a small CSS rule in [src/App.css](src/App.css) keeps it visible.

## Project structure

```
src/
├── App.tsx                          Flow state machine and landing page
├── scanners.ts                      scanDocument() — the unified auto-detect scanner
└── components/
    ├── MrzResultPage.tsx            Passport result: summary, images, data rows, MRZ text
    ├── BarcodeResultPage.tsx        Colombian ID result: data rows, decoded text
    └── DataSection.tsx              Shared label/value rows
public/
└── mrz-pdf417.template.json         Combined MRZ + PDF417 capture template
```

## License key

Open [src/scanners.ts](src/scanners.ts) and replace `YOUR_LICENSE_KEY_HERE` with your license. You can request a [30-day trial license](https://www.dynamsoft.com/customer/license/trialLicense) — make sure it includes **both** the MRZ Scanner and the Barcode Reader products (the PDF417 task inside the capture template is licensed as Barcode Reader).

## Run the sample

```bash
npm install
npm run dev
```

Open the printed URL (the dev server uses HTTPS so the camera also works from a phone on the same network — accept the self-signed certificate warning).

To create a production build:

```bash
npm run build
npm run preview
```

## Self-hosted SDK resources

The sample serves all engine resources itself, with no runtime CDN dependency:

- [vite.config.ts](vite.config.ts) copies `dynamsoft-capture-vision-bundle` and `dynamsoft-capture-vision-data` from `node_modules` into `public/` (re-copied only when the installed version changes; the copies are gitignored).
- The scanner's `engineResourcePaths` points at those copies, and `templateFilePath` at the customized template, so everything loads from the app's own origin.
- The dev server sends `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy` headers, which lets the engine use the faster multi-threaded WASM variant. Send the same headers in production to keep that benefit (it requires same-origin resources, which self-hosting provides).

To switch back to CDN loading, remove the `engineResourcePaths` block from [src/scanners.ts](src/scanners.ts); the SDK defaults to jsDelivr.
