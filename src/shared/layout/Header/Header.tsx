import { useNavigate } from '@tanstack/react-router'

import LeftMenu from '@/shared/layout/Header/LeftMenu/LeftMenu'
import RightMenu from '@/shared/layout/Header/RightMenu/RightMenu'

import { schoolKeys } from '@/features/auth/domain/queryKeys'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'

import * as S from './Header.style'

const Header = ({
  leftChildren,
  nav,
}: {
  leftChildren?: Array<{
    label: string
    link: string
  }>

  nav?: {
    label: string
    link: string
  }
}) => {
  const navigate = useNavigate()
  const { schoolId } = useUserProfileStore()
  const { data: schoolLinkData } = useCustomQuery(
    schoolKeys.schoolLink(schoolId).queryKey,
    schoolKeys.schoolLink(schoolId).queryFn,
    {
      enabled: !!schoolId,
    },
  )
  return (
    <header css={{ minWidth: '100vw', maxWidth: '100vw' }}>
      <S.Nav aria-label="Main Navigation">
        <S.LeftWrapper>
          <S.LogoButton
            type="button"
            aria-label="홈으로 이동"
            onClick={() =>
              navigate({
                to: '/',
              })
            }
          >
            <S.Logo />
          </S.LogoButton>
          <LeftMenu>{leftChildren}</LeftMenu>
        </S.LeftWrapper>
        <S.RightWrapper>
          <RightMenu social={schoolLinkData?.result} nav={nav} />
        </S.RightWrapper>
      </S.Nav>
    </header>
  )
}

export default Header
