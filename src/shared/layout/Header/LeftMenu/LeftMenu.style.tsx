import styled from '@emotion/styled'
import { Link as RouterLink } from '@tanstack/react-router'

import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'

export const Container = styled.nav({
  flex: 1,
  display: 'flex',
})

export const MenuList = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '48px',
  color: 'white',
  cursor: 'pointer',
  [media.down(theme.breakPoints.desktop)]: {
    gap: '38px',
  },
  [media.down(theme.breakPoints.mobile)]: {
    gap: '13px',
  },
})

export const MenuLink = styled(RouterLink, {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active: boolean }>(({ $active }) => ({
  color: $active ? theme.colors.lime : theme.colors.white,
  transition: 'color 0.15s ease',
  whiteSpace: 'nowrap',
  ...theme.typography.H4.Sb,
  [media.down(theme.breakPoints.desktop)]: {
    ...theme.typography.H4.Md,
  },
  [media.down(theme.breakPoints.tablet)]: {
    ...theme.typography.H5.Md,
  },
}))
