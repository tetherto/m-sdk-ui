import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/styles.scss'),
      formats: ['es'],
    },
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    cssCodeSplit: false,
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        assetFileNames: 'styles.css',
      },
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // Add load paths for @mdk/* resolution
        loadPaths: [resolve(__dirname, '../')],
      },
    },
  },
  resolve: {
    alias: {
      '@mdk/core': resolve(__dirname, '../core/src'),
      '@mdk/theme': resolve(__dirname, '../theme/src'),
    },
  },
}))
