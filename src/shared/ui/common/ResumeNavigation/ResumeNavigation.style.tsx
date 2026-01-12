import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const NavigationContainer = styled.div`
  justify-content: flex-end;
  gap: 4px;
  align-items: center;
  display: flex;
  cursor: pointer;
  ${theme.typography.B2.Md}
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B4.Md}
  }
`

export const PageIndicator = styled.div`
  display: flex;
  ${theme.typography.C2.Md}
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B4.Md}
  }
`
