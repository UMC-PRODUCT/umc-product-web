import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const OptionMarker = styled.div<{ $variant: 'RADIO' | 'CHECKBOX' }>`
  width: 16px;
  height: 16px;
  border: 1.25px solid ${theme.colors.gray[400]};
  border-radius: ${(props) => (props.$variant === 'RADIO' ? '50%' : '4px')};
  flex-shrink: 0;
`

export const OptionField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`

export const OptionInput = styled.input<{ $isOther?: boolean }>`
  ${theme.typography.B4.Md}
  color: ${(props) => (props.$isOther ? theme.colors.gray[400] : theme.colors.white)};
  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[600]};
  padding: 6px 4px;
  width: 100%;

  &:focus {
    outline: none;
    border-bottom-color: ${theme.colors.lime};
  }
`
