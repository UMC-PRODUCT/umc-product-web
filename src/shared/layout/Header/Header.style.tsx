import styled from '@emotion/styled'

import LogoIcon from '@shared/assets/umc.svg?react'
import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'
import Flex from '@shared/ui/common/Flex/Flex'

export const Nav = styled.nav({
  maxWidth: '100vw',
  width: '100vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '14px 28px 14px 36px',
  overflowX: 'hidden',
  borderBottom: `1.5px solid ${theme.colors.gray[700]}`,
  [media.down(theme.breakPoints.desktop)]: {
    padding: '14px  26px 14px 26px',
  },
  [media.down(theme.breakPoints.tablet)]: {
    padding: '7px 10px 7px 10px',
    height: 44,
  },
})

export const LeftWrapper = styled(Flex)({
  justifyContent: 'flex-start',
  width: 'fit-content',
  gap: '76px',
  [media.down(theme.breakPoints.desktop)]: {
    gap: '68px',
  },
  [media.down(theme.breakPoints.tablet)]: {
    gap: '18px',
    flex: 1,
  },
})

export const RightWrapper = styled(Flex)({
  justifyContent: 'flex-end',
  width: 'fit-content',
})

export const Logo = styled(LogoIcon)({
  width: 82,
  minWidth: 82,
  height: 40,
  cursor: 'pointer',
  [media.down(theme.breakPoints.desktop)]: {
    width: 70,
    minWidth: 70,
  },
  [media.down(theme.breakPoints.tablet)]: {
    width: 38,
    minWidth: 38,
  },
})
