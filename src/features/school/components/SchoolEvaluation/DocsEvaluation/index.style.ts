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
export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 18px;
  height: 36px;
  width: fit-content;
  min-width: 150px;
  white-space: nowrap;
  background-color: ${theme.colors.gray[600]};
  border: 1px solid ${theme.colors.gray[500]};
  border-radius: 4px;
  align-items: center;
  cursor: pointer;
  ${theme.typography.C2.Md};
  color: ${theme.colors.white};

  svg {
    width: 19px;
    height: 19px;
    min-width: 19px;
  }
`
