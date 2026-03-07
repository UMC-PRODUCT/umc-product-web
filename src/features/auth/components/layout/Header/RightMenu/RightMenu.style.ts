import styled from '@emotion/styled'
import { Link } from '@tanstack/react-router'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'

const navLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  color: theme.colors.white,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  ...theme.typography.B3.Md,
  [media.down('1120px')]: {
    ...theme.typography.B5.Rg,
  },
  svg: {
    width: '22px',
    height: '22px',
    minWidth: '22px',
    minHeight: '22px',
    [media.down('1120px')]: {
      width: '16px',
      height: '16px',
      minWidth: '16px',
      minHeight: '16px',
    },
  },
} as const

export const Container = styled.nav({
  display: 'flex',
  alignItems: 'center',
  gap: '49px',
  height: 'fit-content',
})

export const NavAnchor = styled.a(navLinkStyle)

export const NavRouterLink = styled(Link)(navLinkStyle)

export const DesktopMenu = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
  justifyContent: 'center',
  [media.down('1120px')]: {
    display: 'none',
  },
})

export const MenuWrapper = styled(Flex)({
  alignItems: 'center',
  flexDirection: 'row',
  gap: '32px',
  [media.down('1120px')]: {
    paddingTop: '16px',
    borderTop: `1px solid ${theme.colors.gray[600]}`,
    flexDirection: 'column',
    gap: '8px',
  },
})
