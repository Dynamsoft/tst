import { Quadrilateral, OriginalImageResultItem } from "dynamsoft-capture-vision-bundle";
import { EnumFlowType, ToolbarButton } from "./types";
export declare function getElement(element: string | HTMLElement): HTMLElement | null;
export declare function createControls(buttons: ToolbarButton[], containerStyle?: Partial<CSSStyleDeclaration>): HTMLElement;
export declare function shouldCorrectImage(flow: EnumFlowType): boolean;
export declare function createStyle(id: string, style: string): void;
export declare function isSVGString(str: string): boolean;
export declare const isEmptyObject: (obj: object | null | undefined) => boolean;
export declare const STANDARD_RESOLUTIONS: {
    readonly "4k": {
        readonly width: 3840;
        readonly height: 2160;
    };
    readonly "2k": {
        readonly width: 2560;
        readonly height: 1440;
    };
    readonly "1080p": {
        readonly width: 1920;
        readonly height: 1080;
    };
    readonly "720p": {
        readonly width: 1280;
        readonly height: 720;
    };
    readonly "480p": {
        readonly width: 640;
        readonly height: 480;
    };
};
type ResolutionLevel = keyof typeof STANDARD_RESOLUTIONS;
export declare function findClosestResolutionLevel(selectedResolution: {
    width: number;
    height: number;
}): ResolutionLevel;
export declare function convertToScanRegionCoordinates(points: Quadrilateral["points"], region: {
    width: number;
    height: number;
}, video: {
    width: number;
    height: number;
}): {
    x: number;
    y: number;
}[];
export declare const addPaddingToPoints: (points: Quadrilateral["points"], originalImageData: OriginalImageResultItem["imageData"], padding?: number) => Quadrilateral["points"];
export declare function areQuadsSimilar(quadA: Quadrilateral["points"], quadB: Quadrilateral["points"], tolerance?: number): boolean;
export {};
//# sourceMappingURL=index.d.ts.map