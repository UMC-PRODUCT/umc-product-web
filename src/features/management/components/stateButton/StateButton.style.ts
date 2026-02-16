import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const StateBadge = styled.div<{ isActive: boolean }>`
  padding: 4px 12px;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  color: ${(props) => (props.isActive ? theme.colors.lime : theme.colors.gray[300])};
  background-color: ${(props) => (props.isActive ? '#2a3a2a' : theme.colors.gray[600])};
  ${theme.typography.C3.Md};
`
export const Circle = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? theme.colors.lime : theme.colors.gray[300])};
  margin-right: 8px;
`
