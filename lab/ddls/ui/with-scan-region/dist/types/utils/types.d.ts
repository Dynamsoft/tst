import { EnumDriverLicenseScanMode, EnumDriverLicenseScanSide } from "./DriverLicenseParser";
export interface UtilizedTemplateNames {
    detect: string;
    normalize: string;
    barcode: string;
}
export declare enum EnumResultStatus {
    RS_SUCCESS = 0,
    RS_CANCELLED = 1,
    RS_FAILED = 2
}
export type ResultStatus = {
    code: EnumResultStatus;
    message?: string;
};
export declare enum EnumFlowType {
    MANUAL = "manual",
    SMART_CAPTURE = "smartCapture",
    AUTO_CROP = "autoCrop",
    UPLOADED_IMAGE = "uploadedImage",
    STATIC_FILE = "staticFile"
}
export type ToolbarButtonConfig = Pick<ToolbarButton, "icon" | "label" | "className" | "isHidden">;
export interface ToolbarButton {
    id: string;
    icon: string;
    label: string;
    onClick?: () => void | Promise<void>;
    className?: string;
    isDisabled?: boolean;
    isHidden?: boolean;
}
export interface DriverLicenseScanStep {
    side?: EnumDriverLicenseScanSide;
    mode: EnumDriverLicenseScanMode;
}
export interface DriverLicenseWorkflowConfig {
    captureFrontImage?: boolean;
    captureBackImage?: boolean;
    readBarcode?: boolean;
    scanOrder?: EnumDriverLicenseScanSide[];
}
//# sourceMappingURL=types.d.ts.map