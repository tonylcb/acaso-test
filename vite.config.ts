import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from "@rollup/plugin-eslint"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    {
      ...eslint(),
      enforce: 'pre',
      apply: 'build',
    },
  ],
  css: {
    modules: {
      localsConvention: "camelCase"
    }
  }
})
