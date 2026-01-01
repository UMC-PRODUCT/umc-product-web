import styled from '@emotion/styled'

import Flex from '../Flex/Flex'
import Icon from '@/assets/icons/profile.svg?react'
import Close from '@/assets/icons/close.svg?react'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

export const Container = styled.div({
  display: 'inline-block',
})

export const TriggerIcon = styled(Icon)({
  borderRadius: '100%',
  cursor: 'pointer',
  width: 40,
  [media.down(theme.breakPoints.tablet)]: {
    width: 19,
  },
})

export const Modal = styled.div({
  position: 'absolute',
  top: 80,
  right: 20,
  backgroundColor: theme.colors.gray[800],
  border: `1px solid ${theme.colors.gray[700]}`,
  borderRadius: 10,
  width: 232,
  padding: 16,
  gap: 20,
  display: 'flex',
  flexDirection: 'column',
  [media.down(theme.breakPoints.tablet)]: {
    width: 212,
    top: 50,
    right: 10,
  },
})

export const CloseButton = styled(Close)({
  position: 'absolute',
  top: 16,
  right: 16,
  width: 22,
  height: 22,
  cursor: 'pointer',
})

export const Avatar = styled(Icon)({
  borderRadius: '100%',
  cursor: 'pointer',
  width: 46,
  minWidth: 46,
  [media.down(theme.breakPoints.tablet)]: {
    width: 40,
    minWidth: 40,
  },
})

export const NameText = styled.span({
  color: theme.colors.white,
  ...theme.typography.B3.Md,
  [media.down(theme.breakPoints.tablet)]: {
    ...theme.typography.B4.Md,
  },
})

export const EmailText = styled.span({
  color: theme.colors.gray[300],
  ...theme.typography.B4.Rg,
  [media.down(theme.breakPoints.tablet)]: {
    ...theme.typography.B5.Rg,
  },
})

export const InfoRow = styled(Flex)({
  color: theme.colors.gray[300],
  ...theme.typography.B4.Rg,
})

export const MobileOnly = styled.div({
  display: 'none',

  [media.down('1120px')]: {
    display: 'flex',
  },
})

export const Logout = styled.div({
  display: 'flex',
  justifyContent: 'center',
  color: theme.colors.white,
  textDecoration: 'underline',
  cursor: 'pointer',
  ...theme.typography.B5.Rg,
})
