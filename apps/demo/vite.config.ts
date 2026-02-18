import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: 'public',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use '@mining-sdk/core/styles' as *;\n`,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'charts'
            }
            if (id.includes('@radix-ui')) {
              return 'radix-ui'
            }
            return 'vendor'
          }
        },
      },
    },
    cssCodeSplit: true,
    cssMinify: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
      },
      mangle: {
        safari10: true,
      },
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
})
