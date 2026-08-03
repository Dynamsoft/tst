import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Cross-origin isolation, currently DISABLED to match the server — see
// SecurityHeadersFilter.kt, where the same pair is commented out. Keep the two
// in step: if dev sends these and production does not, the engine silently picks
// a different WASM build in each, and problems only appear after deployment.
//
// Enabling them opts into `SharedArrayBuffer`, which lets the engine use its
// multi-threaded build — faster capture, most noticeably on mobile. The cost is
// that COEP `require-corp` blocks every subresource that does not send a CORP
// header, including CDN scripts, which is why the engine is self-hosted under
// public/dynamsoft/ (see scripts/copy-resources.mjs).
const crossOriginIsolation = {
  // "Cross-Origin-Opener-Policy": "same-origin",
  // "Cross-Origin-Embedder-Policy": "require-corp",
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    headers: crossOriginIsolation,
    proxy: {
      // Forward API calls to the Kotlin backend during development.
      // `secure: false` accepts its self-signed dev certificate.
      "/api": {
        target: "https://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: { headers: crossOriginIsolation },
  build: {
    outDir: "dist",
    // The engine WASM/model files are large and already compressed.
    chunkSizeWarningLimit: 2000,
  },
});
