import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 16px;
`

export const Container = styled.div`
  position: relative;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 17, 17, 0.6);
  backdrop-filter: blur(2px);
  z-index: 1;
`

export const Title = styled.div`
  ${theme.typography.H3.Sb};
  color: ${theme.colors.white};
`

export const PageList = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
  overflow-y: scroll;
`

export const PageCard = styled.div`
  border-radius: 10px;
  display: grid;
  gap: 12px;
`

export const PageHeader = styled.div`
  ${theme.typography.B3.Sb};
  color: ${theme.colors.white};
  padding-bottom: 8px;
  gap: 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.gray[600]};
`

export const QuestionGroup = styled.div`
  display: grid;
  gap: 10px;
  padding-top: 6px;
`

export const GroupTitle = styled.div`
  ${theme.typography.B4.Sb};
  color: ${theme.colors.gray[400]};
`

export const QuestionsCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 17px;
  flex-direction: column;
  height: fit-content;
  border-radius: 8px;
  background: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[600]};
  overflow-x: hidden;
  width: 100%;
`

export const QuestionTitle = styled.div`
  ${theme.typography.B5.Rg};
  color: ${theme.colors.gray[400]};
`

export const Required = styled.span`
  margin-left: 6px;
  color: ${theme.colors.lime};
`

export const AnswerText = styled.div`
  ${theme.typography.B4.Md};
  color: ${theme.colors.white};
  white-space: pre-wrap;
  word-break: break-word;
`

export const AnswerGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  ${theme.typography.B4.Rg};
  color: ${theme.colors.gray[300]};
`

export const Chip = styled.span`
  background: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 4px;
  padding: 4px 10px;
  ${theme.typography.B5.Md};
  color: ${theme.colors.gray[300]};
`

export const ScheduleRow = styled.div`
  display: grid;
  gap: 6px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  background: ${theme.colors.gray[800]};
  border: 1px dashed ${theme.colors.gray[600]};
`

export const ScheduleDate = styled.div`
  ${theme.typography.B5.Sb};
  color: ${theme.colors.gray[300]};
`

export const ScheduleTimes = styled.div`
  ${theme.typography.B5.Rg};
  color: ${theme.colors.gray[300]};
`

export const EmptyAnswer = styled.div`
  ${theme.typography.B4.Rg};
  color: ${theme.colors.gray[400]};
`
export const TimetableWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  height: fit-content;
`

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 1px;
`

export const Page = styled.span`
  ${theme.typography.B4.Sb};
  color: ${theme.colors.lime};
`

export const PageInfo = styled.span`
  ${theme.typography.B5.Md};
  border-left: 2px solid ${theme.colors.gray[500]};
  color: ${theme.colors.white};
  padding-left: 8px;
`
export const Hyperlink = styled.a`
  ${theme.typography.B4.Md};
  color: ${theme.colors.lime};
  text-decoration: underline;
  cursor: pointer;
`
