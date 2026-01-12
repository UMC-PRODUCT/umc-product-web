import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
// --- Styled Components ---
const Container = styled.div`
  width: 100%;
  user-select: none;
`

const TableWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
`

const MainArea = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  width: 100%;
`

const HeaderRow = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$cols}, 100px);
  min-height: 52px;
  align-items: center;
  margin-bottom: 0px;
  width: max-content;
`

const HeaderCell = styled.div<{ $isAllSelected: boolean; $isInteractive?: boolean }>`
  display: flex;
  justify-content: center;
  cursor: ${({ $isInteractive }) => ($isInteractive ? 'pointer' : 'default')};
`

const TimeLabelsColumn = styled.div`
  width: 50px;
  position: relative;
  padding-top: 68px;
`

const TimeLabel = styled.div<{ $top: number }>`
  position: absolute;
  right: 0px;
  top: ${(props) => props.$top}px;
  transform: translateY(-50%); /* 시간 글자 중심을 그리드 가로선에 맞춤 */
  color: ${theme.colors.gray[400]};
  white-space: nowrap;
  ${theme.typography.C5.Md}
`

const GridBody = styled.div<{ $cols: number }>`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$cols}, 100px);
  border-top: 1px solid ${theme.colors.gray[600]};
  border-left: 1px solid ${theme.colors.gray[600]};
  gap: 0;
  width: max-content;
`

const SlotCell = styled.div<{
  $isSelected: boolean
  $isDisabled: boolean
  $isHourBoundary: boolean
  $isInteractive?: boolean
}>`
  height: 25px;
  box-sizing: border-box;
  background-color: ${(p) =>
    p.$isDisabled
      ? theme.colors.gray[800]
      : p.$isSelected
        ? theme.colors.lime
        : theme.colors.black};
  border-right: 1px solid ${theme.colors.gray[600]};
  border-bottom: ${(p) =>
    p.$isHourBoundary
      ? `1px solid ${theme.colors.gray[500]}`
      : `1px solid ${theme.colors.gray[600]}`};
  cursor: ${(p) => {
    if (!p.$isInteractive) return 'default'
    return p.$isDisabled ? 'not-allowed' : 'pointer'
  }};

  &:hover {
    ${(p) => p.$isInteractive && !p.$isDisabled && 'filter: brightness(1.2);'}
  }
`
export {
  Container,
  GridBody,
  HeaderCell,
  HeaderRow,
  MainArea,
  SlotCell,
  TableWrapper,
  TimeLabel,
  TimeLabelsColumn,
}
