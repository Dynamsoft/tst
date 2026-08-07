# MRZ Scanner client + server-side MRZ

A React client that uses [Dynamsoft MRZ Scanner](https://www.dynamsoft.com/mrz-scanner/docs/web/guides/mrz-scanner.html)
to capture a document image, and a Kotlin / Spring Boot server that does **all**
the authoritative MRZ reading.

The browser's MRZ Scanner recognizes the MRZ in real time to confirm the image is
clear, but the result is **discarded** — the document image is posted to
`POST /api/mrz`, where Dynamsoft Capture Vision Java Edition reads it with the
`ReadPassportAndId` template and returns the parsed fields. The client displays
whatever the server says.

This is a variant of
[document-scanner-client-mrz-server](../document-scanner-client-mrz-server/),
which uses Mobile Document Scanner on the client instead. Here, the client uses
MRZ Scanner, which provides built-in MRZ detection to ensure image quality before
upload.

```
web-client/     React 19 + Vite + TypeScript   -> built to web-client/dist
kotlin-server/  Spring Boot + Kotlin, serves that build and exposes /api/mrz
```

## Prerequisites

| | |
|---|---|
| Node.js | 20 or newer |
| JDK | 21 or newer — a **JDK**, not a JRE (`keytool` is needed for the dev certificate) |
| Maven | 3.9 or newer |
| Network | `download2.dynamsoft.com` must be reachable — `com.dynamsoft:dcv` is not on Maven Central |

## Quick start

```bash
# 1. Build the client
cd web-client
npm install
npm run build

# 2. Build and run the server
cd ../kotlin-server
mvn package
java -jar target/mds-mrz-kotlin-server-1.0.0.jar
```

Then open **https://localhost:8080** and accept the certificate warning.

Build the client first. The server exits with an error if `web-client/dist` is
missing.

## How it works

1. User clicks **Scan MRZ Document**.
2. MRZ Scanner opens the camera and performs real-time MRZ recognition.
3. Once a clear MRZ is detected, the scanner captures the document image.
4. The client-side MRZ result is **discarded** — it was only used to confirm
   image clarity.
5. The document image is sent to `POST /api/mrz` on the server.
6. The server reads the MRZ using Dynamsoft Capture Vision Java Edition and
   returns parsed fields.
7. The client displays the server's response.

## Document handling: nothing is stored

The uploaded document never touches the server's disk. See
[document-scanner-client-mrz-server](../document-scanner-client-mrz-server/)
for full details on the security model.

## Licensing

Two **separate** keys are needed:

| Where | What | How to override |
|---|---|---|
| `web-client/src/App.tsx` (`MRZ_LICENSE`) | MRZ Scanner JS, runs in the browser | `VITE_MRZ_LICENSE` at build time |
| `kotlin-server/.../Application.kt` (`LICENSE_KEY`) | Capture Vision **Java Edition**, runs on the server | `DYNAMSOFT_LICENSE` environment variable |

Both bundled licenses are trial keys issued to organization `105714670`.

## Development

```bash
cd web-client && npm run dev     # http://localhost:5173, proxies /api to :8080
```

Run the server too — the Vite dev server only serves the UI and forwards
`/api/mrz` to it.

## Configuration

See [document-scanner-client-mrz-server](../document-scanner-client-mrz-server/)
for the full configuration reference — the server is identical.
