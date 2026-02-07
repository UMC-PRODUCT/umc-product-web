import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import Section from '@/shared/ui/common/Section/Section'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  color: ${theme.colors.white};
`

export const SelectBox = styled(Dropdown)`
  background-color: ${theme.colors.gray[700]};
  width: 180px;
  height: 36px;
  border: 1px solid ${theme.colors.gray[600]};
  padding: 8px 16px;
  border-radius: 20px;
  ${theme.typography.B4.Rg};
  cursor: pointer;
`

export const SelectionInfo = styled.button`
  color: ${theme.colors.lime};
  background-color: ${theme.colors.gray[700]};
  ${theme.typography.B4.Rg};
  border: 1px solid ${theme.colors.gray[600]};
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
`

export const Notice = styled.span`
  color: ${theme.colors.gray[400]};
  ${theme.typography.B4.Rg};
`

export const TableContainer = styled(Section)`
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  padding: 0;
`

export const TableScroll = styled.div`
  max-height: 480px;
  width: 100%;
  overflow: auto;
  padding: 12px 16px;
  box-sizing: border-box;
`

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
  width: max-content;
  min-width: 100%;
  th,
  td {
    text-align: left;
    ${theme.typography.B4.Md};
    border-bottom: 1px solid ${theme.colors.gray[600]};
    padding: 12px 25px;
  }

  th {
    font-weight: 500;
    background: inherit;
  }

  tr {
    height: 52px;
    max-height: 52px;
  }

  tbody tr[data-active='true'] td {
    box-shadow: inset 0 0 0 1px ${theme.colors.lime};
  }

  td {
    white-space: nowrap;
  }

  .highlight {
    color: ${theme.colors.lime};
    ${theme.typography.B3.Sb};
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const TagGroup = styled.div`
  display: flex;
  gap: 4px;
`

export const ActionButton = styled(Button)`
  width: 76px;
  height: 28px;
`

export const BottomBar = styled(Section)`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CountBadge = styled.span`
  background: ${theme.colors.gray[700]};
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray[600]};
  color: ${theme.colors.lime};
  margin-left: 8px;
`

export const TableRowHeader = styled.thead`
  background-color: ${theme.colors.gray[600]};
  th {
    white-space: nowrap;
  }
  th:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  th:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`
