import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";

const DDV = Dynamsoft.DDV
const DisplayModeListUiConfig = {
    type: DDV.Elements.Layout,
    id: elementIds.displayModeList,
    className: "mwc-display-mode-list",
    style: {
        display: "none"
    },
    children: [
        {
            type: DDV.Elements.SinglePage,
            className: "mwc-icon icon-single-view",
            label: "Single View"
        },
        {
            type: DDV.Elements.ContinuousPage,
            className: "mwc-icon icon-continuous-view",
            label: "Continuous View"
        },
        {
            type: DDV.Elements.SeparatorLine,
            className: "mwc-display-mode-arrow"
        }
    ]
}


export class DisplayModeList {
    static uiConfig = DisplayModeListUiConfig

    constructor(viewer) {
        this.viewer = viewer;
        this.el = document.getElementById(elementIds.displayModeList);
        this.init();
    }

    init() {
        this.bindEvent();
        this.bindEmitter();
        this.bindViewerEvent();
    }

    bindEvent() {
        document.addEventListener("click", (event) => {
            const clickedInsideList = this.el.contains(event.target);
            const displayModeButton = document.getElementById(elementIds.displayModeButton);
            const clickedDisplayModeButton = displayModeButton?.contains(event.target);

            if (!this.isVisible() || clickedInsideList || clickedDisplayModeButton) {
                return;
            }

            this.toggleSelf();
        });
    }

    bindEmitter() {
        uiEmitter.on(uiEmitterName.toggleDisplayModeList, () => {
            this.toggleSelf();
        })
    }

    bindViewerEvent() {
        this.viewer.on("paginationChanged", (e) => {
            if (e.pageCount === 0 && this.isVisible()) {
                this.toggleSelf();
            }
        })
    }

    isVisible() {
        return window.getComputedStyle(this.el).display !== "none";
    }

    emitVisibleChange() {
        uiEmitter.emit(uiEmitterName.displayModeListVisibleChange, this.isVisible());
    }

    toggleSelf() {
        const isVisible = this.isVisible();

        this.el.style.display = isVisible ? "none" : "";
        this.emitVisibleChange();
    }
}