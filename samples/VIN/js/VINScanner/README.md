# Dynamsoft Capture Vision Samples for JavaScript

## Samples

| Sample Name   | Description                                                                          |
| ------------  | ------------------------------------------------------------------------------------ |
| `VIN Scanner` | Scan the VIN code from a barcode or a text line and extract the vehicle information. |

This repository contains JavaScript samples built with Dynamsoft Capture Vision. At the moment it includes one end-to-end sample application:

| Sample | Description |
| --- | --- |
| `VINScanner` | Scans a vehicle identification number from either a barcode or a text line and parses the VIN into readable vehicle details. |

## Sample Pages

The VIN scanner sample exposes two HTML entry points:

| Page | Purpose |
| --- | --- |
| `VINScanner/index.html` | Full sample UI with the complete scanner experience. |
| `VINScanner/minimum-elements.html` | Minimal single-page version with reduced UI and styling. |

## Getting Started

### Prerequisites

- Node.js 18+ is recommended.
- A modern browser with camera access support.
- HTTPS for production deployments. Localhost is typically accepted by current browsers for development.

### Install Dependencies

```bash
npm install
```

### Start the Local Server

```bash
npm run start
```

This starts a Vite development server on `http://localhost:3000`.

Open either of these sample pages in the browser:

- `http://localhost:3000/VINScanner/index.html`
- `http://localhost:3000/VINScanner/minimum-elements.html`

## License

The sample initializes Dynamsoft License Manager in `VINScanner/js/init.js` with a trial key "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9" that is valid for 24 hours for newly authorized browsers.

If you need a longer evaluation period, request a 30-day trial license here:

[Request a trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dcv&utm_source=samples&package=js)

## Project Structure

```text
capture-vision-javascript-samples/
├── package.json
├── playwright.config.ts
├── README.md
└── VINScanner/
  ├── assets/
  ├── css/
  ├── font/
  ├── js/
  │   ├── const.js
  │   ├── index.js
  │   ├── init.js
  │   └── util.js
  ├── models/
  ├── tests/
  │   ├── index.spec.ts
  │   └── minimum-elements.spec.ts
  ├── ui/
  ├── index.html
  ├── minimum-elements.html
  └── read-vin.json
```

Key files and folders:

- `VINScanner/index.html`: Full VIN scanner entry page.
- `VINScanner/minimum-elements.html`: Minimal entry page.
- `VINScanner/js/init.js`: License initialization, SDK setup, camera initialization, and capture pipeline bootstrapping.
- `VINScanner/js/index.js`: Page behavior and scanner interaction logic.
- `VINScanner/js/util.js`: UI and VIN parsing helper utilities.
- `VINScanner/read-vin.json`: Capture Vision settings used by the sample.
- `VINScanner/models/`: Model assets used by the VIN text recognition flow.
- `VINScanner/tests/`: Playwright smoke tests for both entry pages.

## Browser Requirements

This sample depends on the following browser capabilities:

- Secure context for production camera access and Dynamsoft licensing.
- `WebAssembly`
- `Blob`
- `URL.createObjectURL`
- `Web Workers`
- `MediaDevices.getUserMedia`
- `MediaStreamTrack.getSettings`

Supported browser baseline:

| Browser | Version |
| --- | --- |
| Chrome | 88+ |
| Firefox | 89+ |
| Edge | 88+ |
| Safari | 15+ |

## Testing

This repository includes Playwright tests for both VIN scanner pages.

### Install Playwright Browsers

```bash
npx playwright install
```

### Run Tests

```bash
npm test
```

The Playwright configuration starts the local Vite server automatically before running the tests.

### Open the HTML Report

```bash
npx playwright show-report
```

## Contact

[Contact Dynamsoft](https://www.dynamsoft.com/company/contact/?product=cvs&utm_source=github&package=js)
