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
    modulePreload: {
      polyfill: false,
      resolveDependencies: (_url, deps) => {
        return deps.filter((dep) => {
          return (
            !dep.includes('charts-') && !dep.includes('vendor-') && !dep.includes('page-dialog')
          )
        })
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split heavy chart libraries
            if (id.includes('react-gauge-chart')) {
              return 'vendor-gauge-chart'
            }
            if (id.includes('react-day-picker') || id.includes('date-fns')) {
              return 'vendor-date-picker'
            }
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'vendor-charts'
            }
            // Core React libraries
            if (id.includes('react-dom')) {
              return 'vendor-react-dom'
            }
            if (id.includes('react-router')) {
              return 'vendor-react-router'
            }
            if (id.includes('react/') || id.includes('react\\') || id.endsWith('react')) {
              return 'vendor-react'
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'vendor-radix-ui'
            }
            // All other node_modules
            return 'vendor'
          }
          // Split pages into separate chunks for better code splitting
          if (id.includes('src/pages/')) {
            const pageName = id.split('src/pages/')[1]?.split('.')[0]
            return `page-${pageName}`
          }
          if (id.includes('src/examples/')) {
            const exampleName = id.split('src/examples/')[1]?.split('.')[0]
            return `example-${exampleName}`
          }
          return undefined
        },
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
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
        dead_code: true,
        unused: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
})
