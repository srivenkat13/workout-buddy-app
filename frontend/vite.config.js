import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //to setup a proxy in vite, adding in package.json wont work
  server: {
    proxy: {
      "/api": {
        target: "https://workout-buddy-app-nine.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
