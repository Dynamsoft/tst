import { MRZScanner, EnumDocumentSide, MRZDate, MRZImage, MRZResult } from "dynamsoft-mrz-scanner";
import { CapturedResultReceiver, CameraEnhancer } from "dynamsoft-capture-vision-bundle";

// Get a 30-day trial license at https://www.dynamsoft.com/customer/license/trialLicense
// (must include both the MRZ Scanner and the Barcode Reader products).
const DYNAMSOFT_LICENSE = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAwLTEwMzk4OTAwMyIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21sdHMuZHluYW1zb2Z0LmNvbS8iLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMCIsInN0YW5kYnlTZXJ2ZXJVUkwiOiJodHRwczovL3NsdHMuZHluYW1zb2Z0LmNvbS8iLCJjaGVja0NvZGUiOjk0NTQ3NzkxMX0=";

export interface PassportScanResult {
	kind: "mrz";
	firstName: string;
	lastName: string;
	sex: string;
	age: number | null;
	nationality: string;
	documentType: string;
	documentNumber: string;
	issuingState: string;
	dateOfBirth: string;
	dateOfExpiry: string;
	mrzText: string;
	portrait: string;
	mrzSide: string;
	oppositeSide: string;
}

export interface ColombianIdScanResult {
	kind: "barcode";
	format: string;
	text: string;
	byteLength: number;
	resultJson: string;
}

export type DocumentScanResult = PassportScanResult | ColombianIdScanResult | null;

const toDataUrl = (image: MRZImage | null) =>
	image ? image.toCanvas().toDataURL("image/png") : "";

function formatDate(date: MRZDate | undefined): string {
	if (!date || !date.year) return "";
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${date.year}-${pad(date.month)}-${pad(date.day)}`;
}

const DOC_TYPE_LABEL: Record<string, string> = {
	td1_id: "ID Card (TD1)",
	td2_id: "ID Card (TD2)",
	td3_passport: "Passport (TD3)",
	mrva_visa: "Visa (MRV-A)",
	mrvb_visa: "Visa (MRV-B)",
};

function toPassportResult(scanResult: MRZResult): PassportScanResult | null {
	const data = scanResult.data;
	if (!data) {
		return null;
	}

	return {
		kind: "mrz",
		firstName: data.firstName,
		lastName: data.lastName,
		sex: data.sex,
		age: data.age ?? null,
		nationality: data.nationality,
		documentType: DOC_TYPE_LABEL[String(data.documentType)] ?? String(data.documentType),
		documentNumber: data.documentNumber,
		issuingState: data.issuingState,
		dateOfBirth: formatDate(data.dateOfBirth),
		dateOfExpiry: formatDate(data.dateOfExpiry),
		mrzText: data.mrzText,
		portrait: toDataUrl(scanResult.getPortraitImage()),
		mrzSide: toDataUrl(scanResult.getDocumentImage(EnumDocumentSide.MRZ)),
		oppositeSide: toDataUrl(scanResult.getDocumentImage(EnumDocumentSide.Opposite)),
	};
}

const SCAN_HINT = "Point at the MRZ or PDF417 barcode";

/**
 * One camera session that reads both MRZ and PDF417. The custom template adds
 * a PDF417 task to the MRZ pipeline; launch() only resolves with MRZ results,
 * so barcode hits are caught by a receiver on the scanner's internal router
 * and whichever channel produces a result first wins.
 * Returns null when the scan was cancelled.
 *
 * onCameraReady receives the CameraEnhancer once the camera is live, so the
 * caller can mount its own camera picker (see CameraPicker).
 */
export async function scanDocument(
	onCameraReady?: (cameraEnhancer: CameraEnhancer) => void,
): Promise<DocumentScanResult> {
	const mrzScanner = new MRZScanner({
		license: DYNAMSOFT_LICENSE,
		templateFilePath: "mrz-pdf417.template.json",
		// Engine files are copied into public/ by vite.config.ts (self-hosted).
		engineResourcePaths: {
			dcvBundle: "dynamsoft-capture-vision-bundle/dist",
			dcvData: "dynamsoft-capture-vision-data",
		},
		returnDocumentImage: true,
		returnPortraitImage: true,
		scannerViewConfig: {
			// The MRZ guide frame and its scan region don't apply to barcodes.
			enableScanRegion: false,
			messagesConfig: {
				positionMRZ: SCAN_HINT,
				scanMRZFirst: SCAN_HINT,
			},
		},
	});

	try {
		const { resources } = await mrzScanner.initialize();
		if (!resources.cvRouter) {
			throw new Error("MRZ scanner initialization did not provide a CaptureVisionRouter");
		}
		const cvRouter = resources.cvRouter;

		// Hide the default highlights for document boundaries (layer 1) and MRZ
		// text lines (layer 3); the barcode highlight (layer 2) stays visible.
		resources.cameraView?.getDrawingLayer(1)?.setVisible(false);
		resources.cameraView?.getDrawingLayer(3)?.setVisible(false);

		if (resources.cameraEnhancer) {
			onCameraReady?.(resources.cameraEnhancer);
		}

		const barcodeFound = new Promise<ColombianIdScanResult>((resolve) => {
			const receiver = new CapturedResultReceiver();
			receiver.onDecodedBarcodesReceived = (result) => {
				const item = result.barcodeResultItems?.[0];
				if (item) {
					// An explicit summary: the raw item doesn't survive JSON.stringify
					// (item.format is a BigInt, and the bytes would dump as one line
					// per byte).
					const summary = {
						formatString: item.formatString,
						text: item.text,
						byteLength: item.bytes.length,
						confidence: item.confidence,
						angle: item.angle,
						moduleSize: item.moduleSize,
						isMirrored: item.isMirrored,
						isDPM: item.isDPM,
						location: item.location,
						details: item.details,
					};
					resolve({
						kind: "barcode",
						format: item.formatString,
						text: item.text,
						byteLength: item.bytes.length,
						resultJson: JSON.stringify(
							summary,
							(key, value) => (typeof value === "bigint" ? value.toString() : value),
							2,
						),
					});
				}
			};
			cvRouter.addResultReceiver(receiver);
		});

		return await Promise.race([mrzScanner.launch().then(toPassportResult), barcodeFound]);
	} finally {
		mrzScanner.dispose();
	}
}
