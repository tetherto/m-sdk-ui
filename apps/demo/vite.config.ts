import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ensure react-router-dom is bundled, not externalized
      external: [],
    },
  },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
})
