import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const QuestionInfo = styled.div`
  background-color: ${theme.colors.lime};
  ${theme.typography.B4.Md}
  border-radius: 4px;
  color: ${theme.colors.black};
  padding: 5px 10px;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  cursor: grab;
  -webkit-user-drag: element;
`
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const Body = styled.div`
  ${theme.typography.B4.Md}
  color: ${theme.colors.gray[400]};
  white-space: nowrap;
`
