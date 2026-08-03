import { useCallback, useEffect, useRef, useState } from "react";
import { DocumentScanner } from "dynamsoft-document-scanner";
import { readMrz, type MrzFields } from "./api";
import "./App.css";

/**
 * Client-side trial license for Mobile Document Scanner.
 * Override at build time with VITE_MDS_LICENSE.
 */
const MDS_LICENSE =
  import.meta.env.VITE_MDS_LICENSE ??
  "DLS2eyJoYW5kc2hha2VDb2RlIjoiMTA1NzE0NjcwLU1UQTFOekUwTmpjd0xYZGxZaTFVY21saGJGQnliMm8iLCJtYWluU2VydmVyVVJMIjoiaHR0cHM6Ly9tZGxzLmR5bmFtc29mdG9ubGluZS5jb20vIiwib3JnYW5pemF0aW9uSUQiOiIxMDU3MTQ2NzAiLCJzdGFuZGJ5U2VydmVyVVJMIjoiaHR0cHM6Ly9zZGxzLmR5bmFtc29mdG9ubGluZS5jb20vIiwiY2hlY2tDb2RlIjo2NTc2MDU0Mzh9";

type Status =
  | { kind: "idle" }
  | { kind: "scanning" }
  | { kind: "uploading" }
  | { kind: "done"; fields: MrzFields }
  | { kind: "error"; message: string };

const FIELD_LABELS: Array<[keyof MrzFields, string]> = [
  ["documentType", "Document type"],
  ["documentNumber", "Document number"],
  ["lastName", "Last name"],
  ["firstName", "First name"],
  ["nationality", "Nationality"],
  ["issuingState", "Issuing state"],
  ["sex", "Sex"],
  ["dateOfBirth", "Date of birth"],
  ["dateOfExpiry", "Date of expiry"],
];

export default function App() {
  const scannerRef = useRef<DocumentScanner | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [preview, setPreview] = useState<string | null>(null);

  // One scanner instance for the lifetime of the component. Creating it lazily
  // on first scan would stall the UI while the WASM engine loads.
  useEffect(() => {
    scannerRef.current = new DocumentScanner({
      license: MDS_LICENSE,
      // Self-hosted engine — see scripts/copy-resources.mjs. Required because
      // the page is served with COEP require-corp.
      engineResourcePaths: { rootDirectory: "/dynamsoft/" },
    });

    return () => {
      scannerRef.current?.dispose?.();
      scannerRef.current = null;
    };
  }, []);

  // Revoke the previous object URL whenever it is replaced, so repeated scans
  // don't leak blobs.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleScan = useCallback(async () => {
    const scanner = scannerRef.current;
    if (!scanner) return;

    setStatus({ kind: "scanning" });
    try {
      const result = await scanner.launch();

      // User dismissed the scanner without capturing.
      if (!result?.correctedImageResult) {
        setStatus({ kind: "idle" });
        return;
      }

      const blob = await result.correctedImageResult.toBlob("image/jpeg");
      setPreview((old) => {
        if (old) URL.revokeObjectURL(old);
        return URL.createObjectURL(blob);
      });

      setStatus({ kind: "uploading" });
      const response = await readMrz(blob);

      if (response.success) {
        setStatus({ kind: "done", fields: response.data });
      } else {
        setStatus({ kind: "error", message: response.error });
      }
    } catch (e) {
      setStatus({ kind: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }, []);

  const busy = status.kind === "scanning" || status.kind === "uploading";

  return (
    <main className="app">
      <header>
        <h1>Document Scanner + Server-side MRZ</h1>
        <p className="subtitle">
          The browser captures and deskews the document. All MRZ recognition happens
          on the server.
        </p>
      </header>

      <button className="scan-button" onClick={handleScan} disabled={busy}>
        {status.kind === "scanning"
          ? "Scanning…"
          : status.kind === "uploading"
            ? "Reading MRZ on server…"
            : "Scan Document"}
      </button>

      {preview && (
        <section className="panel">
          <h2>Captured document</h2>
          <img className="preview" src={preview} alt="Captured document" />
        </section>
      )}

      {status.kind === "error" && (
        <section className="panel error">
          <h2>Could not read MRZ</h2>
          <p>{status.message}</p>
          <p className="hint">Rescan with better lighting and the full document in frame.</p>
        </section>
      )}

      {status.kind === "done" && (
        <section className="panel">
          <h2>Server-verified MRZ</h2>
          <dl className="fields">
            {FIELD_LABELS.map(([key, label]) => (
              <div key={key} className="field">
                <dt>{label}</dt>
                <dd>{status.fields[key] || "—"}</dd>
              </div>
            ))}
          </dl>
          {status.fields.mrzText && (
            <pre className="mrz-text">{status.fields.mrzText}</pre>
          )}
        </section>
      )}
    </main>
  );
}
