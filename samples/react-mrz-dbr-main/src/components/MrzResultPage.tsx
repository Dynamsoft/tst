import { PassportScanResult } from "../scanners";
import DataSection from "./DataSection";

interface MrzResultPageProps {
	result: PassportScanResult;
	onRetake: () => void;
	nextLabel: string;
	onNext: () => void;
}

function formatAge(age: number | null): string {
	if (age == null) return "";
	return `${age} year${age === 1 ? "" : "s"} old`;
}

function MrzResultPage({ result, onRetake, nextLabel, onNext }: MrzResultPageProps) {
	const name = [result.firstName, result.lastName].filter(Boolean).join(" ");
	const genderAge = [result.sex, formatAge(result.age)].filter(Boolean).join(", ");

	return (
		<div className="result-page">
			<div className="result-header">
				<h2>Passport Result</h2>
			</div>

			<div className="summary-card">
				<div className="summary-info">
					<div className="person-name">{name || "—"}</div>
					{genderAge && <div className="person-details">{genderAge}</div>}
					{result.dateOfExpiry && (
						<div className="person-details">Expiry: {result.dateOfExpiry}</div>
					)}
				</div>
				<div className="portrait-box">
					{result.portrait ? (
						<img src={result.portrait} alt="portrait" />
					) : (
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
						</svg>
					)}
				</div>
			</div>

			{(result.mrzSide || result.oppositeSide) && (
				<div className="document-images">
					{result.mrzSide && <img src={result.mrzSide} alt="mrz-side" />}
					{result.oppositeSide && <img src={result.oppositeSide} alt="opposite-side" />}
				</div>
			)}

			<DataSection
				title="Personal Information"
				rows={[
					["Given Name", result.firstName],
					["Surname", result.lastName],
					["Date of Birth", result.dateOfBirth],
					["Gender", result.sex],
					["Nationality", result.nationality],
				]}
			/>

			<DataSection
				title="Document Information"
				rows={[
					["Doc. Type", result.documentType],
					["Doc. Number", result.documentNumber],
					["Issuing State", result.issuingState],
					["Expiry Date", result.dateOfExpiry],
				]}
			/>

			<section className="raw-text-section">
				<h3 className="data-section-title">MRZ Text</h3>
				<div className="raw-text">{result.mrzText}</div>
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

export default MrzResultPage;
