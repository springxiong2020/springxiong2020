import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
  root: "./",
  server: {
    proxy: {
      "/self-hub": {
        target: "https://api.springxiong.cn/self-hub/open/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/self-hub/, ""),
      },
    },
  },
});
