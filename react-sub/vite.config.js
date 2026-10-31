import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const base = isProd ? 'https://qiankun-micro-frontend-99g1.vercel.app/' : '/'
  return {
    plugins: [
      qiankun('react-sub', {
        useDevMode: true,
      }),
      ...(isProd ? [react()] : [])
    ],
    // 生产环境 base 必须是子应用的完整线上 URL：
    // vite-plugin-qiankun 生成的产物用 import('/assets/xxx.js') 动态加载入口脚本，
    // 浏览器会把绝对路径 '/assets/...' 解析到当前页面（主应用）的域名，导致 404 回退为 index.html（MIME text/html 报错）。
    // 设为完整 URL 后，import 路径指向子应用自己的域名，qiankun 内加载才能正确取到 JS。
    base,
    server: {
      port: 5175,
      cors: true,
      origin: 'http://localhost:5175',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  }
})
