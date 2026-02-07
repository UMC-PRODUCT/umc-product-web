import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  align-items: center;
  gap: 18px;
  margin-top: 30px;
  button {
    width: fit-content;
    height: 32px;
  }
`
export const ModalTitle = styled.h2`
  ${theme.typography.H2.Sb};
  margin: 0;
  color: ${theme.colors.white};
`
export const ModalContentWrapper = styled(Flex)`
  background-color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
`
export const ModalButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`

export const Info = styled.div`
  ${theme.typography.C3.Md};
  display: flex;
  gap: 40px;
  color: ${theme.colors.gray[300]};
`
export const Heading1 = styled.h1`
  ${theme.typography.B1.Sb};
  margin-bottom: 16px;
  color: ${theme.colors.white};
`

export const Heading2 = styled.h2`
  ${theme.typography.B3.Sb};
  margin-top: 24px;
  margin-bottom: 12px;
  color: ${theme.colors.white};
`

export const Heading3 = styled.h3`
  ${theme.typography.B4.Sb};
  margin-top: 16px;
  margin-bottom: 12px;
  color: ${theme.colors.white};
`

export const Paragraph = styled.p`
  ${theme.typography.B4.Rg};
  margin-bottom: 12px;
  color: ${theme.colors.white};
`

export const ListItem = styled.li`
  ${theme.typography.B4.Rg};
  margin-bottom: 6px;
  color: ${theme.colors.white};
`

export const Divider = styled.hr`
  border: 0.5px solid ${theme.colors.gray[600]};
  margin: 8px 0;
  width: 100%;
`

export const TableWrapper = styled.div`
  overflow-x: auto;
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${theme.typography.B4.Rg};
`

export const TableHeader = styled.th`
  border: 1px solid ${theme.colors.gray[600]};
  padding: 8px;
  background-color: ${theme.colors.gray[600]};
  color: ${theme.colors.white};
  text-align: left;
`

export const TableCell = styled.td`
  border: 1px solid ${theme.colors.gray[600]};
  padding: 8px;
  color: ${theme.colors.white};
`

export const Blur = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 999999;
  border-radius: 0 0 16px 16px;
  background: linear-gradient(
    to bottom,
    rgba(39, 39, 39, 0) 0%,
    rgba(39, 39, 39, 1) 70%,
    rgba(39, 39, 39, 1) 100%
  );
`
