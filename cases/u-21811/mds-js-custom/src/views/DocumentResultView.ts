import { SharedResources } from "../DocumentScanner";
import DocumentScannerView from "./DocumentScannerView";
import { DeskewedImageResultItem, DSImageData, EnumImagePixelFormat } from "dynamsoft-capture-vision-bundle";
import { createControls, createStyle, getElement, shouldCorrectImage } from "./utils";
import DocumentCorrectionView from "./DocumentCorrectionView";
import { DDS_ICONS } from "./utils/icons";
import { DocumentResult, EnumFlowType, EnumResultStatus, ToolbarButton, ToolbarButtonConfig } from "./utils/types";
import {
  ImageFilterHandler,
  BlackwhiteFilter,
  InvertFilter,
  GrayscaleFilter,
  SepiaFilter,
  GaussianBlurFilter,
} from "image-filter-js";

export interface DocumentResultViewToolbarButtonsConfig {
  retake?: ToolbarButtonConfig;
  correct?: ToolbarButtonConfig;
  rotate?: ToolbarButtonConfig;
  filter?: ToolbarButtonConfig; // Add filter button config
  share?: ToolbarButtonConfig;
  upload?: ToolbarButtonConfig;
  done?: ToolbarButtonConfig;
}

export interface DocumentResultViewConfig {
  container?: HTMLElement | string;
  toolbarButtonsConfig?: DocumentResultViewToolbarButtonsConfig;

  onDone?: (result: DocumentResult) => Promise<void>;
  onUpload?: (result: DocumentResult) => Promise<void>;
}

// Filter types enum
enum FilterType {
  NONE = "none",
  GRAYSCALE = "grayscale",
  BLACKWHITE = "blackwhite",
  BLACKWHITE_ADAPTIVE = "blackwhite_adaptive", // Adaptive thresholding
  SEPIA = "sepia",
  INVERT = "invert",
  GAUSSIAN_BLUR = "gaussian_blur",
  GAUSSIAN_BLUR_HEAVY = "gaussian_blur_heavy", // Stronger blur
}

// Filter configuration interface
interface FilterConfig {
  blackwhite?: {
    threshold?: number;
    enableOTSU?: boolean;
    enableAdaptiveThresholding?: boolean;
    blockSize?: number;
    constantC?: number;
  };
  gaussianBlur?: {
    radius?: number;
  };
}

export default class DocumentResultView {
  private currentScanResultViewResolver?: (result: DocumentResult) => void;
  private rotationDegree: number = 0;
  private currentImageCanvas?: HTMLCanvasElement;
  private appliedFilter: FilterType = FilterType.NONE; // Track applied filter
  private originalCanvas?: HTMLCanvasElement; // Store original canvas for filter reset
  private filterModalOpen: boolean = false;

  constructor(
    private resources: SharedResources,
    private config: DocumentResultViewConfig,
    private scannerView: DocumentScannerView,
    private correctionView: DocumentCorrectionView
  ) {}

  async launch(): Promise<DocumentResult> {
    try {
      getElement(this.config.container).textContent = "";
      await this.initialize();
      getElement(this.config.container).style.display = "flex";

      // Return promise that resolves when user clicks done
      return new Promise((resolve) => {
        this.currentScanResultViewResolver = resolve;
      });
    } catch (ex: any) {
      let errMsg = ex?.message || ex;
      console.error(errMsg);
      throw errMsg;
    }
  }

  private async handleUploadAndShareBtn(mode?: "share" | "upload") {
    try {
      const { result } = this.resources;
      if (!result?.correctedImageResult) {
        throw new Error("No image to upload");
      }

      if (mode === "upload" && this.config?.onUpload) {
        await this.config.onUpload(result);
      } else if (mode === "share") {
        await this.handleShare();
      }
    } catch (error) {
      console.error("Error on upload/share:", error);
      alert("Failed");
    }
  }

