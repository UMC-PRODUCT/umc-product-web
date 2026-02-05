import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`
export const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[700]};
  padding: 10px;
  gap: 14px;
  border-radius: 6px;
`

export const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

export const EmptyState = styled.div`
  ${theme.typography.B4.Rg};
  color: ${theme.colors.gray[400]};
  padding: 10px 0;
`

export const SelectionInfo = styled.div`
  color: ${theme.colors.lime};
  background-color: ${theme.colors.gray[700]};
  ${theme.typography.B4.Rg};
  border: 1px solid ${theme.colors.gray[600]};
  padding: 6px 12px;
  border-radius: 6px;
  width: fit-content;
  white-space: nowrap;
`
