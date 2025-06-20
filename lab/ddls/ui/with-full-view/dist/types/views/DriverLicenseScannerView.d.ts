import { OriginalImageResultItem, Quadrilateral, CapturedResult, DeskewedImageResultItem } from "dynamsoft-capture-vision-bundle";
import { SharedResources } from "../DriverLicenseScanner";
import { DriverLicenseImageResult, EnumDriverLicenseScanMode, EnumDriverLicenseScanSide } from "../utils/DriverLicenseParser";
import { DriverLicenseWorkflowConfig, UtilizedTemplateNames } from "../utils/types";
import { ScannerViewText } from "../utils/strings";
export interface DriverLicenseScannerViewConfig {
    _showCorrectionView?: boolean;
    _workflowConfig?: DriverLicenseWorkflowConfig;
    templateFilePath?: string;
    uiPath?: string;
    container?: HTMLElement | string;
    utilizedTemplateNames?: UtilizedTemplateNames;
    showScanHint?: boolean;
    showScanGuide?: boolean;
    showUploadImage?: boolean;
    showSoundToggle?: boolean;
    showManualCaptureButton?: boolean;
    showPoweredByDynamsoft?: boolean;
    textConfig?: Record<EnumDriverLicenseScanSide, ScannerViewText>;
}
export default class DriverLicenseScannerView {
    private resources;
    private config;
    private currentScanMode;
    private currentScanSide;
    private boundsDetectionEnabled;
    private smartCaptureEnabled;
    private autoCropEnabled;
    private licenseVerificationCount;
    private capturedResult;
    private originalImageData;
    private initialized;
    private initializedDCE;
    private resizeTimer;
    private DCE_ELEMENTS;
    private currentScanResolver?;
    private loadingScreen;
    private showScannerLoadingOverlay;
    private hideScannerLoadingOverlay;
    private handleResize;
    private getText;
    constructor(resources: SharedResources, config: DriverLicenseScannerViewConfig);
    initialize(): Promise<void>;
    private initializeElements;
    private assignDCEClickEvents;
    handleCloseBtn(): Promise<void>;
    private attachOptionClickListeners;
    private highlightCameraAndResolutionOption;
    private toggleSelectCameraBox;
    private uploadImage;
    private fileToBlob;
    toggleAutoCaptureAnimation(enabled?: boolean): Promise<void>;
    toggleBoundsDetection(enabled?: boolean): Promise<void>;
    toggleSmartCapture(mode?: boolean): Promise<void>;
    toggleAutoCrop(mode?: boolean): Promise<void>;
    private toggleScanGuide;
    private toggleScanHintMessage;
    private calculateScanRegion;
    openCamera(): Promise<void>;
    closeCamera(hideContainer?: boolean): Promise<void>;
    pauseCamera(): void;
    stopCapturing(): void;
    private getFlowType;
    takePhoto(): Promise<void>;
    handleBoundsDetection(result: CapturedResult): Promise<void>;
    /**
     * Normalize an image with DDN given a set of points
     * @param points - points provided by either users or DDN's detect quad
     * @returns normalized image by DDN
     */
    private handleAutoCaptureMode;
    launch(side?: EnumDriverLicenseScanSide, mode?: EnumDriverLicenseScanMode): Promise<DriverLicenseImageResult>;
    normalizeImage(points: Quadrilateral["points"], originalImageData: OriginalImageResultItem["imageData"]): Promise<DeskewedImageResultItem>;
}
//# sourceMappingURL=DriverLicenseScannerView.d.ts.map