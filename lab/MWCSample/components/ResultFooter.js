import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";

const DDV = Dynamsoft.DDV;
const resultFooterUiConfig = {
    type: DDV.Elements.Layout,
    className: "mwc-result-footer",
    id: elementIds.resultFooter,
    style: {
        display: "none"
    },
    children: [
        {
            type: DDV.Elements.Button,
            className: "mwc-rescan-button mwc-icon icon-re-scan",
            label: "Rescan"
        },
        {
            type: DDV.Elements.Download,
            className: "mwc-download mwc-icon icon-download",
            label: "Download"
        },
        {
            type: DDV.Elements.Button,
            className: "mwc-scan-more-button mwc-icon icon-scan",
            label: "Scan More"
        },
    ]
}

export class ResultFooter {
    static uiConfig = resultFooterUiConfig;

    constructor() {
        this.el = document.getElementById(elementIds.resultFooter);
        this.bindEvents();
    }

    bindEvents() {
        uiEmitter.on(uiEmitterName.viewChanged, (viewName) => {
            this.el.style.display = viewName !== "resultView" ? "none" : "";
        });
    }
}