  private async handleShare() {
    try {
      const { result } = this.resources;

      // Validate input
      if (!result?.correctedImageResult) {
        throw new Error("No image result provided");
      }

      // Use processed canvas if available (with rotation/filter), otherwise use original
      let blob: Blob;
      if (this.currentImageCanvas && (this.rotationDegree !== 0 || this.appliedFilter !== FilterType.NONE)) {
        // Convert processed canvas to blob
        blob = await new Promise<Blob>((resolve, reject) => {
          this.currentImageCanvas!.toBlob((b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to convert processed canvas to blob"));
          }, "image/png");
        });
      } else {
        // Use original image
        blob = await (result.correctedImageResult as DeskewedImageResultItem).toBlob("image/png");
      }
      if (!blob) {
        throw new Error("Failed to convert image to blob");
      }

      const file = new File([blob], `document-${Date.now()}.png`, {
        type: blob.type,
      });

      // Try Web Share API first
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Dynamsoft Document Scanner Shared Image",
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      return true;
    } catch (ex: any) {
      if (ex.name !== "AbortError") {
        let errMsg = ex?.message || ex;
        console.error("Error sharing image:", errMsg);
        alert(`Error sharing image: ${errMsg}`);
      }
    }
  }

  private async handleRotateImage() {
    try {
      if (!this.resources.result?.correctedImageResult) {
        throw new Error("No image to rotate");
      }

      // Increment rotation by 90 degrees
      this.rotationDegree = (this.rotationDegree + 90) % 360;

      // Get the base canvas (either original or filtered)
      let baseCanvas =
        this.originalCanvas || (this.resources.result.correctedImageResult as DeskewedImageResultItem).toCanvas();

      // Apply filter first if one is selected
      if (this.appliedFilter !== FilterType.NONE) {
        baseCanvas = await this.applyFilterToCanvas(baseCanvas, this.appliedFilter);
      }

      // Create a new canvas for the rotated image
      const rotatedCanvas = document.createElement("canvas");
      const ctx = rotatedCanvas.getContext("2d");

      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      // Calculate new dimensions based on rotation
      const { width: originalWidth, height: originalHeight } = baseCanvas;
      const isRotated90or270 = this.rotationDegree === 90 || this.rotationDegree === 270;

      rotatedCanvas.width = isRotated90or270 ? originalHeight : originalWidth;
      rotatedCanvas.height = isRotated90or270 ? originalWidth : originalHeight;

      // Set up the transformation
      const centerX = rotatedCanvas.width / 2;
      const centerY = rotatedCanvas.height / 2;

      ctx.translate(centerX, centerY);
      ctx.rotate((this.rotationDegree * Math.PI) / 180);
      ctx.drawImage(baseCanvas, -originalWidth / 2, -originalHeight / 2);

      this.currentImageCanvas = rotatedCanvas;
      this.updateDisplayedImage(rotatedCanvas);
    } catch (error) {
      console.error("Error rotating image:", error);
      alert(`Error rotating image: ${error?.message || error}`);
    }
  }

  private async handleFilterImage() {
    try {
      if (this.filterModalOpen) return;
      this.showFilterModal();
    } catch (error) {
      console.error("Error opening filter modal:", error);
    }
  }

