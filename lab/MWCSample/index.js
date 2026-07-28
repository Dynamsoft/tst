import { AdjustBar } from "./components/AdjustBar.js";
import { DisplayModeButton } from "./components/DisplayModeButton.js";
import { DisplayModeList } from "./components/DisplayModeList.js";
import { EditFooter } from "./components/EditFooter.js";
import { EditHeader } from "./components/EditHeader.js";
import { Header } from "./components/Header.js";
import { ResultFooter } from "./components/ResultFooter.js";
import { ResultViewButton } from "./components/ResultViewButton.js";
import { InfoButton } from "./components/InfoButton.js";
import { ScanButton } from "./components/ScanButton.js";
import { EditCancelButton } from "./components/EditCancelButton.js";
import { EditApplyButton } from "./components/EditApplyButton.js";
import { AdjustButton } from "./components/AdjustButton.js";
import uiEmitter from "./shared/emitter.js";
import { elementIds, global, uiEmitterName } from "./shared/elements.js";
import { FullImageButton } from "./components/FullImageButton.js";

const DDV = Dynamsoft.DDV
await (async () => {
    DDV.Core.license = "";
    DDV.Core.engineResourcePath = "Resources/engine";
    // DDV.Core.loadWasm();
    DDV.use(DDV.ImagePdfParserPlugin);

    await DDV.Core.init();
})();


DDV.setProcessingHandler("imageFilter", new DDV.ImageFilter());

const editViewerUiConfig = {
    type: DDV.Elements.Layout,
    className: "mwc-container",
    flexDirection: "column",
    children: [
        Header.uiConfig,
        EditHeader.uiConfig,
        {
            type: DDV.Elements.MainView,
            id: elementIds.editViewContainer,
        },
        {
            type: DDV.Elements.Layout,
            id: elementIds.adjustViewContainer,
            style: {
                display: "none"
            }
        },
        AdjustBar.uiConfig,
        EditFooter.uiConfig,
        ResultFooter.uiConfig
    ],
};

const perspectiveViewerUiConfig = {
    type: DDV.Elements.Layout,
    style: {
        border: "none",
    },
    children: [
        DDV.Elements.MainView,
    ]
}

const editViewer = new DDV.EditViewer({
    container: "mwcContainer",
    uiConfig: editViewerUiConfig,
});
editViewer.displayMode = "single"

const perspectiveViewer = new DDV.PerspectiveViewer({
    container: elementIds.adjustViewContainer,
    uiConfig: perspectiveViewerUiConfig,
    groupUid: editViewer.groupUid
})

new DisplayModeButton(editViewer);
new DisplayModeList(editViewer);
new EditFooter();
new ResultFooter();
new ResultViewButton(editViewer);
new ScanButton();
new InfoButton();
new Header(editViewer);
new EditHeader(editViewer);
new EditApplyButton(editViewer, perspectiveViewer);
new EditCancelButton(editViewer, perspectiveViewer);
new AdjustButton(editViewer);
new AdjustBar(editViewer);
new FullImageButton(perspectiveViewer);

uiEmitter.on(uiEmitterName.viewChanged, (viewMode) => {
    global.viewMode = viewMode;

    const editViewContainer = document.getElementById(elementIds.editViewContainer);
    const adjustViewContainer = document.getElementById(elementIds.adjustViewContainer);

    adjustViewContainer.style.display = viewMode === "adjustView" ? "" : "none";
    editViewContainer.style.display = viewMode === "adjustView" ? "none" : "";
})
