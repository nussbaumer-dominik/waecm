import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  fs: {
    allow: ["./src"],
  },
  server: {
    port: 4444,
  },
  plugins: [react()],
});