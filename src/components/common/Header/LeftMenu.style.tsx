import styled from '@emotion/styled'
import { Link as RouterLink } from '@tanstack/react-router'

import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

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
  [media.down(theme.breakPoints.tablet)]: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    maxWidth: '503px',
  },
})

export const MenuLink = styled(RouterLink)<{ $active: boolean }>(
  ({ $active }) => ({
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
  }),
)
