// @ts-check
import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  // ✅ config 파일/빌드 파일은 린트에서 제외
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      'vite.config.ts',
      'dist/**',
      'node_modules/**',
    ],
  },

  ...tanstackConfig,
]
