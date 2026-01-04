import { useNavigate } from '@tanstack/react-router'

import LeftMenu from '@shared/layout/Header/LeftMenu/LeftMenu'
import RightMenu from '@shared/layout/Header/RightMenu/RightMenu'

import * as S from './Header.style'

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
            aria-label="홈으로 이동"
            role="button"
            tabIndex={0}
            onClick={() =>
              navigate({
                to: '/',
              })
            }
          />
          <LeftMenu>{leftChildren}</LeftMenu>
        </S.LeftWrapper>
        <S.RightWrapper>
          <RightMenu social={social} nav={nav} />
        </S.RightWrapper>
      </S.Nav>
    </header>
  )
}
