import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  max-width: 100%;
  ${media.down(theme.breakPoints.tablet)} {
    display: flex;
    flex-direction: column;
  }
`
