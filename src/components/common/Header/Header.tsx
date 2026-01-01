import { useNavigate } from '@tanstack/react-router'

import * as S from './Header.style'
import LeftMenu from '@/components/common/Header/LeftMenu/LeftMenu'
import RightMenu from '@/components/common/Header/RightMenu/RightMenu'

export default function Header({
  leftChildren,
  social,
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
}) {
  const navigate = useNavigate()
  return (
    <header>
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
          <RightMenu
            social={social}
            nav={{ label: '시스템 관리', link: '/' }}
          />
        </S.RightWrapper>
      </S.Nav>
    </header>
  )
}
