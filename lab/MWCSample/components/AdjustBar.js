import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";
import { FullImageButton } from "./FullImageButton.js";

const DDV = Dynamsoft.DDV;
const adjustBarUiConfig = {
    type: DDV.Elements.Layout,
    id: elementIds.adjustBar,
    className: "mwc-adjust-bar",
    style: {
        display: "none",
    },
    children: [
        {
            type: DDV.Elements.Button,
            className: "mwc-retake-button mwc-icon icon-retake",
            label: "Retake"
        },
        {
            type: DDV.Elements.Button,
            className: "mwc-detect-button mwc-icon icon-detect-border",
            label: "Detect board"
        },
        FullImageButton.uiConfig
    ]
}

export class AdjustBar {
    static uiConfig = adjustBarUiConfig;

    constructor() {
        this.el = document.getElementById(elementIds.adjustBar);
        this.bindEvents();
    }

    bindEvents() {
        uiEmitter.on(uiEmitterName.viewChanged, (viewName) => {
            this.el.style.display = viewName !== "adjustView" ? "none" : "";
        });
    }
}