import styled from '@emotion/styled'

import Close from '@/shared/assets/icons/close.svg?react'
import Icon from '@/shared/assets/icons/profile.svg?react'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'

export const Container = styled.div({
  display: 'inline-block',
  position: 'relative',
  '& img': {
    width: 46,
    height: 46,
    borderRadius: '100%',
    objectFit: 'cover',
    [media.down(theme.breakPoints.tablet)]: {
      width: 40,
      height: 40,
    },
  },
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
  top: 60,
  right: 0,
  backgroundColor: theme.colors.gray[800],
  border: `1px solid ${theme.colors.gray[700]}`,
  borderRadius: 10,
  width: 232,
  padding: 16,
  gap: 20,
  zIndex: 900,
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
  color: theme.colors.gray[400],
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
  wordBreak: 'keep-all',
  ...theme.typography.B3.Md,
  [media.down(theme.breakPoints.tablet)]: {
    ...theme.typography.B4.Md,
  },
})

export const EmailText = styled.span({
  color: theme.colors.gray[300],
  ...theme.typography.B4.Rg,
  whiteSpace: 'wrap',
  maxWidth: '100%',
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
  alignSelf: 'center',
  borderBottom: `1px solid ${theme.colors.white}`,
  width: 'fit-content',
  cursor: 'pointer',
  ...theme.typography.H5.Md,
})

export const MenuWrapper = styled(Flex)({
  alignItems: 'center',
  flexDirection: 'column',
  gap: '8px',
  borderTop: `1px solid ${theme.colors.gray[600]}`,
  paddingTop: '16px',
})

export const ModalButton = styled.button({
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  color: theme.colors.white,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  ...theme.typography.B5.Rg,
})

export const DeleteButton = styled(ModalButton)({
  color: theme.colors.necessary,
})
