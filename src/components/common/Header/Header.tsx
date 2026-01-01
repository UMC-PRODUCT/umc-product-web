import { useNavigate } from '@tanstack/react-router'
import Flex from '../Flex/Flex'
import Logo from '@/assets/umc.svg?react'

import LeftMenu from '@/components/common/Header/LeftMenu'
import RightMenu from '@/components/common/Header/RightMenu'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

export default function Header({
  leftChildren,
  rightChildren,
}: {
  leftChildren?: Array<{
    label: string
    link: string
  }>
  rightChildren?: Array<{
    label: string
    onClick: () => void
    icon: 'arrow' | 'arrowUp'
  }>
}) {
  const navigate = useNavigate()
  return (
    <header>
      <nav
        aria-label="Main Navigation"
        css={{
          width: '100%',
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
            height: '44px',
          },
        }}
      >
        <Flex
          justifyContent="flex-start"
          width="fit-content"
          css={{
            gap: '76px',
            [media.down(theme.breakPoints.desktop)]: {
              gap: '68px',
            },
            [media.down(theme.breakPoints.tablet)]: {
              gap: '18px',
              flex: 1,
            },
          }}
        >
          <Logo
            onClick={() =>
              navigate({
                to: '/',
              })
            }
            css={{
              width: 82,
              height: 40,
              [media.down(theme.breakPoints.desktop)]: {
                width: 70,
                height: 22,
              },
              [media.down(theme.breakPoints.tablet)]: {
                width: 38,
                height: 12,
              },
            }}
          />
          <LeftMenu children={leftChildren} />
        </Flex>
        <Flex gap="49px" justifyContent="flex-end" width="fit-content">
          <RightMenu children={rightChildren} />
        </Flex>
      </nav>
    </header>
  )
}
