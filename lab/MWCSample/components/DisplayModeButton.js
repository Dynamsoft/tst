import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";

const DDV = Dynamsoft.DDV
const DisplayModeUiConfig = {
    type: DDV.Elements.Button,
    id: elementIds.displayModeButton,
    className: "mwc-display-mode-button mwc-icon icon-single-view ddv-button-disabled",
    label: "Single View",
}


export class DisplayModeButton {
    static uiConfig = DisplayModeUiConfig

    constructor(viewer) {
        this.viewer = viewer;
        this.el = document.getElementById(elementIds.displayModeButton);
        this.init();
    }

    init() {
        this.bindViewerEvents();
        this.bindEvents();
        this.bindEmitter();
    }

    bindEmitter() {
        uiEmitter.on(uiEmitterName.displayModeListVisibleChange, (isVisible) => {
            this.syncFocusedState(isVisible);
        });
    }

    bindViewerEvents() {
        this.viewer.on("displayModeChanged", (e) => {
            const { newDisplayMode } = e
            const isContinuous = newDisplayMode === "continuous"
            const label = this.el.getElementsByTagName("span")[0];

            this.el.classList.remove(isContinuous ? "icon-single-view" : "icon-continuous-view");
            this.el.classList.add(isContinuous ? "icon-continuous-view" : "icon-single-view")
            label.innerText = isContinuous ? "Continuous" : "Single View"
        })

        this.viewer.on("paginationChanged", (e) => {
            if (e.pageCount === 0) {
                this.el.classList.add("ddv-button-disabled");
            } else if (this.viewer.toolMode !== "crop") {
                this.el.classList.remove("ddv-button-disabled");
            }
        })

        this.viewer.on("toolModeChanged", (e) => {
            const { newToolMode } = e
            if (
                e.newToolMode === "crop"
                || e.newToolMode === "annotation"
            ) {
                this.el.classList.add("ddv-button-disabled");
            } else {
                this.el.classList.remove("ddv-button-disabled");
            }
        })
    }

    syncFocusedState(isFocused) {
        this.el.classList.toggle("ddv-button-focused", isFocused);
    }

    bindEvents() {
        this.el.addEventListener("click", () => {
            uiEmitter.emit(uiEmitterName.toggleDisplayModeList);
        });
    }
}