import { useState, useCallback } from "react";
import Scanner from "./components/Scanner";
import DocumentList from "./components/DocumentList";
import DocumentViewer from "./components/DocumentViewer";
import "./App.css";

interface ViewingDoc {
  url: string;
  filename: string;
}

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [viewingDoc, setViewingDoc] = useState<ViewingDoc | null>(null);

  const handleUploadSuccess = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Medical Form Scanner</h1>
        <p>Scan intake forms &bull; Read barcode &bull; Save as PDF &bull; View uploaded documents</p>
      </header>

      <main className="app-main">
        <Scanner onUploadSuccess={handleUploadSuccess} />
        <DocumentList
          refreshKey={refreshKey}
          onViewDocument={(doc) =>
            setViewingDoc({ url: doc.url, filename: doc.filename })
          }
        />
      </main>

      {viewingDoc && (
        <DocumentViewer
          documentUrl={viewingDoc.url}
          filename={viewingDoc.filename}
          onClose={() => setViewingDoc(null)}
        />
      )}
    </div>
  );
}

export default App;
