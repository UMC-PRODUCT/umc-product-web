import '@emotion/react'

import type { theme } from '@shared/styles/theme'

type AppTheme = typeof theme

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
