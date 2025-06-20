import { SharedResources } from "../DriverLicenseScanner";
import DriverLicenseScannerView from "./DriverLicenseScannerView";
import DriverLicenseCorrectionView from "./DriverLicenseCorrectionView";
import { DriverLicenseImageResult, EnumDriverLicenseScanSide } from "../utils/DriverLicenseParser";
import { ToolbarButtonConfig } from "../utils/types";
import { VerifyViewText } from "../utils/strings";
export interface DriverLicenseVerifyViewToolbarButtonsConfig {
    retake?: ToolbarButtonConfig;
    correct?: ToolbarButtonConfig;
    share?: ToolbarButtonConfig;
    upload?: ToolbarButtonConfig;
    done?: ToolbarButtonConfig;
}
export interface DriverLicenseVerifyViewConfig {
    container?: HTMLElement | string;
    textConfig?: Record<EnumDriverLicenseScanSide, VerifyViewText>;
    toolbarButtonsConfig?: DriverLicenseVerifyViewToolbarButtonsConfig;
    onDone?: (scanResult: DriverLicenseImageResult) => Promise<void>;
    onUpload?: (scanResult: DriverLicenseImageResult) => Promise<void>;
}
export default class DriverLicenseVerifyView {
    private resources;
    private config;
    private scannerView;
    private correctionView;
    private currentScanVerifyViewResolver?;
    private currentScanMode;
    constructor(resources: SharedResources, config: DriverLicenseVerifyViewConfig, scannerView: DriverLicenseScannerView, correctionView: DriverLicenseCorrectionView);
    private getText;
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
//# sourceMappingURL=DriverLicenseVerifyView.d.ts.map