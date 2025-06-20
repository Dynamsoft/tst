import { Quadrilateral, DeskewedImageResultItem, ParsedResultItem, OriginalImageResultItem, DCEFrame } from "dynamsoft-capture-vision-bundle";
import { EnumFlowType, ResultStatus } from "./types";
export declare const DRIVER_LICENSE_CARD_RATIO = 1.588;
export declare enum EnumDriverLicenseScanMode {
    Image = "image",
    Barcode = "barcode"
}
export declare enum EnumDriverLicenseScanSide {
    Front = "frontSide",
    Back = "backSide"
}
export declare const DriverLicenseScanSideTitle: Record<EnumDriverLicenseScanSide, string>;
export declare enum EnumDriverLicenseScannerViews {
    Scanner = "scanner",
    Result = "scan-result",
    Correction = "correction"
}
export declare const DEFAULT_TEMPLATE_NAMES: {
    detect: string;
    normalize: string;
    barcode: string;
};
export declare enum EnumDriverLicenseData {
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
export declare enum EnumDriverLicenseType {
    AAMVA_DL_ID = "AAMVA_DL_ID",
    AAMVA_DL_ID_WITH_MAG_STRIPE = "AAMVA_DL_ID_WITH_MAG_STRIPE",
    SOUTH_AFRICA_DL = "SOUTH_AFRICA_DL"
}
export interface DriverLicenseDate {
    year: number;
    month: number;
    day: number;
}
export interface DriverLicenseData {
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
export declare const DriverLicenseDataLabel: Record<EnumDriverLicenseData, string>;
export interface DriverLicenseImageResult {
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
export interface DriverLicenseFullResult {
    [EnumDriverLicenseScanSide.Front]: DriverLicenseImageResult;
    [EnumDriverLicenseScanSide.Back]: DriverLicenseImageResult;
    licenseData?: DriverLicenseData;
}
export declare function displayDriverLicenseDate(date: DriverLicenseDate): string;
export declare function processDriverLicenseData(rawData: Record<string, any>, parsedResult?: ParsedResultItem): DriverLicenseData | null;
/**
 * Determines if a rectangle defined by points is close to a driver's license ratio
 * @param {Array} points - Array of 4 points with x,y coordinates representing corners of rectangle
 * @param {number} [tolerance=0.1] - Acceptable deviation from the standard ratio (0.1 = 10%)
 * @returns {boolean} Returns true if is within DL ratio, false otherwise
 */
export declare function isWithinLicenseRatio(points: Quadrilateral["points"], tolerance?: number): boolean;
//# sourceMappingURL=DriverLicenseParser.d.ts.map