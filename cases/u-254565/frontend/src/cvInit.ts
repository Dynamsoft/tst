/**
 * Initialize Dynamsoft Capture Vision environment for barcode reading.
 * Call once at app startup.
 */
import { CoreModule } from "dynamsoft-capture-vision-bundle";
import { CONFIG } from "./config";

let initialized = false;

export function initCVEnvironment() {
  if (initialized) return;
  initialized = true;

  CoreModule.engineResourcePaths = {
    rootDirectory: CONFIG.DCV_ENGINE_PATH,
  };
  CoreModule.loadWasm();
}
