import { useCallback, useEffect, useState } from "react";
import { MRZScanner } from "dynamsoft-mrz-scanner";
import { readMrz, type MrzFields } from "./api";
import "./App.css";

/**
 * Client-side trial license for MRZ Scanner.
 * Override at build time with VITE_MRZ_LICENSE.
 */
const MRZ_LICENSE =
  import.meta.env.VITE_MRZ_LICENSE ??
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
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [preview, setPreview] = useState<string | null>(null);

  // Revoke the previous object URL whenever it is replaced.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleScan = useCallback(async () => {
    setStatus({ kind: "scanning" });
    try {
      const scanner = new MRZScanner({
        license: MRZ_LICENSE,
        returnDocumentImage: true,
        returnPortraitImage: false,
      });

      const result = await scanner.launch();

      // User dismissed the scanner without capturing.
      if (result.status !== "RS_SUCCESS") {
        setStatus({ kind: "idle" });
        return;
      }

      // We only care about the document image — the client-side MRZ result is
      // discarded. The MRZ recognition on the client serves solely to confirm
      // the image is clear enough; the authoritative reading comes from the server.
      const docImage = result.getDocumentImage();
      if (!docImage) {
        setStatus({ kind: "error", message: "No document image captured." });
        return;
      }

      const blob = await docImage.toBlob();
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
        <h1>MRZ Scanner + Server-side MRZ</h1>
        <p className="subtitle">
          The browser scans the MRZ to confirm image clarity, then sends the
          document image to the server for authoritative MRZ reading.
        </p>
      </header>

      <p className="privacy-note">
        <strong>Your document is not stored.</strong> The image is held in memory
        only while the MRZ is read, then discarded — it is never written to disk on
        the server and no copy is kept.
      </p>

      <button className="scan-button" onClick={handleScan} disabled={busy}>
        {status.kind === "scanning"
          ? "Scanning…"
          : status.kind === "uploading"
            ? "Reading MRZ on server…"
            : "Scan MRZ Document"}
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
