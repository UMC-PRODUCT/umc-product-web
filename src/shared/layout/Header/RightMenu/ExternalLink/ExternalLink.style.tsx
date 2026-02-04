import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'

export const ChildLinks = styled(Flex)({
  gap: '12px',
  flexDirection: 'column',
  a: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: theme.colors.white,
    textDecoration: 'none',
  },
  [media.down('1120px')]: {
    gap: '8px',
    ...theme.typography.C4.Rg,
  },
  ...theme.typography.B4.Rg,
  svg: {
    width: '24px',
    height: '24px',
    [media.down('1120px')]: {
      width: '22px',
      height: '22px',
    },
  },
  span: {
    color: theme.colors.gray[400],
  },
})

export const MenuItemWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

export const MenuItem = styled(Flex)({
  gap: '8px',
  cursor: 'pointer',
  flexDirection: 'row',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  flexWrap: 'nowrap',
  color: theme.colors.white,
  ...theme.typography.B3.Md,
  [media.down('1120px')]: {
    ...theme.typography.B5.Rg,
  },
  svg: {
    width: '20px',
    height: '20px',
    [media.down('1120px')]: {
      width: '16px',
      height: '16px',
    },
  },
})

export const SubMenu = styled.div({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '80px',
  right: '106px',
  gap: '10px',
  padding: '22px',
  borderRadius: 12,
  backgroundColor: theme.colors.gray[800],
  border: `1px solid ${theme.colors.gray[700]}`,
  boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
  zIndex: 10,
  [media.down('1120px')]: {
    position: 'static',
    padding: '0',
    marginTop: '8px',
    boxShadow: 'none',
    width: '100%',
    flexWrap: 'wrap',
    border: 'none',
  },
})
