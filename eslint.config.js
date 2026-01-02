// @ts-check
import { tanstackConfig } from '@tanstack/eslint-config'
import importPlugin from 'eslint-plugin-simple-import-sort'

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
    plugins: {
      'simple-import-sort': importPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/order': 'off',
      'sort-imports': 'off',
    },
  },

  ...tanstackConfig,

  // 최종 오버라이드: import 정렬은 simple-import-sort만 사용
  {
    rules: {
      'import/order': 'off',
      'sort-imports': 'off',
    },
  },

  // JS 구성/설정 파일들은 TS project 설정 없이 파싱
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/require-await': 'off',
    },
  },
]
