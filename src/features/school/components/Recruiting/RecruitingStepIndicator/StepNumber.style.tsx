import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const Number = styled.div<{ isActive: boolean; isConfirmed: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isActive
      ? theme.colors.lime
      : props.isConfirmed
        ? 'transparent'
        : theme.colors.gray[600]};
  color: ${(props) => (props.isActive ? theme.colors.black : theme.colors.gray[400])};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  ${theme.typography.B3.Sb}
  border: ${(props) => (props.isConfirmed ? `2px solid ${theme.colors.lime}` : `none`)};
`
export const StepName = styled.div<{ isActive: boolean; isConfirmed: boolean }>`
  ${theme.typography.B5.Md}
  color: ${(props) =>
    props.isActive || props.isConfirmed ? theme.colors.lime : theme.colors.gray[400]};
`
