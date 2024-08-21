import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: './', // 使用相对路径
//   build: {
//     outDir: 'build'
//   },
// })

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 使用相对路径
  build: {
    outDir: 'build'
  },
  plugins: [react({})],
  server: {
    watch: {
      ignored: ["!**/node_modules/**"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "~": resolve(__dirname, "src"),
    },
  },
});
