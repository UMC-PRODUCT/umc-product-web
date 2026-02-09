import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  height: 100%;
  min-height: 0;
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
  max-height: 450px;
  width: 100%;
  overflow: auto;
  padding: 12px 16px;
  box-sizing: border-box;
  ${media.down(theme.breakPoints.desktop)} {
    max-height: 400px;
  }
  ${media.down(theme.breakPoints.tablet)} {
    max-height: 400px;
  }
  ${media.down(theme.breakPoints.desktop)} {
    max-height: 300px;
  }
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
  white-space: nowrap;
  overflow-x: scroll;
  margin-top: auto;
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
export const ModalContentWrapper = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.gray[700]};
  border-radius: 8px;
  padding: 20px;
  overflow: hidden;
  max-width: 90vw;
  max-height: 90vh;
  min-height: 500px;
  height: 100%;
  .body {
    flex: 1;
    min-height: 0;
  }
  .body {
    ${media.down(theme.breakPoints.desktop)} {
      height: fit-content;
    }
  }
`

export const BodyPlaceholder = styled.div`
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Title = styled.div`
  ${theme.typography.H3.Sb}
  color: ${theme.colors.white};
`

export const SubTitle = styled.div`
  ${theme.typography.C4.Rg}
  color: ${theme.colors.gray[400]};
`
export const ModalButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
`
