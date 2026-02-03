import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const QuestionMeta = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
`

export const QuestionIndex = styled.span`
  ${theme.typography.B5.Sb};
  color: ${theme.colors.gray[400]};
  flex-shrink: 0;
`

export const QuestionText = styled.p`
  ${theme.typography.B4.Rg};
  color: ${theme.colors.gray[300]};
  margin: 0;
  word-break: break-word;
`

export const EditArea = styled.textarea`
  width: 100%;
  min-height: 72px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray[700]};
  background-color: ${theme.colors.gray[800]};
  color: ${theme.colors.white};
  ${theme.typography.B4.Rg};
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${theme.colors.lime};
  }
`
export const QuestionItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.gray[700]};
  background-color: ${theme.colors.black};
  border-radius: 6px;

  &[data-dragging='true'] {
    opacity: 0.6;
    transform: scale(0.995);
  }
`
export const ActionButton = styled.button`
  ${theme.typography.B5.Md};
  color: ${theme.colors.gray[300]};
  border: 1px solid ${theme.colors.gray[600]};
  background-color: ${theme.colors.gray[800]};
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.gray[700]};
  }
`
export const DragPlaceholder = styled.div`
  height: 6px;
  border-radius: 999px;
  background-color: ${theme.colors.lime};
  opacity: 0.6;
  margin: 2px 0;
`
export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  button {
    height: 24px;
    width: fit-content;
    padding: 3px 12px;
  }
`
