import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";

const DDV = Dynamsoft.DDV;
const scanButtonUiConfig = {
    type: DDV.Elements.Button,
    id: elementIds.scanButton,
    className: "mwc-icon icon-scan"
};

export class ScanButton {
    static uiConfig = scanButtonUiConfig;

    constructor() {
        this.el = document.getElementById(elementIds.scanButton);
        this.bindEmitter();
    }

    bindEmitter() {
        uiEmitter.on(uiEmitterName.viewChanged, (viewName) => {
            if (viewName === "resultView" && this.el) {
                this.el.style.display = "none";
            }
        });
    }
}