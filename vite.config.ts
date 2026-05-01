import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/kh99/',
  resolve: {
    alias: {
      '@': '/src' // 将 @ 直接映射到项目的 /src 目录
    }
  }
})
