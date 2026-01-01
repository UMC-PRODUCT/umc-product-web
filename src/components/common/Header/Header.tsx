import Flex from '../Flex/Flex'
import Logo from '@/assets/umc.svg?react'
import Profile from '@/assets/icons/profile.svg?react'
import LeftMenu from '@/components/common/Header/LeftMenu'
import RightMenu from '@/components/common/Header/RightMenu'
import { useNavigate } from '@tanstack/react-router'
export default function Header() {
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
          ></Logo>
          <LeftMenu></LeftMenu>
        </Flex>
        <Flex gap="49px" justifyContent="flex-end" width="fit-content">
          <RightMenu></RightMenu>
          <Profile css={{ borderRadius: '50%' }}></Profile>
        </Flex>
      </nav>
    </header>
  )
}
