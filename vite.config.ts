import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze'
  const isVitest = process.env.VITEST === 'true' || mode === 'test'

  return {
    server: {
      host: true,
      port: 3000,
    },
    plugins: [
      devtools(),
      !isVitest
        ? tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
          })
        : null,
      svgr({ include: '**/*.svg?react' }),
      react({
        babel: {
          plugins: [
            [
              '@emotion',
              {
                autoLabel: 'dev-only',
                labelFormat: '[local]',
                cssPropOptimization: true,
              },
            ],
          ],
        },
      }),
      isAnalyze
        ? visualizer({
            filename: 'dist/bundle-stats.html',
            gzipSize: true,
            brotliSize: true,
            open: false,
          })
        : null,
    ].filter(Boolean),
    resolve: {
      dedupe: ['react', 'react-dom', '@emotion/react'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
        '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      },
    },
  }
})
