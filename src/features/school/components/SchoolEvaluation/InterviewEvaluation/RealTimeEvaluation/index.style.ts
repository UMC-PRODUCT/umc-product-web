import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Badge } from '@/shared/ui/common/Badge'

export const Container = styled.div`
  width: 100%;
  color: ${theme.colors.white};
  gap: 14px;
  display: flex;
  flex-direction: column;
`

export const FilterNotice = styled.span`
  color: ${theme.colors.gray[500]};
  ${theme.typography.C5.Rg};
`

export const TimeTitle = styled.h2`
  color: ${theme.colors.lime};
  margin: 0;
  ${theme.typography.H4.Sb};
  align-items: center;
  display: flex;
  gap: 18px;
  .divider {
    flex: 1;
    height: 1px;

    border-top: 1px solid ${theme.colors.gray[600]};
  }
`

export const CardWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`

export const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[700]};
  padding: 14px 22px;
  border-radius: 6px;
`

// 상세 페이지 레이아웃
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  gap: 12px;
  h1 {
    ${theme.typography.H3.Sb};
    margin: 0;
    color: ${theme.colors.white};
  }
`

export const TopActions = styled.div`
  display: flex;
  gap: 10px;
`

export const ViewApplicationButton = styled.button`
  background: ${theme.colors.gray[700]};
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[600]};
  padding: 8px 16px;
  border-radius: 6px;
  ${theme.typography.B4.Md};
`

export const BackButton = styled.button`
  background: ${theme.colors.gray[800]};
  color: ${theme.colors.lime};
  border: 1px solid ${theme.colors.lime};
  padding: 8px 16px;
  border-radius: 6px;
  ${theme.typography.B4.Md};
`

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
`

export const ContentBox = styled.div`
  background-color: ${theme.colors.gray[700]};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid ${theme.colors.gray[600]};
`

export const QuestionCard = styled.div`
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 8px;
  padding: 11px 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    color: ${theme.colors.lime};
    ${theme.typography.B3.Sb};
    display: block;
  }
  p {
    color: ${theme.colors.gray[300]};
    ${theme.typography.B4.Rg};
    margin: 0;
  }
`

export const QuestionCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const QuestionHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const QuestionUserBadge = styled(Badge)`
  background-color: ${theme.colors.gray[600]};
  color: ${theme.colors.white};
`
export const ButtonWrapper = styled.div<{ isHidden?: boolean }>`
  display: ${(props) => (props.isHidden ? 'none' : 'flex')};
  height: 22px;
  gap: 8px;
`
export const SubTitle = styled.div`
  ${theme.typography.H4.Sb};
  color: ${theme.colors.white};
`

export const ToggleGroup = styled.div`
  display: flex;
  gap: 10px;
`

export const ToggleButton = styled.button<{ $active?: boolean }>`
  background: ${(props) => (props.$active ? theme.colors.lime : theme.colors.gray[500])};
  color: ${(props) => (props.$active ? theme.colors.black : theme.colors.gray[700])};
  border: none;
  padding: 6px 14px;
  border-radius: 4px;
  ${theme.typography.B4.Sb};
`

export const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

export const StatusTitle = styled.h3`
  ${theme.typography.B3.Sb};
  color: ${theme.colors.white};
`

export const StatusSummary = styled.span`
  color: ${theme.colors.gray[400]};
  ${theme.typography.C5.Rg};
`

export const StatusSummaryValue = styled.span`
  color: ${theme.colors.lime};
`

export const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const StatusItem = styled.div`
  background: ${theme.colors.gray[800]};
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[700]};
  display: flex;
  justify-content: space-between;
`

export const StatusName = styled.span`
  ${theme.typography.B4.Rg};
  color: ${theme.colors.gray[300]};
`

export const StatusScore = styled.span`
  color: ${theme.colors.lime};
  ${theme.typography.B4.Sb};
`

export const StatusScoreMax = styled.small`
  color: ${theme.colors.gray[500]};
`

export const MyEvalTitle = styled.h3`
  ${theme.typography.B3.Sb};
  color: ${theme.colors.white};
  margin-bottom: 15px;
`

export const ScoreLabel = styled.p`
  ${theme.typography.B4.Rg};
  color: ${theme.colors.gray[300]};
`

export const RequiredMark = styled.span`
  color: ${theme.colors.necessary};
`

export const ScoreMax = styled.small`
  color: ${theme.colors.gray[500]};
  ${theme.typography.B4.Rg};
`

export const CommentHeader = styled.p`
  ${theme.typography.B4.Rg};
  display: flex;
  justify-content: space-between;
`

export const CommentCount = styled.span`
  color: ${theme.colors.gray[500]};
`

export const CommentSection = styled.div`
  margin-top: 20px;
`

export const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  background: ${theme.colors.lime};
  color: ${theme.colors.black};
  border: none;
  padding: 12px;
  border-radius: 8px;
  ${theme.typography.B3.Sb};
`

export const ScoreInputBox = styled.div`
  background-color: ${theme.colors.gray[800]};
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  .score-display {
    color: ${theme.colors.lime};
    ${theme.typography.H4.Sb};
  }
`

export const CommentArea = styled.textarea`
  width: 100%;
  height: 120px;
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[700]};
  border-radius: 8px;
  color: ${theme.colors.white};
  padding: 12px;
  margin-top: 12px;
  resize: none;
  outline: none;
  ${theme.typography.B4.Rg};
  &:focus {
    border-color: ${theme.colors.lime};
  }
`
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Content = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`
export const ActionButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? theme.colors.lime : theme.colors.gray[700])};
  color: ${(props) => (props.active ? theme.colors.black : theme.colors.gray[500])};
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  ${theme.typography.B4.Sb};
  cursor: pointer;
`
export const Tag = styled.span`
  padding: 4px 10px;
  border-radius: 20px;
  ${theme.typography.C5.Md};
`
