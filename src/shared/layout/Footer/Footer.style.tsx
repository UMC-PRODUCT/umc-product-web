import styled from '@emotion/styled'

import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'

export const FooterContainer = styled.footer`
  background-color: ${theme.colors.gray[700]};
  padding: 64px 120px 40px 120px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  ${media.down(theme.breakPoints.desktop)} {
    padding: 48px 60px 32px 60px;
  }
  ${media.down(theme.breakPoints.tablet)} {
    padding: 32px 60px 32px 32px;
  }
  ${media.down(theme.breakPoints.mobile)} {
    padding: 32px 16px 32px 16px;
  }
`

export const TextDivider = styled.div`
  height: 14px;
  border-left: 1px solid ${theme.colors.gray[400]};
`
export const Content = styled.div`
  color: ${theme.colors.gray[400]};
  white-space: nowrap;
  ${theme.typography.B4.Rg};
`
