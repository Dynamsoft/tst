import { elementIds, global, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";

const DDV = Dynamsoft.DDV;
const editCancelButtonUiConfig = {
    type: DDV.Elements.Button,
    id: elementIds.editCancelButton,
    className: "mwc-edit-cancel",
    label: "Cancel"
};

export class EditCancelButton {
    static uiConfig = editCancelButtonUiConfig;

    constructor(editViewer, perspectiveViewer) {
        this.editViewer = editViewer;
        this.perspectiveViewer = perspectiveViewer;
        this.el = document.getElementById(elementIds.editCancelButton);

        this.bindEvents();
    }

    bindEvents() {
        this.el.addEventListener("click", (e) => {
            if (global.viewMode === "adjustView") {

                const pageCount = this.perspectiveViewer.getPageCount();
                const pageIndexes = Array.from({ length: pageCount }, (_, index) => index);
                this.perspectiveViewer.resetQuadSelection(pageIndexes)


                uiEmitter.emit(uiEmitterName.viewChanged, "editView");
            }

            if (this.editViewer.toolMode === "crop") {
                this.editViewer.toolMode = "pan";
            }
        })
    }
}