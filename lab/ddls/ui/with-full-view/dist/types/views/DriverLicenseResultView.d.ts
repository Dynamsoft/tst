import { SharedResources } from "../DriverLicenseScanner";
import DriverLicenseScannerView from "./DriverLicenseScannerView";
import DriverLicenseCorrectionView from "./DriverLicenseCorrectionView";
import { DriverLicenseFullResult } from "../utils/DriverLicenseParser";
import { ToolbarButtonConfig } from "../utils/types";
export interface DriverLicenseResultViewToolbarButtonsConfig {
    cancel?: ToolbarButtonConfig;
    correct?: ToolbarButtonConfig;
    share?: ToolbarButtonConfig;
    upload?: ToolbarButtonConfig;
    done?: ToolbarButtonConfig;
}
export interface DriverLicenseResultViewConfig {
    container?: HTMLElement | string;
    toolbarButtonsConfig?: DriverLicenseResultViewToolbarButtonsConfig;
    showOriginalImages?: boolean;
    allowResultEditing?: boolean;
    emptyResultMessage?: string;
    onDone?: (scanResult: DriverLicenseFullResult) => Promise<void>;
    onUpload?: (scanResult: DriverLicenseFullResult) => Promise<void>;
}
export default class DriverLicenseResultView {
    private resources;
    private config;
    private scannerView;
    private correctionView;
    private currentScanResultViewResolver?;
    private editedFields;
    private currentScanMode;
    constructor(resources: SharedResources, config: DriverLicenseResultViewConfig, scannerView: DriverLicenseScannerView, correctionView: DriverLicenseCorrectionView);
    launch(): Promise<DriverLicenseFullResult>;
    private handleUploadAndShareBtn;
    private handleShare;
    private handleCorrectImage;
    private handleCancel;
    private handleDone;
    private handleFieldEdit;
    private createDriverLicenseDataDisplay;
    private createImagesDisplay;
    private createControls;
    initialize(): Promise<void>;
    hideView(): void;
    dispose(preserveResolver?: boolean): void;
}
//# sourceMappingURL=DriverLicenseResultView.d.ts.map