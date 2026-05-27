import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from '@tanstack/router-plugin/vite'
export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), tanstackRouter(
    {
      target: 'react',
      autoCodeSplitting: true
    }
  ), viteReact()],
  server: {
    port: 3001,
  },
});


