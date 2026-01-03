// @ts-check
import { tanstackConfig } from '@tanstack/eslint-config'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'

export default [
  // ✅ config 파일/빌드 파일은 린트에서 제외
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      'vite.config.ts',
      'dist/**',
      'node_modules/**',
      'src/**/*.gen.ts',
      'src/**/*.d.ts',
      'coverage/**',
    ],
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/order': 'off',
      'sort-imports': 'off',
    },
  },

  ...tanstackConfig,

  // ✅ React 플러그인 설정 (JSX/TSX 파일)
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React 규칙
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 17+ 자동 import
      'react/prop-types': 'off', // TypeScript 사용 시 불필요
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // Emotion css prop 허용

      // React Hooks 규칙
      ...reactHooksPlugin.configs.recommended.rules,

      // 접근성 규칙
      ...jsxA11yPlugin.configs.recommended.rules,
    },
  },

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
