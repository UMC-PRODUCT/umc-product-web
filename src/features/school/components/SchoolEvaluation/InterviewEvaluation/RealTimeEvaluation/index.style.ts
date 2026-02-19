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
