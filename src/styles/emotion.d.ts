import '@emotion/react'
import type { theme } from './theme'

declare module '@emotion/react' {
  export interface Theme extends ReturnType<typeof theme> {}
}
