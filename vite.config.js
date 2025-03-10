import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Default directory for built assets
  },
  base: "/", // Set this to the subdirectory name if you're deploying to a subfolder, else leave as "/"
});
