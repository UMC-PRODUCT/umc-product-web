import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import type { Preview } from '@storybook/react-vite'

import * as TanStackQueryProvider from '@app/providers/tanstack-query'

import { GlobalStyle } from '@/shared/styles/global'
import { theme } from '@/shared/styles/theme'

const tanstackContext = TanStackQueryProvider.getContext()

const StorybookProviders = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById('modal-root')) return
    const modalRoot = document.createElement('div')
    modalRoot.id = 'modal-root'
    document.body.appendChild(modalRoot)
  }, [])

  return (
    <TanStackQueryProvider.Provider queryClient={tanstackContext.queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </TanStackQueryProvider.Provider>
  )
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <StorybookProviders>
        <Story />
      </StorybookProviders>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
