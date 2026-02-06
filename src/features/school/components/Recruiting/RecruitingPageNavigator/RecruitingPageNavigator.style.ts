import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Page = styled.div`
  ${theme.typography.H4.Sb}
  color: ${theme.colors.lime};
  ${media.down(theme.breakPoints.tablet)} {
    text-align: center;
    width: 100%;
    white-space: nowrap;
  }
`
export const PageInfo = styled.div`
  ${theme.typography.B5.Md}
  color: ${theme.colors.white};
  ${media.down(theme.breakPoints.tablet)} {
    text-align: center;
    width: 100%;
    word-break: keep-all;
  }
`
