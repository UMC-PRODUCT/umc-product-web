import '@emotion/react'
import type { theme } from '@/styles/theme'

declare module '@emotion/react' {
  export interface Theme extends theme {}
}
