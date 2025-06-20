import { DeskewedImageResultItem, OriginalImageResultItem, DCEFrame, Quadrilateral, CapturedResult, EngineResourcePaths, CaptureVisionRouter, CameraEnhancer, CameraView } from 'dynamsoft-capture-vision-bundle';
import * as dynamsoftCaptureVisionBundle from 'dynamsoft-capture-vision-bundle';
export { dynamsoftCaptureVisionBundle as Dynamsoft };
export { DeskewedImageResultItem } from 'dynamsoft-capture-vision-bundle';

declare enum EnumDriverLicenseScanMode {
    Image = "image",
    Barcode = "barcode"
}
declare enum EnumDriverLicenseScanSide {
    Front = "frontSide",
    Back = "backSide"
}
declare enum EnumDriverLicenseScannerViews {
    Scanner = "scanner",
    Result = "scan-result",
    Verify = "scan-verify",
    Correction = "correction"
}
declare enum EnumDriverLicenseData {
    InvalidFields = "invalidFields",
    LicenseType = "licenseType",
    LicenseNumber = "licenseNumber",
    FullName = "fullName",
    FirstName = "firstName",
    LastName = "lastName",
    MiddleName = "middleName",
    DateOfBirth = "dateOfBirth",
    ExpiryDate = "expiryDate",
    IssueDate = "issueDate",
    Age = "age",
    Sex = "sex",
    Height = "height",
    Weight = "weight",
    EyeColor = "eyeColor",
    HairColor = "hairColor",
    Address = "address",
    City = "city",
    State = "state",
    PostalCode = "postalCode",
    VehicleClass = "vehicleClass",
    Restrictions = "restrictions",
    Endorsements = "endorsements",
    IssuingCountry = "issuingCountry",
    DocumentDiscriminator = "documentDiscriminator"
}
declare enum EnumDriverLicenseType {
    AAMVA_DL_ID = "AAMVA_DL_ID",
    AAMVA_DL_ID_WITH_MAG_STRIPE = "AAMVA_DL_ID_WITH_MAG_STRIPE",
    SOUTH_AFRICA_DL = "SOUTH_AFRICA_DL"
}
interface DriverLicenseDate {
    year: number;
    month: number;
    day: number;
}
interface DriverLicenseData {
    _flowType?: EnumFlowType;
    status: ResultStatus;
    [EnumDriverLicenseData.InvalidFields]?: EnumDriverLicenseData[];
    [EnumDriverLicenseData.LicenseType]?: EnumDriverLicenseType;
    [EnumDriverLicenseData.LicenseNumber]?: string;
    [EnumDriverLicenseData.FullName]?: string;
    [EnumDriverLicenseData.FirstName]?: string;
    [EnumDriverLicenseData.LastName]?: string;
    [EnumDriverLicenseData.MiddleName]?: string;
    [EnumDriverLicenseData.DateOfBirth]?: DriverLicenseDate;
    [EnumDriverLicenseData.ExpiryDate]?: DriverLicenseDate;
    [EnumDriverLicenseData.IssueDate]?: DriverLicenseDate;
    [EnumDriverLicenseData.Age]?: number;
    [EnumDriverLicenseData.Sex]?: string;
    [EnumDriverLicenseData.Height]?: string;
    [EnumDriverLicenseData.Weight]?: string;
    [EnumDriverLicenseData.EyeColor]?: string;
    [EnumDriverLicenseData.HairColor]?: string;
    [EnumDriverLicenseData.Address]?: string;
    [EnumDriverLicenseData.City]?: string;
    [EnumDriverLicenseData.State]?: string;
    [EnumDriverLicenseData.PostalCode]?: string;
    [EnumDriverLicenseData.VehicleClass]?: string;
    [EnumDriverLicenseData.Restrictions]?: string;
    [EnumDriverLicenseData.Endorsements]?: string;
    [EnumDriverLicenseData.IssuingCountry]?: string;
    [EnumDriverLicenseData.DocumentDiscriminator]?: string;
}
interface DriverLicenseImageResult {
    status: ResultStatus;
    deskewedImageResult?: DeskewedImageResultItem | {
        imageData: OriginalImageResultItem["imageData"];
        toBlob: () => Blob;
    };
    originalImageResult?: OriginalImageResultItem["imageData"] | DCEFrame;
    detectedQuadrilateral?: Quadrilateral;
    _flowType?: EnumFlowType;
    imageData?: boolean;
    _imageData?: DeskewedImageResultItem | {
        imageData: OriginalImageResultItem["imageData"];
        toBlob: () => Blob;
    };
}
interface DriverLicenseFullResult {
    [EnumDriverLicenseScanSide.Front]: DriverLicenseImageResult;
    [EnumDriverLicenseScanSide.Back]: DriverLicenseImageResult;
    licenseData?: DriverLicenseData;
}

