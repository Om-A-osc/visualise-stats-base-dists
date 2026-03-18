import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function resolveStdlib() {
  const root = process.cwd();
  const fmtProdMsgShim = path.join(root, "src", "shims", "stdlibFmtProdMsg.js");

  return {
    name: "resolve-stdlib-dist",
    enforce: "pre",
    resolveId(source) {
      if (source === "@stdlib/error-tools-fmtprodmsg" || source === "@stdlib/error-tools-fmtprodmsg/dist") {
        return fmtProdMsgShim;
      }

      if (!source.startsWith("@stdlib/")) {
        return null;
      }

      const packagePath = path.join(root, "node_modules", source);
      const distPath = source.endsWith("/dist")
        ? path.join(root, "node_modules", source, "index.js")
        : path.join(packagePath, "dist", "index.js");

      if (fs.existsSync(distPath)) {
        return distPath;
      }

      return null;
    },
  };
}

export default defineConfig({
  plugins: [resolveStdlib(), react()],
});
