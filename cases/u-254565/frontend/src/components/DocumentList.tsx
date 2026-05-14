import { useEffect, useState } from "react";
import { CONFIG } from "../config";

interface Document {
  filename: string;
  size: number;
  uploaded_at: string;
  url: string;
}

interface DocumentListProps {
  refreshKey: number;
  onViewDocument: (doc: Document) => void;
}

export default function DocumentList({
  refreshKey,
  onViewDocument,
}: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/documents`);
        const data = await res.json();
        setDocuments(data.documents || []);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, [refreshKey]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString();
  };

  if (loading) return <div className="doc-list-panel"><p>Loading...</p></div>;

  return (
    <div className="doc-list-panel">
      <h2>Uploaded Documents ({documents.length})</h2>

      {documents.length === 0 ? (
        <p className="empty-msg">
          No documents uploaded yet. Scan and upload to see them here.
        </p>
      ) : (
        <ul className="doc-list">
          {documents.map((doc) => (
            <li key={doc.filename} className="doc-item">
              <button
                className="doc-link"
                onClick={() => onViewDocument(doc)}
                title={`View ${doc.filename}`}
              >
                {doc.filename}
              </button>
              <span className="doc-meta">
                {formatSize(doc.size)} &middot; {formatDate(doc.uploaded_at)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
