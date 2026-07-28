import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";

const DDV = Dynamsoft.DDV;
const resultViewButtonUiConfig = {
    type: DDV.Elements.Button,
    id: elementIds.resultViewButton,
    className: "mwc-result-view-button  ddv-button-disabled",
    label: "Done"
};

export class ResultViewButton {
    static uiConfig = resultViewButtonUiConfig;

    constructor(viewer) {
        this.el = document.getElementById(elementIds.resultViewButton);
        this.viewer = viewer;

        this.bindEvents();
        this.bindEmitter();
        this.bindViewerEvents();
    }

    bindEvents() {
        if (!this.el) {
            return;
        }

        this.el.addEventListener("click", () => {
            uiEmitter.emit(uiEmitterName.viewChanged, "resultView");
        });
    }

    bindEmitter() {
        uiEmitter.on(uiEmitterName.viewChanged, (viewName) => {
            if (viewName === "resultView" && this.el) {
                this.el.style.display = "none";
            }
        });
    }

    bindViewerEvents() {
        this.viewer.on("paginationChanged", (e) => {
            if (e.pageCount === 0) {
                this.el.classList.add("ddv-button-disabled");
            } else {
                this.el.classList.remove("ddv-button-disabled");
            }
        })
    }
}

