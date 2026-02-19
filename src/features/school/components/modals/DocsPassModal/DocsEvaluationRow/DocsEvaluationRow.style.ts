import type { Interpolation, Theme } from '@emotion/react'
import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'

export const colors = {
  checkboxBorder: theme.colors.gray[400],
}

export const tagButtonStyle: Interpolation<Theme> = {
  width: 'fit-content',
  padding: '3.5px 9px',
  height: '28px',
  maxHeight: '28px',
  color: theme.colors.gray[300],
}
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
