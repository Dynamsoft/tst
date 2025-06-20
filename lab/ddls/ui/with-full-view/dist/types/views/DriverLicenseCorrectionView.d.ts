import { DeskewedImageResultItem, Quadrilateral } from "dynamsoft-capture-vision-bundle";
import { SharedResources } from "../DriverLicenseScanner";
import { ToolbarButtonConfig, UtilizedTemplateNames } from "../utils/types";
import { DriverLicenseImageResult } from "../utils/DriverLicenseParser";
export interface DriverLicenseCorrectionViewToolbarButtonsConfig {
    fullImage?: ToolbarButtonConfig;
    detectBorders?: ToolbarButtonConfig;
    apply?: ToolbarButtonConfig;
}
export interface DriverLicenseCorrectionViewConfig {
    container?: HTMLElement | string;
    toolbarButtonsConfig?: DriverLicenseCorrectionViewToolbarButtonsConfig;
    templateFilePath?: string;
    utilizedTemplateNames?: UtilizedTemplateNames;
    onFinish?: (result: DriverLicenseImageResult) => void;
    _showResultView?: boolean;
}
export default class DriverLicenseCorrectionView {
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
//# sourceMappingURL=DriverLicenseCorrectionView.d.ts.map