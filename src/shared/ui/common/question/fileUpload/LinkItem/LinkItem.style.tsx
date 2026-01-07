import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const CancelIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;

  svg {
    min-width: 8px;
    min-height: 8px;
  }
`

export const Item = styled.div`
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 20px;
  height: 37px;
  max-width: 654px;
  align-items: center;
  display: flex;
  color: ${theme.colors.white};
  padding: 0 20px;
  flex: 1;
  min-width: 0;
  > span {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-wrap: nowrap;
  ${theme.typography.B4.Rg};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B5.Rg};
  }
`
