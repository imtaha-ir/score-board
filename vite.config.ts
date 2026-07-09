import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        id: "/score-board/",
        name: "Score Board",
        short_name: "ScoreBoard",
        description: "A modern neon scoreboard PWA",
        start_url: "/score-board/",
        scope: "/score-board/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#071022",
        theme_color: "#0f172a",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  base: "/score-board/",
});
