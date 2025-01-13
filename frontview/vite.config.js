import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": {
        target:
          import.meta.env.MODE === "production"
            ? "https://your-backend-url.vercel.app"
            : "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/uploads/": {
        target:
          import.meta.env.MODE === "production"
            ? "https://your-backend-url.vercel.app"
            : "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
