import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 4px;

  tbody tr {
    position: relative;
  }

  tbody tr[data-active='true']::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid ${theme.colors.lime};
    border-radius: 4px;
    pointer-events: none;
    z-index: 0;
  }

  tbody tr td {
    position: relative;
    z-index: 1;
  }

  thead {
    border-radius: 4px;
  }
`

const Th = styled.th`
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid ${theme.colors.gray[700]};
  background-color: ${theme.colors.gray[600]};
  color: ${theme.colors.white};
  ${theme.typography.B3.Sb};
  white-space: nowrap;
  input {
    background-color: ${theme.colors.gray[600]};
  }
  &:first-of-type {
    border-bottom-left-radius: 4px;
    padding: 16px 16px 16px 24px;
  }
  &:last-of-type {
    border-bottom-right-radius: 4px;
    padding: 16px 24px 16px 16px;
  }
`

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.gray[700]};
  ${theme.typography.B3.Rg};
  color: ${theme.colors.white};
  white-space: nowrap;
  &:first-of-type {
    padding: 16px 16px 16px 24px;
  }
  &:last-of-type {
    padding: 16px 24px 16px 16px;
  }
`

const Footer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: ${theme.colors.gray[300]};
  width: 100%;
  height: fit-content;
  min-height: 30px;
  span {
    position: absolute;
    left: 22px;
    width: fit-content;
  }
  ${media.down(theme.breakPoints.tablet)} {
    margin-top: 20px;
    height: 80px;
    span {
      bottom: 0px;
    }
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  color: ${theme.colors.gray[300]};
  ${theme.typography.B3.Rg};
  .active {
    color: ${theme.colors.lime};
    ${theme.typography.B3.Sb};
    font-weight: bold;
  }
  span {
    cursor: pointer;
  }
`

const BottomButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  height: 41px;
  width: fit-content;
  align-self: flex-end;
  margin-top: 32px;
  button {
    padding: 10px 32px;
    ${theme.typography.C2.Md};
  }
`

export { BottomButtonGroup, Footer, Pagination, Table, TableWrapper, Td, Th }
