import { useNavigate } from '@tanstack/react-router'

import { schoolKeys } from '@/features/auth/domain/queryKeys'
import type { GetSchoolLinkResponseDTO } from '@/features/auth/domain/types'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import LeftMenu from '@/shared/layout/Header/LeftMenu/LeftMenu'
import RightMenu from '@/shared/layout/Header/RightMenu/RightMenu'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import type { CommonResponseDTO } from '@/shared/types/api'

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
  type SchoolLinkQueryKey = ReturnType<typeof schoolKeys.getSchoolLink>['queryKey']
  const { data: schoolLinkData } = useCustomQuery<
    CommonResponseDTO<GetSchoolLinkResponseDTO>,
    unknown,
    CommonResponseDTO<GetSchoolLinkResponseDTO>,
    SchoolLinkQueryKey
  >(schoolKeys.getSchoolLink(schoolId).queryKey, schoolKeys.getSchoolLink(schoolId).queryFn, {
    enabled: !!schoolId,
  })
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
