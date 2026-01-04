import styled from '@emotion/styled'

import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'
import Flex from '@shared/ui/common/Flex/Flex'

export const Container = styled.nav({
  display: 'flex',
  alignItems: 'center',
  gap: '49px',
  height: 'fit-content',
})

export const NavLink = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  color: theme.colors.white,
  textDecoration: 'none',
  ...theme.typography.B3.Md,
  [media.down('1120px')]: {
    ...theme.typography.B4.Rg,
  },
  svg: {
    width: '22px',
    height: '22px',
    [media.down('1120px')]: {
      width: '16px',
      height: '16px',
    },
  },
})

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
