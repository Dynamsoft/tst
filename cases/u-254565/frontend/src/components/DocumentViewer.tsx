import { useEffect, useRef, useState } from "react";
import { DDV } from "dynamsoft-document-viewer";
import "dynamsoft-document-viewer/dist/ddv.css";
import { CONFIG } from "../config";

interface DocumentViewerProps {
  documentUrl: string;
  filename: string;
  onClose: () => void;
}

let ddvInitialized = false;

export default function DocumentViewer({
  documentUrl,
  filename,
  onClose,
}: DocumentViewerProps) {
  const viewerRef = useRef<InstanceType<typeof DDV.BrowseViewer> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const initAndLoad = async () => {
      try {
        // Initialize DDV (once)
        if (!ddvInitialized) {
          DDV.Core.license = CONFIG.DDV_LICENSE;
          DDV.Core.engineResourcePath = CONFIG.DDV_ENGINE_PATH;
          await DDV.Core.init();
          ddvInitialized = true;
        }

        // Fetch the PDF as blob
        const res = await fetch(documentUrl);
        if (!res.ok) throw new Error(`Failed to fetch document: ${res.statusText}`);
        const blob = await res.blob();

        if (!mounted) return;

        // Create document and load the PDF
        const doc = DDV.documentManager.createDocument();
        await doc.loadSource(blob);

        // Create BrowseViewer for read-only viewing
        const viewer = new DDV.BrowseViewer({
          container: "ddv-viewer-container",
        });
        viewer.openDocument(doc.uid);
        viewerRef.current = viewer;

        setLoading(false);
      } catch (err) {
        console.error("DDV error:", err);
        if (mounted) setError(String(err));
      }
    };

    initAndLoad();

    return () => {
      mounted = false;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [documentUrl]);

  return (
    <div className="viewer-overlay" onClick={onClose}>
      <div className="viewer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="viewer-header">
          <h3>{filename}</h3>
          <button className="btn-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="viewer-body">
          {loading && !error && <p className="viewer-loading">Loading document...</p>}
          {error && <p className="viewer-error">Error: {error}</p>}
          <div id="ddv-viewer-container" className="ddv-container" />
        </div>
      </div>
    </div>
  );
}
