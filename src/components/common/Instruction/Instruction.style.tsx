import styled from '@emotion/styled'

import { theme } from '@/styles/theme'

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  align-self: center;
`

export const Text = styled.span<{ color: string }>`
  margin-left: 8px;
  color: ${({ color }) => color};
`

export const getColor = (mode: 'success' | 'error' | 'warning') => {
  switch (mode) {
    case 'success':
      return theme.colors.lime
    case 'error':
      return theme.colors.necessary
    case 'warning':
      return theme.colors.caution
  }
}
