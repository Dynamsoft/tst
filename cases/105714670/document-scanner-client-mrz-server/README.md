# Document Scanner client + server-side MRZ

A React client that captures and deskews a document in the browser, and a Kotlin
/ Spring Boot server that does **all** the MRZ reading.

The split is the point of this sample. The browser runs
[Mobile Document Scanner for Web](https://www.dynamsoft.com/mobile-web-capture/docs/introduction/index.html)
for capture and boundary correction only — it never parses the MRZ. The deskewed
image is posted to `POST /api/mrz`, where Dynamsoft Capture Vision Java Edition
reads it with the `ReadPassportAndId` template and returns the parsed fields. The
client displays whatever the server says.

Spring Boot is a convenience for the demo, not an SDK requirement. The only
Dynamsoft server dependency is `com.dynamsoft:dcv`.

```
web-client/     React 19 + Vite + TypeScript   -> built to web-client/dist
kotlin-server/  Spring Boot + Kotlin, serves that build and exposes /api/mrz
```

## Prerequisites

| | |
|---|---|
| Node.js | 20 or newer |
| JDK | 25 or newer — a **JDK**, not a JRE (`keytool` is needed for the dev certificate) |
| Maven | 3.9 or newer |
| Network | `download2.dynamsoft.com` must be reachable — `com.dynamsoft:dcv` is not on Maven Central |

### Preparing the environment

Install the three tools, then confirm each is on your `PATH`:

```bash
node --version    # v20.x or newer
java -version     # 25 or newer, and must say "JDK"/"Runtime Environment", not just a JRE
mvn -version      # 3.9 or newer
```

If any command is missing or reports an older version:

- **Node.js 20+** — install from <https://nodejs.org> (LTS build) or via a version manager (`nvm`, `fnm`, `volta`).
- **JDK 25+** — install a full JDK, e.g. [Eclipse Temurin 25](https://adoptium.net/temurin/releases/?version=25) or [Microsoft Build of OpenJDK 25](https://learn.microsoft.com/java/openjdk/download). Set `JAVA_HOME` to the install directory and add `%JAVA_HOME%\bin` (Windows) or `$JAVA_HOME/bin` (Linux/macOS) to your `PATH`. Verify `keytool -help` runs — it ships with the JDK, not a JRE.
- **Maven 3.9+** — install from <https://maven.apache.org/download.cgi> (or `brew install maven`, `choco install maven`, `sdk install maven`) and ensure its `bin` directory is on your `PATH`. Maven uses whatever JDK `JAVA_HOME` points at, so set `JAVA_HOME` to your JDK 25 before building.
- **Network** — the server build downloads `com.dynamsoft:dcv` from `https://download2.dynamsoft.com/maven/jar`. If you are behind a proxy, configure it in Maven's `settings.xml` so this host is reachable.

> Windows note: `run-server.ps1` has a `-Java` parameter (default points at a Temurin JDK 25 path). Pass your own JDK path if it differs, e.g. `./run-server.ps1 -Java "C:\Program Files\Eclipse Adoptium\jdk-25.0.2.8-hotspot\bin\java.exe"`.

## Quick start

```bash
# 1. Build the client (also copies the Dynamsoft engine into public/dynamsoft/)
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
missing, because that is what it serves.

## Running on Linux

The server and client are cross-platform. The `com.dynamsoft:dcv` engine bundles
native libraries for Windows, Linux (`.so`) and macOS (`.dylib`), and all file,
path and `keytool` handling is OS-neutral. The build and run steps are identical
to the Quick start — the only Windows-specific files are the `*.ps1` helper
scripts, which you do not need on Linux:

```bash
cd kotlin-server
mvn package
DYNAMSOFT_LICENSE="your-server-key" java -jar target/mds-mrz-kotlin-server-1.0.0.jar
```

Two things to check on Linux:

- **Use a glibc-based image/distro.** The bundled Linux engine is compiled
  against **glibc** (x86_64). Ubuntu, Debian, RHEL and Amazon Linux work as-is.
  **Alpine / musl** images (common for slim containers) cannot load the engine —
  use a `-glibc` or Debian-slim base instead. On ARM64, confirm your license and
  engine build include an arm64 library before deploying.
- **`keytool` must be present** — it ships with the JDK (not a JRE) and is used
  once to generate the self-signed dev certificate, exactly as on Windows.

## Licensing

Two **separate** keys are needed — one per edition:

| Where | What | How to override |
|---|---|---|
| `web-client/src/App.tsx` (`MDS_LICENSE`) | Mobile Document Scanner, runs in the browser | `VITE_MDS_LICENSE` at build time |
| `kotlin-server/.../Application.kt` (`LICENSE_KEY`) | Capture Vision **Java Edition**, runs on the server | `DYNAMSOFT_LICENSE` environment variable |

Replace both with your own keys. Request a 30-day trial at
<https://www.dynamsoft.com/customer/license/trialLicense>.

```bash
# Linux / macOS
DYNAMSOFT_LICENSE="your-server-key" java -jar target/mds-mrz-kotlin-server-1.0.0.jar

# Windows PowerShell
$env:DYNAMSOFT_LICENSE = "your-server-key"
java -jar target\mds-mrz-kotlin-server-1.0.0.jar
```

## Why HTTPS, and why a certificate warning

The server speaks HTTPS on purpose, using a self-signed certificate it generates
on first start:

- `getUserMedia` (the camera) only works in a **secure context**.
- The Dynamsoft WASM engine needs `SharedArrayBuffer`, which needs
  cross-origin isolation — the `Cross-Origin-Opener-Policy` and
  `Cross-Origin-Embedder-Policy` headers set by `SecurityHeadersFilter.kt`. Those
  only take effect over HTTPS.

`http://localhost` is also a secure context, so a plain-HTTP dev server works on
the same machine — but **not** from a phone or another computer. Hence HTTPS.

The certificate is self-signed, so every browser shows a warning once. Click
through it (Chrome: *Advanced → Proceed*). It is not a trusted CA certificate and
is not meant to be.

### The TLS certificate is yours, and disposable

`keystore.p12` is generated **on your machine, on first start**, and is not part
of this repository — nothing is shared between installations, and there is no key
here belonging to anyone else. Delete it and it is recreated. The keystore
password is the literal `changeit` in `Application.kt`: fine for a throwaway
localhost certificate, and meaningless to anyone without the file, but do not
carry that pattern into production.

For a pilot or anything internet-facing, use a real CA-issued certificate rather
than the generated one. Either supply your own PKCS12 keystore:

```bash
APP_KEYSTORE=/path/to/your.p12 \
APP_KEYSTORE_PASSWORD=your-password \
APP_KEY_ALIAS=your-alias \
java -jar target/mds-mrz-kotlin-server-1.0.0.jar
```

Nothing is generated in that case, and the file is never modified. Or terminate
TLS at a reverse proxy (nginx, Caddy, IIS, a cloud load balancer) and let it
forward to this server — just make sure the proxy still sends the COOP and COEP
headers to the browser, or the WASM engine will not start.

## Testing from a phone or another machine

The certificate must name the address you type, or mobile browsers reject it
outright with no way to continue. Pass the hostname or IP:

```bash
APP_CERT_HOST=192.168.1.50 java -jar target/mds-mrz-kotlin-server-1.0.0.jar
# or several
APP_CERT_HOST=demo.example.com,203.0.113.10 java -jar ...
```

`localhost`, `127.0.0.1`, and any detected site-local IPv4 are always included.
Changing `APP_CERT_HOST` reissues the certificate automatically on next start.
Remember to open the port in your OS firewall.

## Configuration

All optional:

| Variable | Default | Purpose |
|---|---|---|
| `APP_PORT` | `8080` | HTTPS port |
| `APP_CERT_HOST` | *(none)* | Extra hostnames/IPs for the generated certificate, comma-separated |
| `APP_STATIC_DIR` | `../web-client/dist` | Location of the built client |
| `DYNAMSOFT_LICENSE` | bundled key | Server-side license key — **set your own** |
| `APP_KEYSTORE` | *(generate one)* | Your own PKCS12 keystore; disables certificate generation |
| `APP_KEYSTORE_PASSWORD` | `changeit` | Password for `APP_KEYSTORE` |
| `APP_KEY_ALIAS` | `mds-mrz-demo` | Key alias within `APP_KEYSTORE` |

## Development

```bash
cd web-client && npm run dev     # http://localhost:5173, proxies /api to :8080
```

Run the server too — the Vite dev server only serves the UI and forwards
`/api/mrz` to it. Vite sends the same COOP/COEP headers as the server, so dev and
production behave alike.

## API

`POST /api/mrz`, `multipart/form-data` with an `image` field.

```json
{
  "success": true,
  "data": {
    "documentType": "MRTD_TD3_PASSPORT",
    "documentNumber": "422016774",
    "lastName": "NELSON",
    "firstName": "CALLIE",
    "nationality": "United States of America (the)",
    "issuingState": "United States of America (the)",
    "sex": "female",
    "dateOfBirth": "881017",
    "dateOfExpiry": "271223",
    "mrzText": "P<USANELSON<<CALLIE<<<...\n4220167749USA8810171F27122395..."
  }
}
```

Dates are the raw MRZ `YYMMDD` values. An image with no readable MRZ returns
HTTP 200 with `{"success": false, "error": "..."}`; malformed requests and
engine errors return 400/500 with the same shape.

Fields that fail their MRZ check digit come back as empty strings rather than
wrong values — see `validatedField` in `MrzService.kt`.

```bash
curl -k -X POST -F "image=@passport.jpg" https://localhost:8080/api/mrz
```

## Troubleshooting

**`[ERROR] Built client not found`** — run `npm run build` in `web-client/` first.

**`The POM for com.dynamsoft:dcv:jar:3.6.1000 is missing`** — harmless. That
artifact ships without a POM; the jar still resolves.

**404s on `/dynamsoft/...` and the scanner never opens** — the engine files are
missing or stale. Re-run `npm run copy-resources`. They are copied into
`public/dynamsoft/<package>@<version>/`, and the version in the directory name
must match the installed package, which the script handles automatically. After
upgrading `dynamsoft-document-scanner`, rebuild.

**Camera never prompts** — the page is not a secure context, or the certificate
does not cover the hostname you used. Check the address bar is `https://` and see
*Testing from a phone* above.

**`keytool not found`** — you are on a JRE. Use a JDK.

**Port already in use** — set `APP_PORT`.

## Keeping the server running (Windows, optional)

`run-server.ps1` and `install-service.ps1` register a Scheduled Task that keeps
the server alive across crashes and reboots. They are convenience scripts for a
long-lived demo box and are not needed for local development.

```powershell
.\install-service.ps1                                  # install and start
.\install-service.ps1 -CertHost "demo.example.com"     # ...naming this host in the certificate
.\install-service.ps1 -Uninstall                       # stop and remove
```

Logs land in `kotlin-server/logs/` — `supervisor.log` for restart history,
`server.log` for the current run.

Two layers keep it up: `run-server.ps1` restarts the jar whenever it exits, and
the Scheduled Task restarts `run-server.ps1` if that is killed, as well as at
boot. A global mutex and an orphan sweep on startup keep it to one instance.
