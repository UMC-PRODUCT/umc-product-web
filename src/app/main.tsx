import { createRoot, hydrateRoot } from 'react-dom/client'
import pret400Woff2 from '@fontsource/pretendard/files/pretendard-latin-400-normal.woff2'
import pret500Woff2 from '@fontsource/pretendard/files/pretendard-latin-500-normal.woff2'
import pret600Woff2 from '@fontsource/pretendard/files/pretendard-latin-600-normal.woff2'

import { App } from './App'
import reportWebVitals from './reportWebVitals.ts'
import { createAppRouter } from './router'

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

const { router, queryClient } = createAppRouter()
const rootElement = document.getElementById('app')

if (rootElement) {
  const app = <App router={router} queryClient={queryClient} />
  const isPrerendered =
    rootElement.dataset.prerendered === 'true' && rootElement.innerHTML.trim().length > 0

  if (isPrerendered) {
    hydrateRoot(rootElement, app)
  } else {
    createRoot(rootElement).render(app)
  }
}

preloadFont(pret400Woff2)
preloadFont(pret500Woff2)
preloadFont(pret600Woff2)
reportWebVitals()
