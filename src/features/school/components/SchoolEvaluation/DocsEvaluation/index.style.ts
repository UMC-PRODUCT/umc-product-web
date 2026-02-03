import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Wrapper = styled.div`
  display: grid;
  gap: 14px;
  width: 100%;
  height: 656px;
  max-height: 656px;
  grid-template-columns: 1fr 2fr;
  ${media.down(theme.breakPoints.desktop)} {
    grid-template-columns: 1fr;
    max-height: fit-content;
    height: fit-content;
  }
`
