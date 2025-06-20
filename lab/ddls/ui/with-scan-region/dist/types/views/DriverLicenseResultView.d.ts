import { SharedResources } from "../DriverLicenseScanner";
import DriverLicenseScannerView from "./DriverLicenseScannerView";
import DriverLicenseCorrectionView from "./DriverLicenseCorrectionView";
import { DriverLicenseImageResult, EnumDriverLicenseScanSide } from "../utils/DriverLicenseParser";
import { ToolbarButtonConfig } from "../utils/types";
export interface DriverLicenseResultViewToolbarButtonsConfig {
    retake?: ToolbarButtonConfig;
    correct?: ToolbarButtonConfig;
    share?: ToolbarButtonConfig;
    upload?: ToolbarButtonConfig;
    done?: ToolbarButtonConfig;
}
export interface DriverLicenseResultViewConfig {
    container?: HTMLElement | string;
    toolbarButtonsConfig?: DriverLicenseResultViewToolbarButtonsConfig;
    onDone?: (scanResult: DriverLicenseImageResult) => Promise<void>;
    onUpload?: (scanResult: DriverLicenseImageResult) => Promise<void>;
}
export default class DriverLicenseResultView {
    private resources;
    private config;
    private scannerView;
    private correctionView;
    private currentScanResultViewResolver?;
    private currentScanMode;
    constructor(resources: SharedResources, config: DriverLicenseResultViewConfig, scannerView: DriverLicenseScannerView, correctionView: DriverLicenseCorrectionView);
    launch(mode?: EnumDriverLicenseScanSide): Promise<DriverLicenseImageResult>;
    private handleUploadAndShareBtn;
    private handleShare;
    private handleCorrectImage;
    private handleRetake;
    private handleDone;
    private createControls;
    initialize(): Promise<void>;
    hideView(): void;
    dispose(preserveResolver?: boolean): void;
}
//# sourceMappingURL=DriverLicenseResultView.d.ts.map