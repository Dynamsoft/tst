import { elementIds } from "../shared/elements.js";

const DDV = Dynamsoft.DDV;
const fullImageButtonUiConfig = {
    type: DDV.Elements.Button,
    id: elementIds.fullImageButton,
    className: "mwc-full-image-button mwc-icon icon-full-image",
    label: "Full image"
};

export class FullImageButton {
    static uiConfig = fullImageButtonUiConfig;

    constructor(perspectiveViewer) {
        this.perspectiveViewer = perspectiveViewer;
        this.el = document.getElementById(elementIds.fullImageButton);

        this.bindEvents();
    }

    bindEvents() {
        this.el.addEventListener("click", async () => {
            const uid = this.perspectiveViewer.getCurrentPageUid();
            const pageData = this.perspectiveViewer.currentDocument.getPageData(uid);
            const { width, height } = await pageData.raw();
            this.perspectiveViewer.setQuadSelection([
                [0, 0],
                [width, 0],
                [width, height],
                [0, height]
            ])
        })
    }
}