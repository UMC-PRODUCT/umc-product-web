import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Title = styled.div`
  ${theme.typography.B4.Sb};
  color: ${theme.colors.lime};
  white-space: nowrap;
`
export const Description = styled.div`
  ${theme.typography.B5.Rg};
  color: ${theme.colors.gray[400]};
  ${media.down(theme.breakPoints.mobile)} {
    display: none;
  }
`
