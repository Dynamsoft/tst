# MRZ Scanner: Client and Server

Sample project demonstrating guided travel document capture with real-time quality feedback and server-side MRZ verification for airline travel document verification.

**MRZ scanning runs on both ends, for two different jobs:**

- **Client** — Dynamsoft MRZ Scanner v4 (JS/WASM) reads the MRZ purely as a *quality gate*. Its result is never shown to the user; it only decides when the document is framed and legible enough to auto-capture.
- **Server** — Dynamsoft Capture Vision (Python *or* Java/Kotlin) re-reads the MRZ from the uploaded image and produces the *authoritative* result that the UI displays.

That split is the point of the sample: an untrusted client can guide the capture, but only the server's read is trusted.

## Architecture

```
Browser (Client)                         Backend Server
+---------------------------+            +---------------------------+
| MRZ Scanner v4 (JS)       |            | Flask + DCV Python  -or-  |
|                           |            | Spring Boot + DCV Java    |
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
**Server side**: Dynamsoft Capture Vision — Python (`dynamsoft-capture-vision-bundle`) or Java/Kotlin (`com.dynamsoft:dcv`)

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

## Two Interchangeable Backends

The same client (`static/`) is served by either backend. Both expose an identical
`POST /api/mrz` contract, so you can swap one for the other with no client change.

| | `python-server/` | `kotlin-server/` |
|---|---|---|
| Language | Python 3.10 – 3.14 | Kotlin 2.4 / JDK 21 |
| Web framework | Flask (dev server) | Spring Boot 4 (embedded Tomcat) |
| Dynamsoft SDK | `dynamsoft-capture-vision-bundle` (PyPI) | `com.dynamsoft:dcv` (Dynamsoft Maven) |
| Best for | quick evaluation | **long-running / soak testing** |

Only one can run at a time — they both bind port 5000.

## Prerequisites

- Node.js 18+ and npm — for the shared client resources (one-time)
- A Dynamsoft license key with the **Label Recognizer** module enabled — MRZ needs
  it. [Request a trial](https://www.dynamsoft.com/customer/license/triallicense/) or
  contact [Dynamsoft Support](https://www.dynamsoft.com/company/contact/).
- Python 3.10 – 3.14 *(for the Python backend)*
- JDK 21 and Maven 3.9+ *(for the Kotlin backend)*

## Quick Start

### 1. Client resources (once, shared by both backends)

```bash
npm install
bash setup_resources.sh
```

This copies the MRZ Scanner v4 bundle and DCV engine resources into `static/dist/`.
If `static/dist/` is already populated, you can skip this step.

### 2a. Run the Python backend

```bash
cd python-server
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt   # Windows
python server.py
```

### 2b. Run the Kotlin backend

```bash
cd kotlin-server
mvn package
java -jar target/mrz-kotlin-server-1.0.0.jar
```

Open **https://localhost:5000** in your browser (accept the self-signed certificate warning).

Both backends serve the client from `../static` by default. Override with the
`APP_STATIC_DIR` environment variable.

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
- **Server**: `dynamsoft-capture-vision-bundle` (Python) *or* `com.dynamsoft:dcv` (Java/Kotlin)

## Long-Running / Soak Testing

**Use the Kotlin backend.** Spring Boot runs on embedded Tomcat, which is a real
production servlet container: a thread pool, no auto-reloader, no debugger, and
stable over multi-day uptimes.

```bash
cd kotlin-server
java -jar target/mrz-kotlin-server-1.0.0.jar
```

The Python backend's `app.run(debug=True)` is the **Werkzeug development server**
and is not suitable for extended runs — it prints its own warning on startup. It
runs a filesystem-watching reloader child process and exposes an interactive
debugger.

Platform caveat for the Python backend:

- `gunicorn` (in `requirements.txt`, configured by `gunicorn.conf.py`) is
  **POSIX-only** — it imports `fcntl` and cannot run on Windows at all. It is there
  for Linux/container deployments.
- On Windows, the steady Python option is `waitress` (`pip install waitress`), but
  it terminates no TLS, so the camera flow — which requires HTTPS — needs a reverse
  proxy such as nginx or Caddy in front of it.

Since the client needs HTTPS for camera access and COOP/COEP for SharedArrayBuffer,
the Kotlin backend is the path of least resistance for sustained testing on Windows.

## Project Structure

```
mrz-scanner-client-and-server/
├── static/                     # Shared client — served by BOTH backends
│   ├── index.html              # Client-side web app (guided capture UI)
│   └── dist/                   # MRZ Scanner v4 bundle (custom build) + DCV resources
├── python-server/
│   ├── server.py               # Flask server + MRZ API endpoint
│   ├── requirements.txt        # Python dependencies
│   ├── gunicorn.conf.py        # Linux-only production config (see note below)
│   └── uploads/                # (auto-created) Temporary image storage
├── kotlin-server/
│   ├── pom.xml                 # Maven build (Spring Boot 4 + com.dynamsoft:dcv)
│   ├── .mvn/                   # Build JVM settings (small-memory hosts)
│   ├── src/main/kotlin/com/dynamsoft/sample/mrz/
│   │   ├── Application.kt      # Entry point, license init, HTTPS setup
│   │   ├── MrzService.kt       # CaptureVisionRouter + MRZ field extraction
│   │   ├── MrzController.kt    # POST /api/mrz
│   │   ├── SecurityHeadersFilter.kt  # COOP/COEP for SharedArrayBuffer
│   │   └── DevKeystore.kt      # Self-signed cert (Flask ssl_context="adhoc" equivalent)
│   ├── keystore.p12            # (auto-created) Dev certificate
│   └── uploads/                # (auto-created) Temporary image storage
├── package.json                # JS dependencies (dynamsoft-mrz-scanner v4)
├── setup_resources.sh          # Copies JS SDK resources from node_modules to static/dist
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
