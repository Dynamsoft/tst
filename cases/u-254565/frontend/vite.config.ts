import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// Copy DWT resources to public folder if not already there
const dwtResourcesSrc = path.resolve(__dirname, "node_modules/dwt/dist");
const dwtResourcesDest = path.resolve(__dirname, "public/dwt-resources");
if (!fs.existsSync(dwtResourcesDest) && fs.existsSync(dwtResourcesSrc)) {
  fs.cpSync(dwtResourcesSrc, dwtResourcesDest, { recursive: true });
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
