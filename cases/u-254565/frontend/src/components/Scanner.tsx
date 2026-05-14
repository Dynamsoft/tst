import { useEffect, useRef, useState, useCallback } from "react";
import Dynamsoft from "dwt";
import type { WebTwain } from "dwt/dist/types/WebTwain";
import { CONFIG } from "../config";

// Dynamsoft Capture Vision for barcode reading
import { CaptureVisionRouter } from "dynamsoft-capture-vision-bundle";
import { initCVEnvironment } from "../cvInit";

interface ScannerProps {
  onUploadSuccess: () => void;
}

export default function Scanner({ onUploadSuccess }: ScannerProps) {
  const [dwt, setDwt] = useState<WebTwain | null>(null);
  const [scanning, setScanning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [barcodeText, setBarcodeText] = useState("");
  const [statusMsg, setStatusMsg] = useState("Initializing scanner...");
  const initRef = useRef(false);

  // Initialize DWT
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    Dynamsoft.DWT.AutoLoad = false;
    Dynamsoft.DWT.ResourcesPath = CONFIG.DWT_RESOURCES_PATH;
    Dynamsoft.DWT.ProductKey = CONFIG.DWT_PRODUCT_KEY;

    Dynamsoft.DWT.CreateDWTObjectEx(
      { WebTwainId: "poc-scanner" },
      (dwtObj: WebTwain) => {
        dwtObj.Viewer.bind("dwt-viewer");
        dwtObj.Viewer.width = "100%";
        dwtObj.Viewer.height = "100%";
        dwtObj.Viewer.show();
        dwtObj.Viewer.setViewMode(1, -1); // 1 column, auto rows (thumbnail strip)
        setDwt(dwtObj);
        setStatusMsg("Ready — connect your scanner and click Scan.");
      },
      (err: { code: number; message: string }) => {
        console.error("DWT init error:", err.message);
        setStatusMsg(`Error: ${err.message}`);
      }
    );

    // Initialize Capture Vision for barcode reading
    initCVEnvironment();

    return () => {
      Dynamsoft.DWT.DeleteDWTObject("poc-scanner");
    };
  }, []);

  // Scan from ADF
  const handleScan = useCallback(() => {
    if (!dwt) return;
    setScanning(true);
    setStatusMsg("Scanning...");
    setBarcodeText("");

    dwt.SelectSourceByIndex(0);
    dwt.OpenSource();
    dwt.AcquireImage(
      {
        IfFeederEnabled: true, // Enable ADF
        IfDuplexEnabled: false,
        PixelType: Dynamsoft.DWT.EnumDWT_PixelType.TWPT_RGB,
        Resolution: 200,
        IfShowUI: false,
      },
      () => {
        dwt.CloseSource();
        const count = dwt.HowManyImagesInBuffer;
        setImageCount(count);
        setScanning(false);
        setStatusMsg(`Scanned ${count} page(s). Click "Read Barcode" to extract barcode text.`);
      },
      (_, __, errStr: string) => {
        dwt.CloseSource();
        setScanning(false);
        setStatusMsg(`Scan error: ${errStr}`);
      }
    );
  }, [dwt]);

  // Read barcode from first scanned image
  const handleReadBarcode = useCallback(async () => {
    if (!dwt || dwt.HowManyImagesInBuffer === 0) return;
    setStatusMsg("Reading barcode...");

    try {
      // Get current image as blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        dwt.ConvertToBlob(
          [dwt.CurrentImageIndexInBuffer],
          Dynamsoft.DWT.EnumDWT_ImageType.IT_PNG,
          resolve,
          reject
        );
      });

      // Decode barcode using CaptureVisionRouter
      const router = await CaptureVisionRouter.createInstance();
      const result = await router.capture(blob, "ReadBarcodes_Default");
      router.dispose();

      const barcodeItems = result.items?.filter(
        (item: { type: number }) => item.type === 2 // barcode result item type
      );
      if (barcodeItems && barcodeItems.length > 0) {
        const text = (barcodeItems[0] as unknown as { text: string }).text;
        setBarcodeText(text);
        setStatusMsg(`Barcode found: "${text}". Click "Upload as PDF" to save.`);
      } else {
        setStatusMsg("No barcode found on this page. Try another page or enter a name manually.");
      }
    } catch (err) {
      console.error("Barcode read error:", err);
      setStatusMsg(`Barcode read error: ${err}`);
    }
  }, [dwt]);

  // Upload as PDF
  const handleUpload = useCallback(async () => {
    if (!dwt || dwt.HowManyImagesInBuffer === 0 || !barcodeText) return;
    setUploading(true);
    setStatusMsg("Converting to PDF and uploading...");

    try {
      // Convert all scanned images to a single PDF blob
      const indices = Array.from(
        { length: dwt.HowManyImagesInBuffer },
        (_, i) => i
      );
      const pdfBlob = await new Promise<Blob>((resolve, reject) => {
        dwt.ConvertToBlob(
          indices,
          Dynamsoft.DWT.EnumDWT_ImageType.IT_PDF,
          resolve,
          reject
        );
      });

      // Upload to server
      const formData = new FormData();
      formData.append("file", pdfBlob, `${barcodeText}.pdf`);
      formData.append("barcode_text", barcodeText);

      const response = await fetch(`${CONFIG.API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);

      const data = await response.json();
      setStatusMsg(`Uploaded successfully as "${data.filename}".`);

      // Clear buffer for next batch
      dwt.RemoveAllImages();
      setImageCount(0);
      setBarcodeText("");
      onUploadSuccess();
    } catch (err) {
      console.error("Upload error:", err);
      setStatusMsg(`Upload error: ${err}`);
    } finally {
      setUploading(false);
    }
  }, [dwt, barcodeText, onUploadSuccess]);

  return (
    <div className="scanner-panel">
      <h2>Scanner</h2>
      <div className="status-bar">{statusMsg}</div>

      <div id="dwt-viewer" className="dwt-viewer" />

      <div className="scanner-controls">
        <button onClick={handleScan} disabled={!dwt || scanning}>
          {scanning ? "Scanning..." : "Scan (ADF)"}
        </button>

        <button
          onClick={handleReadBarcode}
          disabled={!dwt || imageCount === 0 || scanning}
        >
          Read Barcode
        </button>

        <div className="barcode-input">
          <label>Filename (from barcode):</label>
          <input
            type="text"
            value={barcodeText}
            onChange={(e) => setBarcodeText(e.target.value)}
            placeholder="Barcode text will appear here"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!dwt || imageCount === 0 || !barcodeText || uploading}
          className="btn-primary"
        >
          {uploading ? "Uploading..." : "Upload as PDF"}
        </button>
      </div>

      {imageCount > 0 && (
        <div className="image-count">{imageCount} page(s) in buffer</div>
      )}
    </div>
  );
}
