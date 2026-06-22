import { useState } from "react";
import type { CameraEnhancer } from "dynamsoft-capture-vision-bundle";
import { scanDocument, PassportScanResult, ColombianIdScanResult } from "./scanners";
import MrzResultPage from "./components/MrzResultPage";
import BarcodeResultPage from "./components/BarcodeResultPage";
import CameraPicker from "./components/CameraPicker";
import "./App.css";

type View = "landing" | "scanning" | "mrz-result" | "barcode-result";

function App() {
	const [view, setView] = useState<View>("landing");
	const [passport, setPassport] = useState<PassportScanResult | null>(null);
	const [colombianId, setColombianId] = useState<ColombianIdScanResult | null>(null);
	const [cameraEnhancer, setCameraEnhancer] = useState<CameraEnhancer | null>(null);
	const [error, setError] = useState("");

	// returnTo: where to go when the scan is cancelled
	const startScan = async (returnTo: View) => {
		setError("");
		setView("scanning");
		try {
			const result = await scanDocument(setCameraEnhancer);
			if (result?.kind === "mrz") {
				setPassport(result);
				setView("mrz-result");
			} else if (result?.kind === "barcode") {
				setColombianId(result);
				setView("barcode-result");
			} else {
				setView(returnTo);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			setView(returnTo);
		} finally {
			setCameraEnhancer(null);
		}
	};

	const finishFlow = () => {
		setPassport(null);
		setColombianId(null);
		setError("");
		setView("landing");
	};

	return (
		<div className="app-page">
			{error && <div className="error-banner">{error}</div>}

			{view === "landing" && (
				<div className="landing">
					<h1 className="landing-title">Document Verification</h1>
					<p className="landing-subtitle">
						Scan a passport and a Colombian ID, in any order. The scanner detects which
						document you are showing automatically.
					</p>
					<ol className="landing-steps">
						<li>Show either the passport's MRZ or the ID's PDF417 barcode</li>
						<li>Review the result page</li>
						<li>Continue to scan the other document</li>
					</ol>
					<button className="btn-primary landing-start" onClick={() => startScan("landing")}>
						Start Scanning
					</button>
				</div>
			)}

			{view === "scanning" && (
				<>
					<p className="scanning-hint">Scanning...</p>
					{cameraEnhancer && <CameraPicker cameraEnhancer={cameraEnhancer} />}
				</>
			)}

			{view === "mrz-result" && passport && (
				<MrzResultPage
					result={passport}
					onRetake={() => startScan("mrz-result")}
					nextLabel={colombianId ? "Done" : "Scan Barcode"}
					onNext={colombianId ? finishFlow : () => startScan("mrz-result")}
				/>
			)}

			{view === "barcode-result" && colombianId && (
				<BarcodeResultPage
					result={colombianId}
					onRetake={() => startScan("barcode-result")}
					nextLabel={passport ? "Done" : "Scan Passport"}
					onNext={passport ? finishFlow : () => startScan("barcode-result")}
				/>
			)}
		</div>
	);
}

export default App;
