import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import Section from '@/shared/ui/common/Section/Section'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
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

export const SelectionInfo = styled.div`
  color: ${theme.colors.lime};
  background-color: ${theme.colors.gray[700]};
  ${theme.typography.B4.Rg};
  border: 1px solid ${theme.colors.gray[600]};
  padding: 6px 12px;
  border-radius: 6px;
`

export const Notice = styled.span`
  color: ${theme.colors.gray[400]};
  ${theme.typography.B4.Rg};
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
  ${media.down(theme.breakPoints.tablet)} {
    flex-direction: column;
    gap: 12px;
  }
`

export const CountBadge = styled.span`
  background: ${theme.colors.gray[700]};
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray[600]};
  color: ${theme.colors.lime};
  margin-left: 8px;
`
