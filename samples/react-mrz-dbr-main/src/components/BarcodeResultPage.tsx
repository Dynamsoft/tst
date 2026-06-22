import { ColombianIdScanResult } from "../scanners";
import DataSection from "./DataSection";

interface BarcodeResultPageProps {
	result: ColombianIdScanResult;
	onRetake: () => void;
	nextLabel: string;
	onNext: () => void;
}

function BarcodeResultPage({ result, onRetake, nextLabel, onNext }: BarcodeResultPageProps) {
	return (
		<div className="result-page">
			<div className="result-header">
				<h2>Colombian ID Result</h2>
			</div>

			<DataSection
				title="Barcode Information"
				rows={[
					["Format", result.format],
					["Data Size", `${result.byteLength} bytes`],
				]}
			/>

			<section className="raw-text-section">
				<h3 className="data-section-title">Decoded Text</h3>
				<div className="raw-text">{result.text}</div>
			</section>

			<section className="raw-text-section">
				<h3 className="data-section-title">Full Result (JSON)</h3>
				<pre className="raw-text">{result.resultJson}</pre>
			</section>

			<div className="action-buttons">
				<button className="btn-secondary" onClick={onRetake}>
					Retake
				</button>
				<button className="btn-primary" onClick={onNext}>
					{nextLabel}
				</button>
			</div>
		</div>
	);
}

export default BarcodeResultPage;
