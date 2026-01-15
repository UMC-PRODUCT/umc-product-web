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
`
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const Body = styled.div`
  ${theme.typography.B4.Md}
  color: ${theme.colors.gray[400]};
`

export const DragPlaceholder = styled.div<{ $height: number }>`
  height: ${(props) => props.$height}px;
  border: 2px dashed ${theme.colors.gray[300]};
  border-radius: 8px;
  background: ${theme.colors.gray[50]};
  width: 100%;
`
