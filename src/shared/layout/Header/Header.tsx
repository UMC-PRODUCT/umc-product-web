import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { getSchoolLink } from '@/features/auth/domain/api'
import { useActiveGisuQuery, useMemberMeQuery } from '@/features/auth/hooks/useAuthQueries'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import LeftMenu from '@/shared/layout/Header/LeftMenu/LeftMenu'
import RightMenu from '@/shared/layout/Header/RightMenu/RightMenu'
import { schoolKeys } from '@/shared/queryKeys'
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
  const { schoolId, setName, setNickname, setEmail, setGisu, setSchoolId, setRoles } =
    useUserProfileStore()
  const { data: profileData } = useMemberMeQuery()
  const { data: gisuData } = useActiveGisuQuery({
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  })
  const gisuId = gisuData?.result.gisuId

  useEffect(() => {
    if (!profileData) return
    setName(profileData.name || '')
    setNickname(profileData.nickname || '')
    setEmail(profileData.email || '')
    setSchoolId(profileData.schoolId ? profileData.schoolId.toString() : '')
  }, [profileData, setName, setNickname, setEmail, setSchoolId])

  useEffect(() => {
    if (!profileData || !gisuId) return
    // setGisu(gisuId)
    // TODO: 역할 추후에 다시 주석 해제 예정
    // const activeRole = profileData.roles.find((role) => role.gisuId === gisuId)
    // if (activeRole) {
    //   setRoles(activeRole)
    // }
  }, [profileData, gisuId, setGisu, setRoles])

  const { data: schoolLinkData } = useCustomQuery(
    schoolKeys.getSchoolLink(schoolId),
    () => getSchoolLink(schoolId),
    {
      enabled: !!schoolId,
    },
  )
  const links = schoolLinkData?.result.links ?? []
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
          <RightMenu links={links} nav={nav} />
        </S.RightWrapper>
      </S.Nav>
    </header>
  )
}

export default Header
