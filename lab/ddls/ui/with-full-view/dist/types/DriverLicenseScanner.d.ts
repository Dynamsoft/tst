import { EngineResourcePaths, CaptureVisionRouter, CameraEnhancer, CameraView } from "dynamsoft-capture-vision-bundle";
import DriverLicenseCorrectionView, { DriverLicenseCorrectionViewConfig } from "./views/DriverLicenseCorrectionView";
import DriverLicenseScannerView, { DriverLicenseScannerViewConfig } from "./views/DriverLicenseScannerView";
import DriverLicenseResultView, { DriverLicenseResultViewConfig } from "./views/DriverLicenseResultView";
import { DriverLicenseWorkflowConfig, UtilizedTemplateNames } from "./utils/types";
import { DriverLicenseFullResult } from "./utils/DriverLicenseParser";
import DriverLicenseVerifyView, { DriverLicenseVerifyViewConfig } from "./views/DriverLicenseVerifyView";
export interface DriverLicenseScannerConfig {
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
export interface SharedResources {
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
export default DriverLicenseScanner;
//# sourceMappingURL=DriverLicenseScanner.d.ts.map