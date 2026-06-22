import { useEffect } from "react";
import type { CameraEnhancer } from "dynamsoft-capture-vision-bundle";

interface Camera {
	deviceId: string;
	label: string;
}

const CAMERA_ICON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M3 8a2 2 0 0 1 2-2h2l1.2-1.6A2 2 0 0 1 9.8 3.6h4.4a2 2 0 0 1 1.6.8L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" stroke="currentColor" stroke-width="1.6"/>
	<circle cx="12" cy="12.5" r="3.2" stroke="currentColor" stroke-width="1.6"/>
</svg>`;

/**
 * Camera picker injected into the MRZ scanner's top toolbar, next to the close
 * button. The scanner's built-in UI only toggles front/back, which can't reach
 * the right feed on multi-camera devices like a Surface. Prototype for a
 * feature that should live in the dynamsoft-mrz-scanner source.
 */
function CameraPicker({ cameraEnhancer }: { cameraEnhancer: CameraEnhancer }) {
	useEffect(() => {
		let removed = false;
		let button: HTMLButtonElement | null = null;
		let panel: HTMLDivElement | null = null;

		const closePanel = () => panel && (panel.style.display = "none");

		(async () => {
			const cameras: Camera[] = await cameraEnhancer.getAllCameras();
			const controls = document.querySelector(".mrz-top-controls");
			if (removed || cameras.length < 2 || !controls) return;

			button = document.createElement("button");
			button.className = "mrz-icon-btn camera-picker-btn";
			button.innerHTML = CAMERA_ICON;

			panel = document.createElement("div");
			panel.className = "camera-picker-panel";
			panel.style.display = "none";

			const selectedId = cameraEnhancer.getSelectedCamera()?.deviceId;
			cameras.forEach((cam, i) => {
				const option = document.createElement("div");
				option.className = "camera-picker-option";
				option.textContent = cam.label || `Camera ${i + 1}`;
				if (cam.deviceId === selectedId) option.classList.add("selected");
				option.onclick = async (e) => {
					e.stopPropagation();
					await cameraEnhancer.selectCamera(cam.deviceId);
					panel!.querySelectorAll(".camera-picker-option").forEach((o) =>
						o.classList.remove("selected"),
					);
					option.classList.add("selected");
					closePanel();
				};
				panel!.appendChild(option);
			});

			button.onclick = (e) => {
				e.stopPropagation();
				panel!.style.display = panel!.style.display === "none" ? "block" : "none";
			};

			controls.insertBefore(button, controls.firstChild);
			controls.appendChild(panel);
			document.addEventListener("click", closePanel);
		})();

		return () => {
			removed = true;
			document.removeEventListener("click", closePanel);
			button?.remove();
			panel?.remove();
		};
	}, [cameraEnhancer]);

	return null;
}

export default CameraPicker;
