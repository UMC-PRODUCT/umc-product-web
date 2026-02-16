import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Title = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.gray[400]};
  gap: 9px;
  ${theme.typography.B3.Rg};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.H4.Sb};
  }
  .title {
    color: ${theme.colors.lime};
    ${theme.typography.B3.Sb};
  }
`
export const Date = styled.div`
  color: ${theme.colors.gray[400]};
  ${theme.typography.B3.Rg};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.C5.Rg};
  }
`
export const Message = styled.div`
  color: ${theme.colors.white};
  ${theme.typography.B3.Rg};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.C5.Rg};
  }
`
