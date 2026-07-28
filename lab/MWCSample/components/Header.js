import { InfoButton } from "./InfoButton.js";
import { ResultViewButton } from "./ResultViewButton.js";
import { ScanButton } from "./ScanButton.js";
import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";

const DDV = Dynamsoft.DDV;
const headerUiConfig = {
    type: DDV.Elements.Layout,
    id: elementIds.header,
    className: "mwc-header",
    children: [
        {
            type: DDV.Elements.Print,
            id: elementIds.printButton,
            style: {
                display: "none",
            },
            className: "mwc-icon icon-printer"
        },
        ScanButton.uiConfig,
        {
            type: DDV.Elements.Load,
            id: elementIds.loadButton,
            className: "mwc-icon icon-image-gallery"
        },
        {
            type: DDV.Elements.Pagination,
            className: "mwc-pagination",
            prevPage: {
                className: "mwc-icon icon-arrow-left"
            },
            nextPage: {
                className: "mwc-icon icon-arrow-right"
            }
        },
        {
            type: DDV.Elements.DeleteCurrent,
            id: elementIds.deleteCurrentButton,
            className: "mwc-icon icon-delete"
        },
        ResultViewButton.uiConfig,
        InfoButton.uiConfig,
    ]
}

export class Header {
    static uiConfig = headerUiConfig;

    constructor(viewer) {
        this.viewer = viewer;
        this.el = document.getElementById(elementIds.header);

        this.bindEvents();
        this.bindViewerEvents();
    }

    bindEvents() {
        uiEmitter.on(uiEmitterName.viewChanged, (viewName) => {
            if (viewName === "resultView") {
                this.setResultViewButtonsVisible(true);
            } else if (viewName === "adjustView") {
                this.el.style.display = "none"
            } else {
                this.el.style.display = ""
            }
        });
    }

    bindViewerEvents() {
        this.viewer.on("toolModeChanged", (e) => {
            const { newToolMode } = e
            this.el.style.display = newToolMode === "crop" ? "none" : ""
        })
    }

    setResultViewButtonsVisible(isResultView) {
        const printButton = document.getElementById(elementIds.printButton);
        const loadButton = document.getElementById(elementIds.loadButton);
        const deleteCurrentButton = document.getElementById(elementIds.deleteCurrentButton);

        const hiddenElements = [loadButton, deleteCurrentButton];
        const visibleElements = [printButton];

        for (const element of hiddenElements) {
            if (element) {
                element.style.display = isResultView ? "none" : "";
            }
        }

        for (const element of visibleElements) {
            if (element) {
                element.style.display = isResultView ? "" : "none";
            }
        }

    }
}