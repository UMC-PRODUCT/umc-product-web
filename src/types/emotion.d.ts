import '@emotion/react'
import { theme } from '@/styles/theme'

type AppTheme = typeof theme

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
