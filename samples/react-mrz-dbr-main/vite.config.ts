import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createRequire } from "node:module";

const here = import.meta.dirname;
const nodeRequire = createRequire(import.meta.url);

// Self-host the engine: copy the SDK packages into public/ so the WASM and
// model files are served from this app instead of a CDN. Re-copies only when
// the installed version changes.
for (const pkg of ["dynamsoft-capture-vision-bundle", "dynamsoft-capture-vision-data"]) {
	const src = resolve(here, `node_modules/${pkg}`);
	const dest = resolve(here, `public/${pkg}`);
	const srcVer: string = nodeRequire(`${src}/package.json`).version;
	const destVer = existsSync(`${dest}/package.json`)
		? nodeRequire(`${dest}/package.json`).version
		: null;
	if (srcVer !== destVer) cpSync(src, dest, { recursive: true });
}

export default defineConfig({
	base: "./",
	// HTTPS so the camera also works when testing from another device
	plugins: [basicSsl(), react()],
	server: {
		host: "0.0.0.0",
		headers: {
			// crossOriginIsolated lets the engine use the multi-threaded (pthread)
			// WASM variant via SharedArrayBuffer; requires same-origin resources.
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "credentialless",
		},
	},
});
