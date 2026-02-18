import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  button {
    width: 99px;
    height: 35px;
  }
  ${media.down(theme.breakPoints.tablet)} {
    gap: 12px;
    align-items: flex-start;
    button {
      width: 80px;
      ${theme.typography.B5.Md};
    }
  }
`
