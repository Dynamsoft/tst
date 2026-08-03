# Guided ID Capture + Server-side MRZ Verification

Sample project demonstrating guided travel document capture with real-time quality feedback and server-side MRZ verification for airline travel document verification.

## Architecture

```
Browser (Client)                         Python Server
+---------------------------+            +---------------------------+
| MRZ Scanner v4 (JS)       |            | Flask + DCV Python        |
| (custom guided capture)   |            |                           |
|                            |            |                           |
| 1. Guide frame overlay     |            | 5. Receive image          |
| 2. Step 1: Document framing|            | 6. Extract & parse MRZ    |
|    - "Move your ID"        |            | 7. Return parsed JSON     |
|    - "Move closer"         |            |                           |
| 3. Step 2: Quality check   |  ------>>  |                           |
|    - "Hold steady"         |  POST      |                           |
|    - MRZ readability check |  /api/mrz  |                           |
| 4. Auto-capture when ready |  <<------  |                           |
|                            |   JSON     |                           |
| 8. Display server result   |            |                           |
|    (no client MRZ shown)   |            |                           |
+---------------------------+            +---------------------------+
```

**Client side**: Dynamsoft MRZ Scanner v4 for Web (custom build with guided capture)
**Server side**: Dynamsoft Capture Vision Bundle for Python (`dynamsoft-capture-vision-bundle`)

## Key Features

### Two-Step Guided Capture
1. **Document Framing**: Real-time feedback guides the user to position their ID within the frame
   - "Move your ID to fit the frame" — when no document is detected
   - "Move closer to fit the frame" — when document is too far from camera
2. **Quality Validation**: Once framed, MRZ readability is checked as a quality proxy
   - "Detecting document quality. Please hold steady" — while MRZ check runs
   - Auto-capture when MRZ is readable

### Security Model
- **Client-side MRZ is internal only** — used solely as a quality trigger, never displayed to the end user
- **Server-side MRZ is authoritative** — only server-extracted results are shown in the UI
- **Post-upload validation** — if the server can't read the MRZ, the user sees "Image quality: Poor" and a retake option

### Camera Controls
- Camera switch icon for manual camera selection
- Flash toggle (on supported devices)
- 2K resolution by default for optimal MRZ readability

## Document Types Supported

ICAO travel documents:
- **TD3**: Passports
- **TD2**: Visas, some ID cards
- **TD1**: ID cards, residency permits

## Prerequisites

- Python 3.10 - 3.14
- Node.js 18+ and npm
- A Dynamsoft license key — [request a free trial](https://www.dynamsoft.com/customer/license/triallicense/) or contact [Dynamsoft Support](https://www.dynamsoft.com/company/contact/) for assistance

## Quick Start

```bash
pip install -r requirements.txt
npm install
bash setup_resources.sh
python server.py
```

Open **https://localhost:5000** in your browser (accept the self-signed certificate warning).

### What each step does

1. **`pip install -r requirements.txt`** — Installs Flask and `dynamsoft-capture-vision-bundle` (Python MRZ engine).
2. **`npm install`** — Installs `dynamsoft-mrz-scanner` v4 (JS bundle, WASM engine, ML models) from Dynamsoft's npm registry (configured in `.npmrc`).
3. **`bash setup_resources.sh`** — Copies the JS bundle and engine resources from `node_modules/` into `static/dist/` so Flask can serve them.
4. **`python server.py`** — Starts the HTTPS dev server on port 5000.

## How It Works

1. **Scan**: User clicks "Start Camera Scan" or "Upload Image"
2. **Guided capture**: The scanner guides the user through two steps:
   - Step 1: Position document within the guide frame
   - Step 2: Hold steady while MRZ quality is validated
3. **Auto-capture**: Once MRZ is confirmed readable, the document is automatically captured and cropped
4. **Upload**: The captured document image is POSTed to `/api/mrz`
5. **Server verification**: Python DCV extracts MRZ text, parses all fields
6. **Display**: Only the server-side result is shown to the user
7. **Quality gate**: If the server can't read the MRZ → "Image quality: Poor" with a retake button

## API

### `POST /api/mrz`

**Request**: `multipart/form-data` with an `image` file field.

**Response** (success):
```json
{
  "success": true,
  "data": {
    "documentType": "MRTD_TD3_PASSPORT",
    "documentNumber": "AB1234567",
    "lastName": "SMITH",
    "firstName": "JOHN",
    "nationality": "USA",
    "issuingState": "USA",
    "sex": "M",
    "dateOfBirth": "900101",
    "dateOfExpiry": "300101",
    "mrzText": "P<USASMITH<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<\nAB12345674USA9001011M3001011<<<<<<<<<<<<<<02"
  }
}
```

## Configuration

| Environment Variable | Default | Description |
|---|---|---|
| `DYNAMSOFT_LICENSE` | Trial key | Dynamsoft license for server-side DCV |

The client-side license is configured in `static/index.html`.

## Deployment Note

This sample uses **Flask** with a self-signed certificate as a lightweight demo server. Flask is **not** part of the Dynamsoft SDK requirements — it is used here solely to serve the web client and expose the MRZ processing API in a single runnable project.

For production deployment, the customer is responsible for:

- **Trusted server environment**: Hosting the backend in their own infrastructure with proper TLS certificates and security hardening.
- **Web server / framework**: Replacing Flask with their production stack.
- **Scaling**: The Dynamsoft Python SDK processes images synchronously. For high-volume scenarios, implement concurrency strategy (worker pools, task queues, horizontal scaling).
- **Document validation logic**: This sample only extracts and parses MRZ data. Business rules for travel document verification are the customer's responsibility.

The only Dynamsoft SDKs required are:

- **Client**: `dynamsoft-mrz-scanner` (JavaScript, Web)
- **Server**: `dynamsoft-capture-vision-bundle` (Python)

## Project Structure

```
araxia/
├── server.py              # Flask server + MRZ API endpoint
├── requirements.txt       # Python dependencies
├── package.json           # JS dependencies (dynamsoft-mrz-scanner v4)
├── .npmrc                 # Dynamsoft private npm registry
├── setup_resources.sh     # Copies JS SDK resources from node_modules to static/dist
├── static/
│   ├── index.html         # Client-side web app (guided capture UI)
│   └── dist/              # MRZ Scanner v4 bundle (custom build) + DCV resources
├── uploads/               # (auto-created) Temporary image storage
└── README.md
```

## Custom MRZ Scanner Build

The `static/dist/mrz-scanner.bundle.js` is a custom build of MRZ Scanner v4 with guided capture enhancements. The modifications are in the wrapper's `MRZScannerView.ts`:

1. **Document framing check**: Before MRZ detection, validates document quad presence and size
2. **Three-state feedback**: No document → "Move your ID", too small → "Move closer", framed → "Hold steady"
3. **Quality-gated capture**: Only auto-captures when MRZ is readable

To rebuild from source:
```bash
cd /path/to/mrz-scanner-javascript-dev
npm run build
cp dist/mrz-scanner.bundle.js /path/to/araxia/static/dist/
```
