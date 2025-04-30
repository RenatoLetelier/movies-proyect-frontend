import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.1.91:8000", // tu backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