  private showFilterModal() {
    this.filterModalOpen = true;

    // Create modal overlay
    const modal = document.createElement("div");
    modal.className = "dds-filter-modal";
    modal.innerHTML = `
      <div class="dds-filter-modal-content">
        <div class="dds-filter-modal-header">
          <h3>Apply Filter</h3>
          <button class="dds-filter-close">&times;</button>
        </div>
        <div class="dds-filter-options">
          <button class="dds-filter-option ${this.appliedFilter === FilterType.NONE ? "active" : ""}" data-filter="${
      FilterType.NONE
    }">Original</button>
          <button class="dds-filter-option ${
            this.appliedFilter === FilterType.GRAYSCALE ? "active" : ""
          }" data-filter="${FilterType.GRAYSCALE}">Grayscale</button>
          <button class="dds-filter-option ${
            this.appliedFilter === FilterType.BLACKWHITE ? "active" : ""
          }" data-filter="${FilterType.BLACKWHITE}">B&W Auto</button>
          <button class="dds-filter-option ${
            this.appliedFilter === FilterType.BLACKWHITE_ADAPTIVE ? "active" : ""
          }" data-filter="${FilterType.BLACKWHITE_ADAPTIVE}">B&W Adaptive</button>
          <button class="dds-filter-option ${this.appliedFilter === FilterType.SEPIA ? "active" : ""}" data-filter="${
      FilterType.SEPIA
    }">Sepia</button>
          <button class="dds-filter-option ${this.appliedFilter === FilterType.INVERT ? "active" : ""}" data-filter="${
      FilterType.INVERT
    }">Invert</button>
          <button class="dds-filter-option ${
            this.appliedFilter === FilterType.GAUSSIAN_BLUR ? "active" : ""
          }" data-filter="${FilterType.GAUSSIAN_BLUR}">Blur</button>
          <button class="dds-filter-option ${
            this.appliedFilter === FilterType.GAUSSIAN_BLUR_HEAVY ? "active" : ""
          }" data-filter="${FilterType.GAUSSIAN_BLUR_HEAVY}">Heavy Blur</button>
        </div>
        <div class="dds-filter-actions">
          <button class="dds-filter-cancel">Cancel</button>
          <button class="dds-filter-apply">Apply</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Handle filter option clicks
    let selectedFilter = this.appliedFilter;
    modal.querySelectorAll(".dds-filter-option").forEach((button) => {
      button.addEventListener("click", (e) => {
        modal.querySelectorAll(".dds-filter-option").forEach((btn) => btn.classList.remove("active"));
        (e.target as HTMLElement).classList.add("active");
        selectedFilter = (e.target as HTMLElement).dataset.filter as FilterType;
      });
    });

    // Handle close button
    modal.querySelector(".dds-filter-close")?.addEventListener("click", () => {
      this.closeFilterModal(modal);
    });

    // Handle cancel button
    modal.querySelector(".dds-filter-cancel")?.addEventListener("click", () => {
      this.closeFilterModal(modal);
    });

    // Handle apply button
    modal.querySelector(".dds-filter-apply")?.addEventListener("click", async () => {
      await this.applyFilter(selectedFilter);
      this.closeFilterModal(modal);
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeFilterModal(modal);
      }
    });
  }

  private closeFilterModal(modal: HTMLElement) {
    this.filterModalOpen = false;
    document.body.removeChild(modal);
  }

  private async applyFilter(filterType: FilterType) {
    try {
      if (!this.originalCanvas) {
        this.originalCanvas = (this.resources.result.correctedImageResult as DeskewedImageResultItem).toCanvas();
      }

      this.appliedFilter = filterType;

      let processedCanvas: HTMLCanvasElement;

      if (filterType === FilterType.NONE) {
        processedCanvas = this.originalCanvas;
      } else {
        processedCanvas = await this.applyFilterToCanvas(this.originalCanvas, filterType);
      }

      // Apply rotation if any
      if (this.rotationDegree !== 0) {
        processedCanvas = await this.rotateCanvas(processedCanvas, this.rotationDegree);
      }

      this.currentImageCanvas = processedCanvas;
      this.updateDisplayedImage(processedCanvas);
    } catch (error) {
      console.error("Error applying filter:", error);
      alert(`Error applying filter: ${error?.message || error}`);
    }
  }

  private async applyFilterToCanvas(canvas: HTMLCanvasElement, filterType: FilterType): Promise<HTMLCanvasElement> {
    const filteredCanvas = document.createElement("canvas");
    filteredCanvas.width = canvas.width;
    filteredCanvas.height = canvas.height;

    try {
      // Use image-filter-js library for better quality filters
      switch (filterType) {
        case FilterType.GRAYSCALE:
          const grayscaleFilter = new GrayscaleFilter(filteredCanvas);
          grayscaleFilter.process(canvas);
          break;

        case FilterType.BLACKWHITE:
          // Standard black & white with OTSU auto-thresholding
          const blackwhiteFilter = new BlackwhiteFilter(filteredCanvas, 128, true, false, 11, 2);
          blackwhiteFilter.process(canvas);
          break;

        case FilterType.BLACKWHITE_ADAPTIVE:
          // Adaptive black & white thresholding
          const adaptiveFilter = new BlackwhiteFilter(filteredCanvas, 128, false, true, 11, 2);
          adaptiveFilter.process(canvas);
          break;

        case FilterType.SEPIA:
          const sepiaFilter = new SepiaFilter(filteredCanvas);
          sepiaFilter.process(canvas);
          break;

        case FilterType.INVERT:
          const invertFilter = new InvertFilter(filteredCanvas);
          invertFilter.process(canvas);
          break;

        case FilterType.GAUSSIAN_BLUR:
          const gaussianBlurFilter = new GaussianBlurFilter(filteredCanvas, 2); // radius = 2
          gaussianBlurFilter.process(canvas);
          break;

        case FilterType.GAUSSIAN_BLUR_HEAVY:
          const heavyBlurFilter = new GaussianBlurFilter(filteredCanvas, 5); // radius = 5
          heavyBlurFilter.process(canvas);
          break;

        default:
          // For 'none' or unknown filters, just copy the original
          const ctx = filteredCanvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(canvas, 0, 0);
          }
      }
    } catch (error) {
      console.warn("Filter library not available, falling back to CSS filters:", error);
      // Fallback to CSS filters if library is not available
      return this.applyCSSSFilters(canvas, filterType);
    }

    return filteredCanvas;
  }

  private async applyCSSSFilters(canvas: HTMLCanvasElement, filterType: FilterType): Promise<HTMLCanvasElement> {
    const filteredCanvas = document.createElement("canvas");
    filteredCanvas.width = canvas.width;
    filteredCanvas.height = canvas.height;
    const ctx = filteredCanvas.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    // Apply CSS filters as fallback
    switch (filterType) {
      case FilterType.GRAYSCALE:
        ctx.filter = "grayscale(100%)";
        break;
      case FilterType.BLACKWHITE:
        ctx.filter = "grayscale(100%) contrast(200%) brightness(150%)";
        break;
      case FilterType.SEPIA:
        ctx.filter = "sepia(100%)";
        break;
      case FilterType.INVERT:
        ctx.filter = "invert(100%)";
        break;
      case FilterType.GAUSSIAN_BLUR:
        ctx.filter = "blur(2px)";
        break;
      default:
        ctx.filter = "none";
    }

    ctx.drawImage(canvas, 0, 0);
    ctx.filter = "none"; // Reset filter

    return filteredCanvas;
  }

  private async rotateCanvas(canvas: HTMLCanvasElement, degrees: number): Promise<HTMLCanvasElement> {
    const rotatedCanvas = document.createElement("canvas");
    const ctx = rotatedCanvas.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    const { width: originalWidth, height: originalHeight } = canvas;
    const isRotated90or270 = degrees === 90 || degrees === 270;

    rotatedCanvas.width = isRotated90or270 ? originalHeight : originalWidth;
    rotatedCanvas.height = isRotated90or270 ? originalWidth : originalHeight;

    const centerX = rotatedCanvas.width / 2;
    const centerY = rotatedCanvas.height / 2;

    ctx.translate(centerX, centerY);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(canvas, -originalWidth / 2, -originalHeight / 2);

    return rotatedCanvas;
  }

  private updateDisplayedImage(canvas: HTMLCanvasElement) {
    const imageContainer = document.querySelector(".dds-result-view-container > div:first-child");
    if (imageContainer) {
      imageContainer.innerHTML = "";
      Object.assign(canvas.style, {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
      });
      imageContainer.appendChild(canvas);
    }
  }

  private async handleCorrectImage() {
    try {
      if (!this.correctionView) {
        console.error("Correction View not initialized");
        return;
      }

      this.hideView();
      const result = await this.correctionView.launch();

      if (result.correctedImageResult) {
        if (this.resources.onResultUpdated) {
          this.resources.onResultUpdated({
            ...this.resources.result,
            correctedImageResult: result.correctedImageResult,
          });
        }

        // Reset rotation and filter when image is corrected
        this.rotationDegree = 0;
        this.appliedFilter = FilterType.NONE;
        this.currentImageCanvas = undefined;
        this.originalCanvas = undefined;

        this.dispose(true);
        await this.initialize();
        getElement(this.config.container).style.display = "flex";
      }
    } catch (error) {
      console.error("DocumentResultView - Handle Correction View Error:", error);
      if (this.currentScanResultViewResolver) {
        this.currentScanResultViewResolver({
          status: {
            code: EnumResultStatus.RS_FAILED,
            message: error?.message || error,
          },
        });
      }
      throw error;
    }
  }

  private async handleRetake() {
    try {
      if (!this.scannerView) {
        console.error("Scanner View not initialized");
        return;
      }

      this.hideView();
      const result = await this.scannerView.launch();

      if (result?.status?.code === EnumResultStatus.RS_FAILED) {
        if (this.currentScanResultViewResolver) {
          this.currentScanResultViewResolver(result);
        }
        return;
      }

      if (this.resources.onResultUpdated) {
        if (result?.status.code === EnumResultStatus.RS_CANCELLED) {
          this.resources.onResultUpdated(this.resources.result);
        } else if (result?.status.code === EnumResultStatus.RS_SUCCESS) {
          this.resources.onResultUpdated(result);
        }
      }

      if (this.correctionView && result?._flowType) {
        if (shouldCorrectImage(result?._flowType)) {
          await this.handleCorrectImage();
        }
      }

      // Reset rotation and filter when retaking
      this.rotationDegree = 0;
      this.appliedFilter = FilterType.NONE;
      this.currentImageCanvas = undefined;
      this.originalCanvas = undefined;

      this.dispose(true);
      await this.initialize();
      getElement(this.config.container).style.display = "flex";
    } catch (error) {
      console.error("Error in retake handler:", error);
      if (this.currentScanResultViewResolver) {
        this.currentScanResultViewResolver({
          status: {
            code: EnumResultStatus.RS_FAILED,
            message: error?.message || error,
          },
        });
      }
      throw error;
    }
  }

  private canvasToNormalizedImageResultItem(
    canvas: HTMLCanvasElement,
    originalResult: DeskewedImageResultItem
  ): DeskewedImageResultItem {
    // Get image data from canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Create DSImageData from canvas
    const dsImageData: DSImageData = {
      bytes: new Uint8Array(imageData.data.buffer),
      width: canvas.width,
      height: canvas.height,
      stride: canvas.width * 4, // 4 bytes per pixel for RGBA
      format: EnumImagePixelFormat.IPF_ABGR_8888, // Adjust based on your enum values
      tag: originalResult.imageData?.tag,
    };

    // Create the new NormalizedImageResultItem
    const newResult: DeskewedImageResultItem = {
      // Copy properties from original result
      ...originalResult,

      // Update with new image data
      imageData: dsImageData,

      // Keep original source location
      sourceLocation: originalResult.sourceLocation,

      // Implement required methods
      toCanvas: (): HTMLCanvasElement => {
        return canvas;
      },

      toImage: (MIMEType: "image/png" | "image/jpeg" = "image/png"): HTMLImageElement => {
        const img = new Image();
        img.src = canvas.toDataURL(MIMEType);
        return img;
      },

      toBlob: (MIMEType: "image/png" | "image/jpeg" = "image/png"): Promise<Blob> => {
        return new Promise((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              throw new Error("Failed to convert canvas to blob");
            }
          }, MIMEType);
        });
      },
    };

    return newResult;
  }

  private async handleDone() {
    try {
      let resultToPass = this.resources.result;

      // If we have a processed canvas (rotated or filtered), convert it to NormalizedImageResultItem
      if (this.currentImageCanvas && (this.rotationDegree !== 0 || this.appliedFilter !== FilterType.NONE)) {
        const processedResult = this.canvasToNormalizedImageResultItem(
          this.currentImageCanvas,
          this.resources.result.correctedImageResult as DeskewedImageResultItem
        );

        resultToPass = {
          ...this.resources.result,
          correctedImageResult: processedResult,
        };
      }

      if (this.config?.onDone) {
        await this.config.onDone(resultToPass);
      }

      if (this.currentScanResultViewResolver && resultToPass) {
        this.currentScanResultViewResolver(resultToPass);
      }

      this.hideView();
      this.dispose();
    } catch (error) {
      console.error("Error in done handler:", error);
      if (this.currentScanResultViewResolver) {
        this.currentScanResultViewResolver({
          status: {
            code: EnumResultStatus.RS_FAILED,
            message: error?.message || error,
          },
        });
      }
      throw error;
    }
  }

  private createControls(): HTMLElement {
    const { toolbarButtonsConfig, onUpload } = this.config;

    const testImageBlob = new Blob(["mock-png-data"], { type: "image/png" });
    const testFile = new File([testImageBlob], "test.png", { type: "image/png" });
    const canShare = "share" in navigator && navigator.canShare({ files: [testFile] });

    const buttons: ToolbarButton[] = [
      {
        id: `dds-scanResult-retake`,
        icon: toolbarButtonsConfig?.retake?.icon || DDS_ICONS.retake,
        label: toolbarButtonsConfig?.retake?.label || "Re-take",
        onClick: () => this.handleRetake(),
        className: `${toolbarButtonsConfig?.retake?.className || ""}`,
        isHidden: toolbarButtonsConfig?.retake?.isHidden || false,
        isDisabled: !this.scannerView,
      },
      {
        id: `dds-scanResult-correct`,
        icon: toolbarButtonsConfig?.correct?.icon || DDS_ICONS.normalize,
        label: toolbarButtonsConfig?.correct?.label || "Correction",
        onClick: () => this.handleCorrectImage(),
        className: `${toolbarButtonsConfig?.correct?.className || ""}`,
        isHidden: toolbarButtonsConfig?.correct?.isHidden || false,
        isDisabled: !this.correctionView,
      },
      {
        id: `dds-scanResult-rotate`,
        icon: toolbarButtonsConfig?.rotate?.icon || DDS_ICONS.rotate,
        label: toolbarButtonsConfig?.rotate?.label || "Rotate",
        onClick: () => this.handleRotateImage(),
        className: `${toolbarButtonsConfig?.rotate?.className || ""}`,
        isHidden: toolbarButtonsConfig?.rotate?.isHidden || false,
        isDisabled: false,
      },
      {
        id: `dds-scanResult-filter`,
        icon: toolbarButtonsConfig?.filter?.icon || DDS_ICONS.filter,
        label: toolbarButtonsConfig?.filter?.label || "Filter",
        onClick: () => this.handleFilterImage(),
        className: `${toolbarButtonsConfig?.filter?.className || ""}`,
        isHidden: toolbarButtonsConfig?.filter?.isHidden || false,
        isDisabled: false,
      },
      {
        id: `dds-scanResult-share`,
        icon: toolbarButtonsConfig?.share?.icon || (canShare ? DDS_ICONS.share : DDS_ICONS.downloadPNG),
        label: toolbarButtonsConfig?.share?.label || (canShare ? "Share" : "Download"),
        className: `${toolbarButtonsConfig?.share?.className || ""}`,
        isHidden: toolbarButtonsConfig?.share?.isHidden || false,
        onClick: () => this.handleUploadAndShareBtn("share"),
      },
      {
        id: `dds-scanResult-upload`,
        icon: toolbarButtonsConfig?.upload?.icon || DDS_ICONS.upload,
        label: toolbarButtonsConfig?.upload?.label || "Upload",
        className: `${toolbarButtonsConfig?.upload?.className || ""}`,
        isHidden: !onUpload ? true : toolbarButtonsConfig?.upload?.isHidden || false,
        isDisabled: !onUpload,
        onClick: () => this.handleUploadAndShareBtn("upload"),
      },
      {
        id: `dds-scanResult-done`,
        icon: toolbarButtonsConfig?.done?.icon || DDS_ICONS.complete,
        label: toolbarButtonsConfig?.done?.label || "Done",
        className: `${toolbarButtonsConfig?.done?.className || ""}`,
        isHidden: toolbarButtonsConfig?.done?.isHidden || false,
        onClick: () => this.handleDone(),
      },
    ];

    return createControls(buttons);
  }

  async initialize(): Promise<void> {
    try {
      if (!this.resources.result) {
        throw Error("Captured image is missing. Please capture an image first!");
      }

      if (!this.config.container) {
        throw new Error("Please create a Scan Result View Container element");
      }

      createStyle("dds-result-view-style", DEFAULT_RESULT_VIEW_CSS);

      const resultViewWrapper = document.createElement("div");
      resultViewWrapper.className = "dds-result-view-container";

      const scanResultViewImageContainer = document.createElement("div");
      Object.assign(scanResultViewImageContainer.style, {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "0",
      });

      // Add scan result image
      const scanResultImg = (this.resources.result.correctedImageResult as DeskewedImageResultItem)?.toCanvas();
      Object.assign(scanResultImg.style, {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
      });

      // Store the original canvas for filtering and rotation
      this.originalCanvas = scanResultImg;
      this.currentImageCanvas = scanResultImg;

      scanResultViewImageContainer.appendChild(scanResultImg);
      resultViewWrapper.appendChild(scanResultViewImageContainer);

      const controlContainer = this.createControls();
      resultViewWrapper.appendChild(controlContainer);

      getElement(this.config.container).appendChild(resultViewWrapper);

      if (this.resources.result._flowType === EnumFlowType.STATIC_FILE) {
        const retakeBtn = document.querySelector("#dds-scanResult-retake") as HTMLElement;
        retakeBtn.style.display = "none";
      }
    } catch (ex: any) {
      let errMsg = ex?.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }

  hideView(): void {
    getElement(this.config.container).style.display = "none";
  }

  dispose(preserveResolver: boolean = false): void {
    getElement(this.config.container).textContent = "";

    // Reset all state
    this.rotationDegree = 0;
    this.appliedFilter = FilterType.NONE;
    this.currentImageCanvas = undefined;
    this.originalCanvas = undefined;
    this.filterModalOpen = false;

    if (!preserveResolver) {
      this.currentScanResultViewResolver = undefined;
    }
  }

  /**
   * Utility method to save a blob as a file with download
   */
  private async saveBlob(blob: Blob, filename: string, download: boolean = true): Promise<File> {
    const file = new File([blob], filename, { type: blob.type });

    if (download) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    return file;
  }
}

const DEFAULT_RESULT_VIEW_CSS = `
  .dds-result-view-container {
    display: flex;
    width: 100%;
    height: 100%;
    background-color:#575757;
    font-size: 12px;
    flex-direction: column;
    align-items: center;
  }

  @media (orientation: landscape) and (max-width: 1024px) {
    .dds-result-view-container {
      flex-direction: row;
    }
  }

  .dds-filter-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    font-family: Verdana;
  }

  .dds-filter-modal-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .dds-filter-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  .dds-filter-modal-header h3 {
    margin: 0;
    color: #333;
  }

  .dds-filter-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
  }

  .dds-filter-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }

  .dds-filter-option {
    padding: 12px;
    border: 2px solid #ddd;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .dds-filter-option:hover {
    border-color: #007bff;
  }

  .dds-filter-option.active {
    border-color: #007bff;
    background: #007bff;
    color: white;
  }

  .dds-filter-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  .dds-filter-cancel,
  .dds-filter-apply {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  .dds-filter-cancel {
    background: #f8f9fa;
    color: #333;
  }

  .dds-filter-apply {
    background: #007bff;
    color: white;
  }

  .dds-filter-cancel:hover {
    background: #e9ecef;
  }

  .dds-filter-apply:hover {
    background: #0056b3;
  }
`;
