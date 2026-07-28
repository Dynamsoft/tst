"use client";

import { useEffect, useRef, useState } from "react";
import "../dynamsoft.config";
import {
  CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter,
} from "dynamsoft-barcode-reader-bundle";

const componentDestroyedErrorMsg = "VideoCapture Component Destroyed";

function VideoCapture() {
  const [resultText, setResultText] = useState("");
  const cameraViewContainer = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    let resolveInit: () => void;
    const pInit: Promise<void> = new Promise((r) => { resolveInit = r; });
    let isDestroyed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);

        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);

        cameraViewContainer.current!.append(cameraView.getUIElement());

        cvRouter = await CaptureVisionRouter.createInstance();
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);
        cvRouter.setInput(cameraEnhancer);

        // Load custom PDF417-only template
        await cvRouter.initSettings("/ReadPDF417.json");
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (!result.barcodeResultItems.length) return;
            let text = "";
            for (let item of result.barcodeResultItems) {
              text += `${item.formatString}: ${item.text}\n\n`;
            }
            setResultText(text);
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);

        await cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);

        // Use the custom template name from the JSON
        await cvRouter.startCapturing("ReadPDF417_SpeedFirst");
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);
      } catch (ex: any) {
        if ((ex as Error)?.message === componentDestroyedErrorMsg) {
          console.log(componentDestroyedErrorMsg);
        } else {
          alert(ex.message || ex);
        }
      }
      resolveInit!();
    })();

    return () => {
      isDestroyed = true;
      pInit.then(() => {
        cvRouter?.dispose();
        cameraEnhancer?.dispose();
      }).catch(() => {});
    };
  }, []);

  return (
    <div>
      <div ref={cameraViewContainer} style={{ width: "100%", height: "70vh", background: "#eee" }} />
      <br />
      Results:
      <div style={{ whiteSpace: "pre-wrap", padding: "10px" }}>{resultText}</div>
    </div>
  );
}

export default VideoCapture;
