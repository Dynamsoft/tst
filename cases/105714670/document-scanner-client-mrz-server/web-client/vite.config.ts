import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Required for the Dynamsoft WASM engine (SharedArrayBuffer). The Kotlin
// backend sets the same pair of headers in SecurityHeadersFilter.kt, so dev
// and production behave identically.
const crossOriginIsolation = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "require-corp",
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
