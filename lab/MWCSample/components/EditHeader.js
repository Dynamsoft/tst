import { elementIds, uiEmitterName } from "../shared/elements.js";
import uiEmitter from "../shared/emitter.js";
import { EditApplyButton } from "./EditApplyButton.js";
import { EditCancelButton } from "./EditCancelButton.js";

const DDV = Dynamsoft.DDV;
const editHeaderUiConfig = {
    type: DDV.Elements.Layout,
    id: elementIds.editHeader,
    className: "mwc-edit-header",
    style: {
        display: "none"
    },
    children: [
        EditCancelButton.uiConfig,
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
        EditApplyButton.uiConfig,
    ]
}

export class EditHeader {
    static uiConfig = editHeaderUiConfig;

    constructor(viewer) {
        this.viewer = viewer;
        this.el = document.getElementById(elementIds.editHeader);

        this.bindEvents();
        this.bindViewerEvents();
    }

    bindEvents() {
        uiEmitter.on(uiEmitterName.viewChanged, (viewName) => {
            this.el.style.display = viewName === "adjustView" ? "" : "none";
        });
    }

    bindViewerEvents() {
        this.viewer.on("toolModeChanged", (e) => {
            const { newToolMode } = e
            this.el.style.display = newToolMode === "crop" ? "" : "none"
        })
    }
}