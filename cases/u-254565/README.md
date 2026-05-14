# POC: Medical Form Scanner with Barcode-Based PDF Naming

**Customer**: Damingsoft
**Case**: u-254565
**SDKs**: Dynamic Web TWAIN v19.3.3, Barcode Reader (via Capture Vision v3.4), Document Viewer v4.0
**Framework**: React + Vite (frontend), Python + FastAPI (backend)

## Quick Start

### Prerequisites

- [Dynamsoft Service](https://www.dynamsoft.com/web-twain/downloads/) installed (required for scanner access)
- Node.js 18+
- Python 3.9+

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at http://localhost:5173

### Backend

```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The Vite dev server proxies `/api` requests to the backend automatically.

## What This Demonstrates

- **ADF scanning** via Dynamic Web TWAIN — scan multi-page documents from a desktop scanner
- **Barcode reading** via Dynamsoft Barcode Reader — extract Code 128 text from scanned pages
- **PDF upload** — save scanned documents as PDF, named by the barcode text
- **Document viewing** via Dynamsoft Document Viewer — click uploaded documents to view in-browser

## Workflow

1. Click **Scan (ADF)** to scan pages from the connected scanner
2. Click **Read Barcode** to extract the Code 128 barcode from the current page
3. The barcode text auto-fills as the filename (editable)
4. Click **Upload as PDF** to save all scanned pages as a single PDF to the server
5. The document appears in the right panel as a clickable link
6. Click the link to open the document in Dynamsoft Document Viewer

## Customization Points

| What | Where |
|------|-------|
| License keys | `frontend/src/config.ts` |
| Scanner settings (DPI, duplex) | `frontend/src/components/Scanner.tsx` — `handleScan()` |
| Barcode types | `frontend/src/components/Scanner.tsx` — `handleReadBarcode()` template |
| Upload endpoint | `server/main.py` — `upload_document()` |
| File storage path | `server/main.py` — `UPLOAD_DIR` |

## Deployment (Render.com)

### Backend

1. Create a new **Web Service** on Render
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Set root directory: `cases/u-254565/server`

### Frontend

1. Build: `cd frontend && npm run build`
2. The FastAPI server serves the built frontend from `frontend/dist/` automatically

## SDK Documentation

- [Dynamic Web TWAIN — Getting Started](https://www.dynamsoft.com/web-twain/docs/getstarted/)
- [Barcode Reader JS — API Reference](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/)
- [Document Viewer — Getting Started](https://www.dynamsoft.com/document-viewer/docs/introduction/)
