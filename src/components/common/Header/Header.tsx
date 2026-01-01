import { useNavigate } from '@tanstack/react-router'

import * as S from './Header.style'
import LeftMenu from '@/components/common/Header/LeftMenu/LeftMenu'
import RightMenu from '@/components/common/Header/RightMenu/RightMenu'

export default function Header({
  leftChildren,
  social,
  nav,
}: {
  leftChildren?: Array<{
    label: string
    link: string
  }>
  social?: Array<{
    label: string
    link: string
    icon: 'kakao' | 'instagram' | 'youtube'
  }>
  nav?: {
    label: string
    link: string
  }
}) {
  const navigate = useNavigate()
  return (
    <header css={{ minWidth: '100vw', maxWidth: '100vw' }}>
      <S.Nav aria-label="Main Navigation">
        <S.LeftWrapper>
          <S.Logo
            onClick={() =>
              navigate({
                to: '/',
              })
            }
          />
          <LeftMenu children={leftChildren} />
        </S.LeftWrapper>
        <S.RightWrapper>
          <RightMenu social={social} nav={nav} />
        </S.RightWrapper>
      </S.Nav>
    </header>
  )
}
