import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const Title = styled.div`
  ${theme.typography.B5.Rg}
  color: ${theme.colors.gray[400]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const QuestionLabel = styled.div<{ isNotice?: boolean }>`
  ${theme.typography.B4.Md}
  color: ${theme.colors.white};
  width: 100%;
  margin-top: 8px;
  ${(props) =>
    props.isNotice
      ? `
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        overflow-wrap: anywhere;
      `
      : `
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `}
`
