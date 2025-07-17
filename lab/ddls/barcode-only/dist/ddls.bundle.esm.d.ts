import { DeskewedImageResultItem, OriginalImageResultItem, DCEFrame, Quadrilateral, CapturedResult, EngineResourcePaths, CaptureVisionRouter, CameraEnhancer, CameraView } from 'dynamsoft-capture-vision-bundle';
export * from 'dynamsoft-capture-vision-bundle';
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
    AAMVAVersionNumber = "aamvaVersionNumber",
    IssuerIdentificationNumber = "issuerIdentificationNumber",
    JurisdictionVersionNumber = "jurisdictionVersionNumber",
    DocumentDiscriminator = "documentDiscriminator",
    IssuingCountry = "issuingCountry",
    ComplianceType = "complianceType",
    FullName = "fullName",
    FirstName = "firstName",
    LastName = "lastName",
    MiddleName = "middleName",
    NamePrefix = "namePrefix",
    NameSuffix = "nameSuffix",
    DateOfBirth = "dateOfBirth",
    Age = "age",
    Sex = "sex",
    NameAlias = "nameAlias",
    FirstNameAlias = "firstNameAlias",
    LastNameAlias = "lastNameAlias",
    MiddleNameAlias = "middleNameAlias",
    PrefixAlias = "prefixAlias",
    SuffixAlias = "suffixAlias",
    AlternativeBirthDate = "alternativeBirthDate",
    AlternativeSocialSecurityNumber = "alternativeSocialSecurityNumber",
    Height = "height",
    HeightInCentimeters = "heightInCentimeters",
    Weight = "weight",
    WeightInKilograms = "weightInKilograms",
    WeightInPounds = "weightInPounds",
    WeightRange = "weightRange",
    EyeColor = "eyeColor",
    HairColor = "hairColor",
    Race = "race",
    Address = "address",
    Street1 = "street1",
    Street2 = "street2",
    City = "city",
    State = "state",
    PostalCode = "postalCode",
    ResidenceStreet1 = "residenceStreet1",
    ResidenceStreet2 = "residenceStreet2",
    ResidenceCity = "residenceCity",
    ResidenceState = "residenceState",
    ResidencePostalCode = "residencePostalCode",
    ExpiryDate = "expiryDate",
    IssueDate = "issueDate",
    IssueTimestamp = "issueTimestamp",
    CardRevisionDate = "cardRevisionDate",
    HazmatEndorsementExpiryDate = "hazmatEndorsementExpiryDate",
    Under18Until = "under18Until",
    Under19Until = "under19Until",
    Under21Until = "under21Until",
    VehicleClass = "vehicleClass",
    StandardVehicleClassification = "standardVehicleClassification",
    VehicleCodeDescription = "vehicleCodeDescription",
    Restrictions = "restrictions",
    RestrictionsCode = "restrictionsCode",
    StandardRestrictionCode = "standardRestrictionCode",
    RestrictionCodeDescription = "restrictionCodeDescription",
    Endorsements = "endorsements",
    EndorsementsCode = "endorsementsCode",
    StandardEndorsementsCode = "standardEndorsementsCode",
    EndorsementsCodeDescription = "endorsementsCodeDescription",
    PermitClassificationCode = "permitClassificationCode",
    PermitIdentifier = "permitIdentifier",
    PermitExpirationDate = "permitExpirationDate",
    PermitIssuedDate = "permitIssuedDate",
    PermitRestrictionCode = "permitRestrictionCode",
    PermitEndorsementCode = "permitEndorsementCode",
    CustomerIdentifier = "customerIdentifier",
    SocialSecurityNumber = "socialSecurityNumber",
    InventoryControlNumber = "inventoryControlNumber",
    NumberOfDuplicates = "numberOfDuplicates",
    MedicalIndicator = "medicalIndicator",
    OrganDonorIndicator = "organDonorIndicator",
    NonResidentIndicator = "nonResidentIndicator",
    VeteranIndicator = "veteranIndicator",
    LimitedDurationDocumentIndicator = "limitedDurationDocumentIndicator",
    FederalCommercialVehicleCodes = "federalCommercialVehicleCodes",
    FamilyNameTruncation = "familyNameTruncation",
    FirstNameTruncation = "firstNameTruncation",
    MiddleNameTruncation = "middleNameTruncation",
    BirthPlace = "birthPlace",
    AuditInformation = "auditInformation",
    JurisdictionSubfiles = "jurisdictionSubfiles",
    Track1 = "track1",
    Track2 = "track2",
    Track3 = "track3",
    LRCforTrack1 = "LRCforTrack1",
    LRCforTrack2 = "LRCforTrack2",
    LRCforTrack3 = "LRCforTrack3",
    ISOIIN = "ISOIIN",
    DLorID_NumberOverflow = "DLorID_NumberOverflow",
    MagStripeVersion = "magStripeVersion",
    DiscretionaryData1 = "discretionaryData1",
    DiscretionaryData2 = "discretionaryData2",
    SecurityFunction = "securityFunction",
    IdNumber = "idNumber",
    IdNumberType = "idNumberType",
    IdIssuedCountry = "idIssuedCountry",
    Surname = "surname",
    Initials = "initials",
    LicenseIssuedCountry = "licenseIssuedCountry",
    LicenseIssueNumber = "licenseIssueNumber",
    LicenseValidityFrom = "licenseValidityFrom",
    LicenseValidityTo = "licenseValidityTo",
    ProfessionalDrivingPermitExpiryDate = "professionalDrivingPermitExpiryDate",
    ProfessionalDrivingPermitCodes = "professionalDrivingPermitCodes",
    VehicleLicense = "vehicleLicense",
    VehicleCode1 = "vehicleCode1",
    VehicleCode2 = "vehicleCode2",
    VehicleCode3 = "vehicleCode3",
    VehicleCode4 = "vehicleCode4",
    VehicleRestriction1 = "vehicleRestriction1",
    VehicleRestriction2 = "vehicleRestriction2",
    VehicleRestriction3 = "vehicleRestriction3",
    VehicleRestriction4 = "vehicleRestriction4",
    LicenseCodeIssuedDate1 = "licenseCodeIssuedDate1",
    LicenseCodeIssuedDate2 = "licenseCodeIssuedDate2",
    LicenseCodeIssuedDate3 = "licenseCodeIssuedDate3",
    LicenseCodeIssuedDate4 = "licenseCodeIssuedDate4"
}
declare enum EnumDriverLicenseType {
    AAMVA_DL_ID = "AAMVA_DL_ID",
    AAMVA_DL_ID_WITH_MAG_STRIPE = "AAMVA_DL_ID_WITH_MAG_STRIPE",
    SOUTH_AFRICA_DL = "SOUTH_AFRICA_DL"
}
interface DriverLicenseDate {
    year?: number;
    month?: number;
    day?: number;
}
interface DriverLicenseData {
    _flowType?: EnumFlowType;
    licenseVerificationStatus?: boolean;
    status: ResultStatus;
    [EnumDriverLicenseData.InvalidFields]?: EnumDriverLicenseData[];
    [EnumDriverLicenseData.LicenseType]?: EnumDriverLicenseType;
    [EnumDriverLicenseData.LicenseNumber]?: string;
    [EnumDriverLicenseData.AAMVAVersionNumber]?: string;
    [EnumDriverLicenseData.IssuerIdentificationNumber]?: string;
    [EnumDriverLicenseData.JurisdictionVersionNumber]?: string;
    [EnumDriverLicenseData.DocumentDiscriminator]?: string;
    [EnumDriverLicenseData.IssuingCountry]?: string;
    [EnumDriverLicenseData.ComplianceType]?: string;
    [EnumDriverLicenseData.FullName]?: string;
    [EnumDriverLicenseData.FirstName]?: string;
    [EnumDriverLicenseData.LastName]?: string;
    [EnumDriverLicenseData.MiddleName]?: string;
    [EnumDriverLicenseData.NamePrefix]?: string;
    [EnumDriverLicenseData.NameSuffix]?: string;
    [EnumDriverLicenseData.DateOfBirth]?: DriverLicenseDate;
    [EnumDriverLicenseData.Age]?: number;
    [EnumDriverLicenseData.Sex]?: string;
    [EnumDriverLicenseData.NameAlias]?: string;
    [EnumDriverLicenseData.FirstNameAlias]?: string;
    [EnumDriverLicenseData.LastNameAlias]?: string;
    [EnumDriverLicenseData.MiddleNameAlias]?: string;
    [EnumDriverLicenseData.PrefixAlias]?: string;
    [EnumDriverLicenseData.SuffixAlias]?: string;
    [EnumDriverLicenseData.AlternativeBirthDate]?: DriverLicenseDate;
    [EnumDriverLicenseData.AlternativeSocialSecurityNumber]?: string;
    [EnumDriverLicenseData.Height]?: string;
    [EnumDriverLicenseData.HeightInCentimeters]?: string;
    [EnumDriverLicenseData.Weight]?: string;
    [EnumDriverLicenseData.WeightInKilograms]?: string;
    [EnumDriverLicenseData.WeightInPounds]?: string;
    [EnumDriverLicenseData.WeightRange]?: string;
    [EnumDriverLicenseData.EyeColor]?: string;
    [EnumDriverLicenseData.HairColor]?: string;
    [EnumDriverLicenseData.Race]?: string;
    [EnumDriverLicenseData.Address]?: string;
    [EnumDriverLicenseData.Street1]?: string;
    [EnumDriverLicenseData.Street2]?: string;
    [EnumDriverLicenseData.City]?: string;
    [EnumDriverLicenseData.State]?: string;
    [EnumDriverLicenseData.PostalCode]?: string;
    [EnumDriverLicenseData.ResidenceStreet1]?: string;
    [EnumDriverLicenseData.ResidenceStreet2]?: string;
    [EnumDriverLicenseData.ResidenceCity]?: string;
    [EnumDriverLicenseData.ResidenceState]?: string;
    [EnumDriverLicenseData.ResidencePostalCode]?: string;
    [EnumDriverLicenseData.ExpiryDate]?: DriverLicenseDate;
    [EnumDriverLicenseData.IssueDate]?: DriverLicenseDate;
    [EnumDriverLicenseData.IssueTimestamp]?: string;
    [EnumDriverLicenseData.CardRevisionDate]?: DriverLicenseDate;
    [EnumDriverLicenseData.HazmatEndorsementExpiryDate]?: DriverLicenseDate;
    [EnumDriverLicenseData.Under18Until]?: DriverLicenseDate;
    [EnumDriverLicenseData.Under19Until]?: DriverLicenseDate;
    [EnumDriverLicenseData.Under21Until]?: DriverLicenseDate;
    [EnumDriverLicenseData.VehicleClass]?: string;
    [EnumDriverLicenseData.StandardVehicleClassification]?: string;
    [EnumDriverLicenseData.VehicleCodeDescription]?: string;
    [EnumDriverLicenseData.Restrictions]?: string;
    [EnumDriverLicenseData.RestrictionsCode]?: string;
    [EnumDriverLicenseData.StandardRestrictionCode]?: string;
    [EnumDriverLicenseData.RestrictionCodeDescription]?: string;
    [EnumDriverLicenseData.Endorsements]?: string;
    [EnumDriverLicenseData.EndorsementsCode]?: string;
    [EnumDriverLicenseData.StandardEndorsementsCode]?: string;
    [EnumDriverLicenseData.EndorsementsCodeDescription]?: string;
    [EnumDriverLicenseData.PermitClassificationCode]?: string;
    [EnumDriverLicenseData.PermitIdentifier]?: string;
    [EnumDriverLicenseData.PermitExpirationDate]?: DriverLicenseDate;
    [EnumDriverLicenseData.PermitIssuedDate]?: DriverLicenseDate;
    [EnumDriverLicenseData.PermitRestrictionCode]?: string;
    [EnumDriverLicenseData.PermitEndorsementCode]?: string;
    [EnumDriverLicenseData.CustomerIdentifier]?: string;
    [EnumDriverLicenseData.SocialSecurityNumber]?: string;
    [EnumDriverLicenseData.InventoryControlNumber]?: string;
    [EnumDriverLicenseData.NumberOfDuplicates]?: string;
    [EnumDriverLicenseData.MedicalIndicator]?: string;
    [EnumDriverLicenseData.OrganDonorIndicator]?: string;
    [EnumDriverLicenseData.NonResidentIndicator]?: string;
    [EnumDriverLicenseData.VeteranIndicator]?: string;
    [EnumDriverLicenseData.LimitedDurationDocumentIndicator]?: string;
    [EnumDriverLicenseData.FederalCommercialVehicleCodes]?: string;
    [EnumDriverLicenseData.FamilyNameTruncation]?: string;
    [EnumDriverLicenseData.FirstNameTruncation]?: string;
    [EnumDriverLicenseData.MiddleNameTruncation]?: string;
    [EnumDriverLicenseData.BirthPlace]?: string;
    [EnumDriverLicenseData.AuditInformation]?: string;
    [EnumDriverLicenseData.JurisdictionSubfiles]?: string;
    [EnumDriverLicenseData.Track1]?: string;
    [EnumDriverLicenseData.Track2]?: string;
    [EnumDriverLicenseData.Track3]?: string;
    [EnumDriverLicenseData.LRCforTrack1]?: string;
    [EnumDriverLicenseData.LRCforTrack2]?: string;
    [EnumDriverLicenseData.LRCforTrack3]?: string;
    [EnumDriverLicenseData.ISOIIN]?: string;
    [EnumDriverLicenseData.DLorID_NumberOverflow]?: string;
    [EnumDriverLicenseData.MagStripeVersion]?: string;
    [EnumDriverLicenseData.DiscretionaryData1]?: string;
    [EnumDriverLicenseData.DiscretionaryData2]?: string;
    [EnumDriverLicenseData.SecurityFunction]?: string;
    [EnumDriverLicenseData.IdNumber]?: string;
    [EnumDriverLicenseData.IdNumberType]?: string;
    [EnumDriverLicenseData.IdIssuedCountry]?: string;
    [EnumDriverLicenseData.Surname]?: string;
    [EnumDriverLicenseData.Initials]?: string;
    [EnumDriverLicenseData.LicenseIssuedCountry]?: string;
    [EnumDriverLicenseData.LicenseIssueNumber]?: string;
    [EnumDriverLicenseData.LicenseValidityFrom]?: DriverLicenseDate;
    [EnumDriverLicenseData.LicenseValidityTo]?: DriverLicenseDate;
    [EnumDriverLicenseData.ProfessionalDrivingPermitExpiryDate]?: DriverLicenseDate;
    [EnumDriverLicenseData.ProfessionalDrivingPermitCodes]?: string;
    [EnumDriverLicenseData.VehicleLicense]?: string;
    [EnumDriverLicenseData.VehicleCode1]?: string;
    [EnumDriverLicenseData.VehicleCode2]?: string;
    [EnumDriverLicenseData.VehicleCode3]?: string;
    [EnumDriverLicenseData.VehicleCode4]?: string;
    [EnumDriverLicenseData.VehicleRestriction1]?: string;
    [EnumDriverLicenseData.VehicleRestriction2]?: string;
    [EnumDriverLicenseData.VehicleRestriction3]?: string;
    [EnumDriverLicenseData.VehicleRestriction4]?: string;
    [EnumDriverLicenseData.LicenseCodeIssuedDate1]?: DriverLicenseDate;
    [EnumDriverLicenseData.LicenseCodeIssuedDate2]?: DriverLicenseDate;
    [EnumDriverLicenseData.LicenseCodeIssuedDate3]?: DriverLicenseDate;
    [EnumDriverLicenseData.LicenseCodeIssuedDate4]?: DriverLicenseDate;
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
    barcodeScanSide?: EnumDriverLicenseScanSide;
    scanOrder?: EnumDriverLicenseScanSide[];
    exitOnBarcodeVerificationFailure?: boolean;
    allowRetryOnVerificationFailure?: boolean;
    barcodeVerificationCallback?: (barcodeData: DriverLicenseData) => Promise<boolean> | boolean;
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
    hintRotateHorizontal?: string;
    hintBlurry?: string;
    hintScanningBarcode?: string;
}
interface VerifyViewText {
    title?: string;
    hintVerify?: string;
    barcodeNotFound?: string;
}
interface ResultViewText {
    title?: string;
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
    private isCapturing;
    private currentScanMode;
    private currentScanSide;
    private boundsDetectionEnabled;
    private smartCaptureEnabled;
    private autoCropEnabled;
    private isSoundFeedbackOn;
    private licenseVerificationCount;
    private capturedResult;
    private originalImageData;
    private initialized;
    private initializedDCE;
    private _isBarcodeOnlyWorkflow;
    private resizeTimer;
    private DCE_ELEMENTS;
    private currentGuideType;
    private DCE_SCANGUIDE_ELEMENTS;
    private currentScanResolver?;
    private loadingScreen;
    private showScannerLoadingOverlay;
    private hideScannerLoadingOverlay;
    private handleResize;
    private toggleSoundFeedback;
    private getText;
    constructor(resources: SharedResources, config: DriverLicenseScannerViewConfig);
    initialize(): Promise<void>;
    /**
     * Process barcode data from image without side effects
     * @param imageData - Image data to process
     * @returns Processed barcode data or null if not found
     */
    private processBarcodeDataFromImage;
    /**
     * Handle barcode verification if enabled
     * @param barcodeData - Barcode data to verify
     * @returns Barcode data with verification status
     */
    private verifyBarcodeData;
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
    closeCamera(options?: {
        hideContainer?: boolean;
        keepLoadingScreen?: boolean;
    }): void;
    pauseCamera(): void;
    stopCapturing(): void;
    private getFlowType;
    takePhoto(): Promise<void>;
    handleBarcodeDetection(result: CapturedResult): Promise<void>;
    handleBoundsDetection(result: CapturedResult): Promise<void>;
    /**
     * Normalize an image with DDN given a set of points
     * @param points - points provided by either users or DDN's detect quad
     * @returns normalized image by DDN
     */
    private handleAutoCaptureMode;
    private showStartingState;
    private handleBlurryLicense;
    private handleInvalidLicenseRatio;
    private handleTooSmallQuad;
    private handleProgressState;
    private calculateVisibleRegionArea;
    private readonly MIN_QUAD_TO_REGION_RATIO;
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
    textConfig: ResultViewText;
    onDone?: (scanResult: DriverLicenseFullResult) => Promise<void>;
    onUpload?: (scanResult: DriverLicenseFullResult) => Promise<void>;
    _workflowConfig: DriverLicenseWorkflowConfig;
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
    private createImagesDisplay;
    private createDriverLicenseDataDisplay;
    private createControls;
    private getText;
    initialize(): Promise<void>;
    hideView(): void;
    dispose(preserveResolver?: boolean): void;
}

interface DriverLicenseVerifyViewToolbarButtonsConfig {
    retake?: ToolbarButtonConfig;
    done?: ToolbarButtonConfig;
}
interface DriverLicenseVerifyViewConfig {
    container?: HTMLElement | string;
    textConfig?: Record<EnumDriverLicenseScanSide, VerifyViewText>;
    toolbarButtonsConfig?: DriverLicenseVerifyViewToolbarButtonsConfig;
    onDone?: (scanResult: DriverLicenseImageResult) => Promise<void>;
    onUpload?: (scanResult: DriverLicenseImageResult) => Promise<void>;
    _workflowConfig?: DriverLicenseWorkflowConfig;
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
    private isLicenseValid;
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
    private resources;
    private isInitialized;
    private isCapturing;
    private isDynamsoftResourcesLoaded;
    protected isFileMode: boolean;
    private currentScanStep;
    private scanSequence;
    private _isBarcodeOnlyWorkflow;
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
    private createErrorResult;
    launch(): Promise<DriverLicenseFullResult>;
    private createCancelledResult;
    private executeCurrentScanStep;
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
