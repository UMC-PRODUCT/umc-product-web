import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Title = styled.div`
  align-self: flex-start;
  color: ${theme.colors.white};
  ${theme.typography.H1.Sb};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.H3.Sb};
  }
`
