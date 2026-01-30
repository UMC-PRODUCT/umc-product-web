import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import pret400Woff2 from '@fontsource/pretendard/files/pretendard-latin-400-normal.woff2'
import pret500Woff2 from '@fontsource/pretendard/files/pretendard-latin-500-normal.woff2'
import pret600Woff2 from '@fontsource/pretendard/files/pretendard-latin-600-normal.woff2'
import { createRouter, RouterProvider } from '@tanstack/react-router'

import * as TanStackQueryProvider from '@app/providers/tanstack-query'

import { GlobalStyle } from '@shared/styles/global.tsx'
import { theme } from '@shared/styles/theme'

// Import the generated route tree
import { routeTree } from '../routeTree.gen.ts'
import reportWebVitals from './reportWebVitals.ts'

import './styles.css'

const preloadFont = (href: string) => {
  if (typeof window === 'undefined') return
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'font'
  link.type = 'font/woff2'
  link.crossOrigin = 'anonymous'
  link.href = href
  document.head.appendChild(link)
}

// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  )
}

preloadFont(pret400Woff2)
preloadFont(pret500Woff2)
preloadFont(pret600Woff2)
reportWebVitals()
