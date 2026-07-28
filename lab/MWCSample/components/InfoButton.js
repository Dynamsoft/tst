import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";

const DDV = Dynamsoft.DDV;
const infoButtonUiConfig = {
    type: DDV.Elements.Button,
    id: elementIds.infoButton,
    style: {
        display: "none"
    },
    className: "mwc-icon icon-info"
};

export class InfoButton {
    static uiConfig = infoButtonUiConfig;

    constructor() {
        this.el = document.getElementById(elementIds.infoButton);
        this.bindEmitter();
    }

    bindEmitter() {
        uiEmitter.on(uiEmitterName.viewChanged, (viewName) => {
            if (viewName === "resultView" && this.el) {
                this.el.style.display = "";
            }
        });
    }
}

