interface DataSectionProps {
	title: string;
	rows: Array<[label: string, value: string]>;
}

function DataSection({ title, rows }: DataSectionProps) {
	return (
		<section className="data-section">
			<h3 className="data-section-title">{title}</h3>
			{rows.map(([label, value]) => (
				<div className="data-row" key={label}>
					<span className="data-row-label">{label}</span>
					<span className="data-row-value">{value || "—"}</span>
				</div>
			))}
		</section>
	);
}

export default DataSection;