interface UtilizedTemplateNames {
    detect: string;
    normalize: string;
    barcode: string;
}
declare enum EnumResultStatus {
    RS_SUCCESS = 0,
    RS_CANCELLED = 1,
    RS_FAILED = 2
}
type ResultStatus = {
    code: EnumResultStatus;
    message?: string;
};
declare enum EnumFlowType {
    MANUAL = "manual",
    SMART_CAPTURE = "smartCapture",
    AUTO_CROP = "autoCrop",
    UPLOADED_IMAGE = "uploadedImage",
    STATIC_FILE = "staticFile"
}
type ToolbarButtonConfig = Pick<ToolbarButton, "icon" | "label" | "className" | "isHidden">;
interface ToolbarButton {
    id: string;
    icon: string;
    label: string;
    onClick?: () => void | Promise<void>;
    className?: string;
    isDisabled?: boolean;
    isHidden?: boolean;
}
interface DriverLicenseWorkflowConfig {
    captureFrontImage?: boolean;
    captureBackImage?: boolean;
    readBarcode?: boolean;
    scanOrder?: EnumDriverLicenseScanSide[];
}

interface DriverLicenseCorrectionViewToolbarButtonsConfig {
    fullImage?: ToolbarButtonConfig;
    detectBorders?: ToolbarButtonConfig;
    apply?: ToolbarButtonConfig;
}
interface DriverLicenseCorrectionViewConfig {
    container?: HTMLElement | string;
    toolbarButtonsConfig?: DriverLicenseCorrectionViewToolbarButtonsConfig;
    templateFilePath?: string;
    utilizedTemplateNames?: UtilizedTemplateNames;
    onFinish?: (result: DriverLicenseImageResult) => void;
    _showResultView?: boolean;
}
declare class DriverLicenseCorrectionView {
    private resources;
    private config;
    private imageEditorView;
    private layer;
    private currentCorrectionResolver?;
    constructor(resources: SharedResources, config: DriverLicenseCorrectionViewConfig);
    initialize(): Promise<void>;
    private setupDrawingLayerStyle;
    private setupQuadConstraints;
    private getCanvasBounds;
    private addQuadToLayer;
    private setupInitialDetectedQuad;
    private createControls;
    private setupCorrectionControls;
    setFullImageBoundary(): void;
    setBoundaryAutomatically(): Promise<void>;
    confirmCorrection(): Promise<void>;
    launch(): Promise<DriverLicenseImageResult>;
    hideView(): void;
    /**
     * Normalize an image with DDN given a set of points
     * @param points - points provided by either users or DDN's detect quad
     * @returns normalized image by DDN
     */
    correctImage(points: Quadrilateral["points"]): Promise<DeskewedImageResultItem>;
    dispose(): void;
}

interface ScannerViewText {
    openingCamera?: string;
    processingImage?: string;
    hintStart?: string;
    hintInProgress?: string;
    hintMoveCloser?: string;
}
interface VerifyViewText {
    title?: string;
    hintVerify?: string;
    barcodeNotFound?: string;
}

