import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/kh99/', // 这里一定要写你的仓库名，前后都要有斜杠
})
