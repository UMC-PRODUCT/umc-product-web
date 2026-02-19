import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

const Container = styled.div`
  width: 100%;
  user-select: none;
`

const TableWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  position: relative;
`

const MainAreaWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  overflow-x: hidden;
`

const MainArea = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  width: 100%;
`

const ScrollShadow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 36px;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(32, 32, 32, 0) 0.31%,
    rgba(32, 32, 32, 0.4) 20.38%,
    rgba(32, 32, 32, 0.9) 50%,
    #202020 60.03%
  );
`

const HeaderRow = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$cols}, 100px);
  min-height: 52px;
  align-items: center;
  margin-bottom: 0px;
  width: max-content;
`

const HeaderCell = styled.div<{
  $isAllSelected: boolean
  $isInteractive?: boolean
  $readOnlyCursor?: 'default' | 'not-allowed'
}>`
  display: flex;
  justify-content: center;
  cursor: ${({ $isInteractive, $readOnlyCursor }) =>
    $isInteractive ? 'pointer' : ($readOnlyCursor ?? 'default')};
`

const TimeLabelsColumn = styled.div`
  min-width: 50px;
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
  $selectedColorMode?: 'lime' | 'gray'
  $readOnlyCursor?: 'default' | 'not-allowed'
}>`
  height: 25px;
  box-sizing: border-box;
  background-color: ${(p) =>
    p.$isDisabled
      ? theme.colors.gray[800]
      : p.$isSelected
        ? p.$selectedColorMode === 'gray'
          ? theme.colors.gray[400]
          : theme.colors.lime
        : theme.colors.black};
  border-right: 1px solid ${theme.colors.gray[600]};
  border-bottom: ${(p) =>
    p.$isHourBoundary
      ? `1px solid ${theme.colors.gray[500]}`
      : `1px solid ${theme.colors.gray[600]}`};
  cursor: ${(p) => {
    if (!p.$isInteractive) return p.$readOnlyCursor ?? 'default'
    return p.$isDisabled ? 'not-allowed' : 'pointer'
  }};
  transition:
    background-color 120ms ease,
    filter 120ms ease;

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
  MainAreaWrapper,
  ScrollShadow,
  SlotCell,
  TableWrapper,
  TimeLabel,
  TimeLabelsColumn,
}
