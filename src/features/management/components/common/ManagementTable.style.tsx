import styled from '@emotion/styled'

import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 6px;
`

const Th = styled.th`
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid ${theme.colors.gray[700]};
  color: ${theme.colors.white};
  ${theme.typography.B3.Sb};
`

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.gray[700]};
  ${theme.typography.B3.Rg};
  color: ${theme.colors.white};
  button {
    width: 57px;
    height: 28px;
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
