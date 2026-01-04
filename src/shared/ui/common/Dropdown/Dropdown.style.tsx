import styled from '@emotion/styled'
import * as SelectPrimitive from '@radix-ui/react-select'

import { inputShell } from '@shared/styles/formStyles'
import { theme } from '@shared/styles/theme'

export const StyledTrigger = styled(SelectPrimitive.Trigger)`
  ${inputShell};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  background-color: ${theme.colors.black};
  width: 100%;

  &[data-placeholder] {
    color: ${theme.colors.gray[400]};
  }

  &[data-state='open'] {
    transform: translateY(1px);
  }
`

export const StyledIcon = styled(SelectPrimitive.Icon)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 180ms ease;

  [data-state='open'] > & {
    transform: rotate(180deg);
  }
`

export const StyledContent = styled(SelectPrimitive.Content)`
  background: ${theme.colors.black};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 8px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  max-height: var(--radix-select-content-available-height);
  overflow: hidden;
  z-index: 20;
  width: var(--radix-select-trigger-width);
`

export const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: 8px;
`

export const StyledItem = styled(SelectPrimitive.Item)`
  padding: 10px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: ${theme.colors.white};
  outline: none;

  &[data-highlighted] {
    background: ${theme.colors.gray[700]};
  }

  &[data-state='checked'] {
    background: ${theme.colors.gray[700]};
  }
`
