import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Span = styled.span`
  ${theme.typography.B4.Md}
  color: ${theme.colors.gray[300]};
  text-align: start;
  width: 100%;
  margin-bottom: 20px;
  ${media.down(theme.breakPoints.tablet)} {
    margin: 24px 0 24px 24px;
    ${theme.typography.B5.Md}
  }
`
