import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))
const storybookConfigDir = path.join(dirname, '.storybook')

const baseViteConfig =
  typeof viteConfig === 'function'
    ? viteConfig({
        command: 'serve',
        mode: 'test',
        isSsrBuild: false,
        isPreview: false,
      })
    : viteConfig

export default mergeConfig(
  baseViteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            environment: 'node',
            include: ['src/**/*.{test,spec}.ts', 'src/**/*.{test,spec}.tsx'],
            exclude: ['src/**/*.stories.*', 'storybook-static/**', 'dist/**'],
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: storybookConfigDir,
            }),
          ],
          test: {
            name: 'storybook-browser',
            include: ['src/**/*.stories.{ts,tsx,js,jsx,mdx}'],
            exclude: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}', 'storybook-static/**', 'dist/**'],
            browser: {
              enabled: true,
              headless: true,
              provider: 'playwright',
              instances: [{ browser: 'chromium' }],
            },
            setupFiles: ['.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  }),
)
