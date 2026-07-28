import { elementIds, global, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";

const DDV = Dynamsoft.DDV;
const editApplyButtonUiConfig = {
    type: DDV.Elements.Button,
    id: elementIds.editApplyButton,
    className: "mwc-edit-apply",
    label: "Apply"
};

export class EditApplyButton {
    static uiConfig = editApplyButtonUiConfig;

    constructor(editViewer, perspectiveViewer) {
        this.editViewer = editViewer;
        this.perspectiveViewer = perspectiveViewer;
        this.el = document.getElementById(elementIds.editApplyButton);

        this.bindEvents();
    }

    bindEvents() {
        this.el.addEventListener("click", (e) => {

            if (global.viewMode === "adjustView") {
                const innerViewer = DDV.Experiments.get("InnerViewer", this.perspectiveViewer.uid);
                innerViewer.perspectiveAllPage();
                uiEmitter.emit(uiEmitterName.viewChanged, "editView");

                return;
            }

            if (this.editViewer.toolMode === "crop") {
                const rect = this.editViewer.getCropRect();
                if (!rect) return;

                rect.height = rect.height - 0.01;
                rect.width = rect.width - 0.01;

                this.editViewer.crop(rect);
                this.editViewer.toolMode = "pan";
            }
        })
    }
}