interface DriverLicenseScannerViewConfig {
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
declare class DriverLicenseScannerView {
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

interface DriverLicenseResultViewToolbarButtonsConfig {
    cancel?: ToolbarButtonConfig;
    correct?: ToolbarButtonConfig;
    share?: ToolbarButtonConfig;
    upload?: ToolbarButtonConfig;
    done?: ToolbarButtonConfig;
}
interface DriverLicenseResultViewConfig {
    container?: HTMLElement | string;
    toolbarButtonsConfig?: DriverLicenseResultViewToolbarButtonsConfig;
    showOriginalImages?: boolean;
    allowResultEditing?: boolean;
    emptyResultMessage?: string;
    onDone?: (scanResult: DriverLicenseFullResult) => Promise<void>;
    onUpload?: (scanResult: DriverLicenseFullResult) => Promise<void>;
}
declare class DriverLicenseResultView {
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

interface DriverLicenseVerifyViewToolbarButtonsConfig {
    retake?: ToolbarButtonConfig;
    correct?: ToolbarButtonConfig;
    share?: ToolbarButtonConfig;
    upload?: ToolbarButtonConfig;
    done?: ToolbarButtonConfig;
}
interface DriverLicenseVerifyViewConfig {
    container?: HTMLElement | string;
    textConfig?: Record<EnumDriverLicenseScanSide, VerifyViewText>;
    toolbarButtonsConfig?: DriverLicenseVerifyViewToolbarButtonsConfig;
    onDone?: (scanResult: DriverLicenseImageResult) => Promise<void>;
    onUpload?: (scanResult: DriverLicenseImageResult) => Promise<void>;
}
declare class DriverLicenseVerifyView {
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

interface DriverLicenseScannerConfig {
    license?: string;
    container?: HTMLElement | string;
    workflowConfig?: DriverLicenseWorkflowConfig;
    templateFilePath?: string;
    utilizedTemplateNames?: UtilizedTemplateNames;
    engineResourcePaths?: EngineResourcePaths;
    scannerViewConfig?: Omit<DriverLicenseScannerViewConfig, "templateFilePath" | "utilizedTemplateNames" | "_showCorrectionView">;
    verifyViewConfig?: DriverLicenseVerifyViewConfig;
    resultViewConfig?: DriverLicenseResultViewConfig;
    correctionViewConfig?: Omit<DriverLicenseCorrectionViewConfig, "templateFilePath" | "utilizedTemplateNames" | "_showCorrectionView">;
    showVerifyView?: boolean;
    showResultView?: boolean;
    showCorrectionView?: boolean;
}
interface SharedResources {
    cvRouter?: CaptureVisionRouter;
    cameraEnhancer?: CameraEnhancer;
    cameraView?: CameraView;
    result?: DriverLicenseFullResult;
    onResultUpdated?: (result: DriverLicenseFullResult) => void;
}
declare class DriverLicenseScanner {
    private config;
    private scannerView?;
    private scanVerifyView?;
    private scanResultView?;
    private correctionView?;
    private fullResult?;
    private resources;
    private isInitialized;
    private isCapturing;
    private isDynamsoftResourcesLoaded;
    protected isFileMode: boolean;
    private currentScanStep;
    private scanSequence;
    private loadingScreen;
    private showLoadingOverlay;
    private hideLoadingOverlay;
    constructor(config: DriverLicenseScannerConfig);
    private initializeDynamsoftResources;
    private initializeDCVResources;
    initialize(): Promise<{
        resources: SharedResources;
        components: {
            scannerView?: DriverLicenseScannerView;
            correctionView?: DriverLicenseCorrectionView;
            scanVerifyView?: DriverLicenseVerifyView;
            scanResultView?: DriverLicenseResultView;
        };
    }>;
    private shouldCreateDefaultContainer;
    private createDefaultDDLSContainer;
    private checkForTemporaryLicense;
    private validateViewConfigs;
    private showCorrectionView;
    private showVerifyView;
    private showResultView;
    private validateWorkflowConfig;
    private buildScanSequence;
    private initializeDDLSConfig;
    private createViewContainers;
    dispose(): void;
    private executeCurrentScanStep;
    private processBarcodeStep;
    private processBarcodeFromCapturedImages;
    /**
     * Launches the driver license scanning process with configurable workflow.
     *
     * Workflow Configuration:
     * - captureFrontImage: Whether to capture front side image
     * - captureBackImage: Whether to capture back side image
     * - readLicenseBarcode: Whether to scan the license barcode
     * - scanOrder: Order of image capture (front first or back first)
     *
     * Example workflows:
     * 1. All true (default): Capture front → back → barcode
     * 2. Front only: Capture front image only
     * 3. Back only: Capture back image only
     * 4. Barcode only: Scan barcode with live camera
     * 5. Front + Barcode: Capture front → scan barcode
     * 6. Back + Barcode: Capture back → scan barcode
     */
    launch(): Promise<DriverLicenseFullResult>;
}

declare const DDLS: {
    DriverLicenseScanner: typeof DriverLicenseScanner;
    DriverLicenseNormalizerView: typeof DriverLicenseCorrectionView;
    DriverLicenseScannerView: typeof DriverLicenseScannerView;
    DriverLicenseResultView: typeof DriverLicenseResultView;
    EnumResultStatus: typeof EnumResultStatus;
    EnumFlowType: typeof EnumFlowType;
    EnumDriverLicenseScannerViews: typeof EnumDriverLicenseScannerViews;
    EnumDriverLicenseScanSide: typeof EnumDriverLicenseScanSide;
};

export { DDLS, DriverLicenseCorrectionViewConfig, DriverLicenseCorrectionViewToolbarButtonsConfig, DriverLicenseImageResult, DriverLicenseCorrectionView as DriverLicenseNormalizerView, DriverLicenseResultView, DriverLicenseResultViewConfig, DriverLicenseResultViewToolbarButtonsConfig, DriverLicenseScanner, DriverLicenseScannerConfig, DriverLicenseScannerView, DriverLicenseScannerViewConfig, EnumDriverLicenseScanSide, EnumResultStatus, ResultStatus, SharedResources, ToolbarButtonConfig, UtilizedTemplateNames };
