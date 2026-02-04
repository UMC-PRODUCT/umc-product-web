import styled from '@emotion/styled'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { theme } from '@shared/styles/theme'

export const TermTitle = styled.span`
  color: ${theme.colors.lime};
  margin-left: 4px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  ${theme.typography.B4.Rg}
`

export const Title = styled.span`
  ${theme.typography.B4.Rg};
  color: ${theme.colors.white};
  margin-left: 4px;
`

export const StyledRoot = styled(CheckboxPrimitive.Root)`
  width: 20px;
  height: 20px;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 4px;
  background: ${theme.colors.gray[800]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;

  &[data-state='checked'] {
    border-color: ${theme.colors.lime};
    background-color: ${theme.colors.lime};
  }

  &[data-disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.12s ease;
  ${StyledRoot}[data-state='checked'] & {
    opacity: 1;
  }
`
