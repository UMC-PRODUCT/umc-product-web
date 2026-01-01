import { useNavigate } from '@tanstack/react-router'
import Flex from '../Flex/Flex'
import Logo from '@/assets/umc.svg?react'

import LeftMenu from '@/components/common/Header/LeftMenu'
import RightMenu from '@/components/common/Header/RightMenu'

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
        }}
      >
        <Flex gap="76px" justifyContent="flex-start" width="fit-content">
          <Logo
            width={82}
            height={40}
            onClick={() =>
              navigate({
                to: '/',
              })
            }
            css={{ minWidth: 82, minHeight: 40 }}
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
