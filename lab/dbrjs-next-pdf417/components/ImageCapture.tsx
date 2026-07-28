"use client";

import { useRef, useEffect, MutableRefObject, useState } from "react";
import "../dynamsoft.config";
import {
  EnumCapturedResultItemType, CaptureVisionRouter, BarcodeResultItem,
} from "dynamsoft-barcode-reader-bundle";

function ImageCapture() {
  const [resultText, setResultText] = useState("");
  const pCvRouter: MutableRefObject<Promise<CaptureVisionRouter> | null> = useRef(null);
  const isDestroyed = useRef(false);

  const initRouter = async (): Promise<CaptureVisionRouter> => {
    const cvRouter = await CaptureVisionRouter.createInstance();
    // Load custom PDF417-only template
    await cvRouter.initSettings("/ReadPDF417.json");
    return cvRouter;
  };

  const captureImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...(e.target.files as any as File[])];
    e.target.value = "";
    setResultText("");
    try {
      const cvRouter = await (pCvRouter.current = pCvRouter.current || initRouter());
      if (isDestroyed.current) return;

      let text = "";
      for (let file of files) {
        // Use the custom accuracy-first template for image decoding
        const result = await cvRouter.capture(file, "ReadPDF417_ReadRateFirst");
        if (isDestroyed.current) return;
        if (files.length > 1) text += `\n${file.name}:\n`;
        for (let item of result.items) {
          if (item.type !== EnumCapturedResultItemType.CRIT_BARCODE) continue;
          const b = item as BarcodeResultItem;
          text += `${b.formatString}: ${b.text}\n`;
        }
        if (!result.items.length) text += "No PDF417 barcode found\n";
        setResultText(text);
      }
    } catch (ex: any) {
      alert(ex.message || ex);
    }
  };

  useEffect((): any => {
    isDestroyed.current = false;
    return () => {
      isDestroyed.current = true;
      pCvRouter.current?.then(r => r.dispose()).catch(() => {});
    };
  }, []);

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <p>Select an image containing a PDF417 barcode:</p>
        <input type="file" multiple accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" onChange={captureImage} />
      </div>
      <div style={{ whiteSpace: "pre-wrap", padding: "10px" }}>{resultText}</div>
    </div>
  );
}

export default ImageCapture;
