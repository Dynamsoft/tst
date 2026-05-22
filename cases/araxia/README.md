# Client-side ID Capture + Server-side MRZ Reading

Sample project demonstrating an airline travel document verification flow using Dynamsoft SDKs.

## Architecture

```
Browser (Client)                         Python Server
+---------------------------+            +---------------------------+
| MRZ Scanner v4 (JS)       |            | Flask + DCV Python        |
|                            |            |                           |
| 1. Camera captures doc     |            | 4. Receive image          |
| 2. Client MRZ = quality   |  ------>>  | 5. Extract & parse MRZ    |
|    trigger                 |  POST      | 6. Return parsed JSON     |
| 3. Send document image     |  /api/mrz  |                           |
|                            |  <<------  |                           |
| 7. Display server result   |   JSON     |                           |
+---------------------------+            +---------------------------+
```

**Client side**: Dynamsoft MRZ Scanner v4 for Web
**Server side**: Dynamsoft Capture Vision Bundle for Python (`dynamsoft-capture-vision-bundle`)

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
2. **Client-side capture**: MRZ Scanner v4 detects the document, reads MRZ as a quality trigger
3. **Send to server**: The captured document image is POSTed to `/api/mrz`
4. **Server-side processing**: Python DCV extracts MRZ text, parses all fields (name, document number, nationality, dates, etc.)
5. **Display**: Both client-side and server-side results are shown — the server result is the authoritative one
6. **Cross-verification** (optional): The server-side result can be compared against the client-side MRZ to confirm consistency — a mismatch may indicate image tampering or a low-quality capture

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

The client-side license is configured in `static/index.html` (empty string falls back to trial).

## Deployment Note

This sample uses **Flask** with a self-signed certificate as a lightweight demo server. Flask is **not** part of the Dynamsoft SDK requirements — it is used here solely to serve the web client and expose the MRZ processing API in a single runnable project.

For production deployment, the customer is responsible for:

- **Trusted server environment**: Hosting the backend in their own infrastructure (AWS, Azure, etc.) with proper TLS certificates, containerization (Docker), and security hardening.
- **Web server / framework**: Replacing Flask with their production stack (e.g., Django, FastAPI, Express, or any backend that can call the Dynamsoft Python SDK).
- **Scaling**: The Dynamsoft Python SDK processes images synchronously. For high-volume scenarios (1M+ scans/year), the customer should implement their own concurrency strategy (worker pools, task queues, horizontal scaling).
- **Document validation logic**: This sample only extracts and parses MRZ data. Any business rules for travel document verification (expiry checks, watchlist matching, etc.) are the customer's responsibility.

The only Dynamsoft SDKs required are:

- **Client**: `dynamsoft-mrz-scanner` (JavaScript, Web)
- **Server**: `dynamsoft-capture-vision-bundle` (Python)

## Project Structure

```
ClientIDCapture_ServerMRZReading/
├── server.py              # Flask server + MRZ API endpoint
├── requirements.txt       # Python dependencies
├── package.json           # JS dependencies (dynamsoft-mrz-scanner v4)
├── .npmrc                 # Dynamsoft private npm registry
├── setup_resources.sh     # Copies JS SDK resources from node_modules to static/dist
├── static/
│   ├── index.html         # Client-side web app
│   └── dist/              # (generated) MRZ Scanner v4 bundle + DCV resources
├── uploads/               # (auto-created) Temporary image storage
└── README.md
```
