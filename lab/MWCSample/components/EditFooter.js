import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";
import { AdjustButton } from "./AdjustButton.js";
import { DisplayModeButton } from "./DisplayModeButton.js";
import { DisplayModeList } from "./DisplayModeList.js";

const DDV = Dynamsoft.DDV;
const editFooterUiConfig = {
    type: DDV.Elements.Layout,
    className: "mwc-edit-footer",
    id: elementIds.editFooter,
    children: [
        DisplayModeButton.uiConfig,
        DisplayModeList.uiConfig,
        {
            type: DDV.Elements.SeparatorLine,
            className: "mwc-separator-line"
        },
        {
            type: DDV.Elements.Undo,
            className: "mwc-icon icon-undo",
            label: "Undo"
        },
        AdjustButton.uiConfig,
        {
            type: DDV.Elements.Crop,
            label: "Crop"
        },
        {
            type: DDV.Elements.RotateLeft,
            className: "mwc-icon icon-rotate",
            label: "Rotate",
        },
        {
            type: DDV.Elements.Filter,
            className: "mwc-icon icon-filter",
            label: "Filter",
        },
    ]
}


export class EditFooter {
    static uiConfig = editFooterUiConfig;

    constructor() {
        this.el = document.getElementById(elementIds.editFooter);
        this.bindEvents();
    }

    bindEvents() {
        uiEmitter.on(uiEmitterName.viewChanged, (viewName) => {
            this.el.style.display = viewName !== "editView" ? "none" : "";
        });
    }
}