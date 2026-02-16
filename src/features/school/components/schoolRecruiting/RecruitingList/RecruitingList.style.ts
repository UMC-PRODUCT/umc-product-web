import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const Header = styled.div`
  display: flex;
  width: 100%;
  ${theme.typography.B3.Md}
  flex-direction: row;
  height: 35px;
  border-bottom: 1px solid ${theme.colors.gray[700]};
`
export const Tab = styled.div<{ isActive: boolean }>`
  width: 120px;
  height: 100%;
  display: flex;
  padding-bottom: 14px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.isActive ? theme.colors.lime : theme.colors.gray[400])};
  border-bottom: ${(props) => (props.isActive ? `2px solid ${theme.colors.lime}` : 'none')};
`

// Skeleton removed (spinner 사용)
