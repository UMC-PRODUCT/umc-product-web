import { StrictMode } from 'react'
import { ThemeProvider } from '@emotion/react'
import type { QueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import * as TanStackQueryProvider from '@app/providers/tanstack-query'

import { GlobalStyle } from '@/shared/styles/global.tsx'
import { theme } from '@/shared/styles/theme'

import type { AppRouter } from './router'

type AppProps = {
  router: AppRouter
  queryClient: QueryClient
  strict?: boolean
}

const AppContent = ({ router, queryClient }: Omit<AppProps, 'strict'>) => {
  return (
    <TanStackQueryProvider.Provider queryClient={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </TanStackQueryProvider.Provider>
  )
}

export const App = ({ router, queryClient, strict = true }: AppProps) => {
  const content = <AppContent router={router} queryClient={queryClient} />

  if (!strict) {
    return content
  }

  return <StrictMode>{content}</StrictMode>
}
