import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'

export const ContentBox = styled.div`
  background-color: ${theme.colors.gray[700]};
  border-radius: 12px;
  padding: 14px 18px;
  width: 360px;
  border: 1px solid ${theme.colors.gray[600]};
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
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TimeBadge = styled.span`
  background: ${theme.colors.gray[600]};
  padding: 4px 8px;
  border-radius: 4px;
  ${theme.typography.B4.Sb};
  color: ${theme.colors.gray[300]};
`

export const Name = styled.h3`
  ${theme.typography.B3.Sb};
  color: ${theme.colors.white};
`

export const Score = styled.p`
  ${theme.typography.B5.Md};
  color: ${theme.colors.gray[300]};
`

export const TagGroup = styled.div`
  display: flex;
  gap: 12px;
`

export const PartBadge = styled(Button)`
  width: fit-content;
  padding: 3px 9px;
  cursor: default;
  color: ${theme.colors.white};
`
