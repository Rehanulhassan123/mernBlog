import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcssVite from "@tailwindcss/vite";

export default defineConfig({
  server: {
    proxy: {
      "/api/v1": "http://localhost:3000",
    },
  },
  plugins: [react(), tailwindcssVite()],
});
