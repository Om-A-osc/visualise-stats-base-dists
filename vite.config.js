import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/probability-visualizer/",
  plugins: [react()],
});
