import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 1fr;
  }
`
