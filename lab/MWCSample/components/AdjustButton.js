import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";

const DDV = Dynamsoft.DDV;
const adjustButtonUiConfig = {
    type: DDV.Elements.Button,
    id: elementIds.adjustButton,
    className: "mwc-icon icon-adjust ddv-button-disabled",
    label: "Adjust"
}

export class AdjustButton {
    static uiConfig = adjustButtonUiConfig;

    constructor(editViewer, perspectiveViewer) {
        this.editViewer = editViewer;
        this.perspectiveViewer = perspectiveViewer;
        this.el = document.getElementById(elementIds.adjustButton);

        this.bindViewerEvents();
        this.bindEvents();
    }

    bindViewerEvents() {
        this.editViewer.on("paginationChanged", (e) => {
            if (e.pageCount === 0) {
                this.el.classList.add("ddv-button-disabled");
            } else if (this.editViewer.toolMode !== "crop") {
                this.el.classList.remove("ddv-button-disabled");
            }
        })

        this.editViewer.on("toolModeChanged", (e) => {
            const { newToolMode } = e
            if (
                e.newToolMode === "crop"
                || e.newToolMode === "annotation"
            ) {
                this.el.classList.add("ddv-button-disabled");
            } else {
                this.el.classList.remove("ddv-button-disabled");
            }
        })
    }

    bindEvents() {
        this.el.addEventListener("click", () => {
            uiEmitter.emit(uiEmitterName.viewChanged, "adjustView");
        })
    }
}