/**
 * Initialize Dynamsoft Capture Vision environment for barcode reading.
 * Call once at app startup.
 */
import { CoreModule, LicenseManager } from "dynamsoft-capture-vision-bundle";
import { CONFIG } from "./config";

let initPromise: Promise<void> | null = null;

export function initCVEnvironment(): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    await LicenseManager.initLicense(CONFIG.DCV_LICENSE);
    CoreModule.engineResourcePaths = {
      rootDirectory: CONFIG.DCV_ENGINE_PATH,
    };
    await CoreModule.loadWasm();
  })();

  return initPromise;
}
