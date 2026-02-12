import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    // Environment
    environment: 'jsdom',
    // Enable global APIs (describe, it, expect, etc.)
    globals: true,
    // Setup files
    setupFiles: ['./src/test-utils/setup-tests.ts'],

    // Include/exclude patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'build', '.next', 'coverage', '**/*.d.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/**/index.{ts,tsx}',
        'src/test/**',
        'src/test-utils/**',
        'src/**/*.d.ts',
      ],
    },

    // Test timeout
    testTimeout: 10000,
    hookTimeout: 10000,

    // Mock configuration
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,

    // Reporter
    reporters: ['default'],
  },

  // Resolve aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@mining-sdk/core': resolve(__dirname, '../core/src'),
      '@mining-sdk/foundation': resolve(__dirname, '../foundation/src'),
    },
  },
  // Define global variables
  define: {
    'process.env': JSON.stringify({
      NODE_ENV: 'test',
    }),
    global: 'globalThis',
  },
})
