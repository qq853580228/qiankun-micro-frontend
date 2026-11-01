import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    // 基座部署为独立 Vercel 项目，资产从根路径提供
    base: '/',
    server: {
      port: 5173,
    },
  }
})
