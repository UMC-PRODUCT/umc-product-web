import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #1f1f1f;
  align-items: center;
  gap: 18px;
  padding: 24px;
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
  color: #666666;
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
  color: ${theme.colors.gray[300]};
`

export const ListItem = styled.li`
  ${theme.typography.B4.Rg};
  margin-bottom: 6px;
  color: ${theme.colors.gray[300]};
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

export const EditorSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;
  padding: 20px;

  background-color: #1a1a1a;
`

export const EditorPane = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

export const PreviewPane = styled(EditorPane)`
  min-width: 0;
`

export const EditorLabel = styled.span`
  ${theme.typography.C3.Md};
  color: ${theme.colors.gray[300]};
`

export const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const Toolbar = styled.div`
  display: flex;
`

export const ToolButton = styled.button`
  background-color: #2a2a2a;
  border: none;
  padding: 6px 9px;
  border-radius: 7px;

  color: #b0b0b0;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  cursor: pointer;
  &:hover {
    border-color: ${theme.colors.lime};
  }
`

export const MarkdownEditor = styled.textarea`
  ${theme.typography.B4.Rg};
  resize: none;
  width: 100%;
  height: 360px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[600]};
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  outline: none;
  &:focus {
    border-color: ${theme.colors.lime};
  }
`

export const MarkdownPreview = styled.div`
  width: 100%;
  height: 360px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[600]};
  background-color: ${theme.colors.black};
  overflow-y: auto;
`

export const WysiwygEditor = styled.div`
  ${theme.typography.B4.Rg};
  resize: none;
  width: 100%;
  height: 360px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[600]};
  background-color: ${theme.colors.black};
  color: ${theme.colors.gray[300]};
  outline: none;
  overflow-y: auto;
  &:empty:before {
    content: attr(data-placeholder);
    color: ${theme.colors.gray[400]};
  }
  &:focus {
    border-color: ${theme.colors.lime};
  }

  h1,
  h2,
  h3 {
    color: ${theme.colors.white};
  }

  p,
  li {
    color: ${theme.colors.gray[300]};
  }

  hr {
    border: 0.5px solid ${theme.colors.gray[600]};
  }
`
