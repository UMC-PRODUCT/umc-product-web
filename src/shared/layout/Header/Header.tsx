import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { authKeys, schoolKeys } from '@/features/auth/domain/queryKeys'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import LeftMenu from '@/shared/layout/Header/LeftMenu/LeftMenu'
import RightMenu from '@/shared/layout/Header/RightMenu/RightMenu'
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
  const { data: profileData } = useCustomQuery(
    authKeys.getMemberMe().queryKey,
    authKeys.getMemberMe().queryFn,
  )
  const { data: gisuData } = useCustomQuery(
    schoolKeys.getActiveGisu().queryKey,
    schoolKeys.getActiveGisu().queryFn,
    {
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 1000 * 60 * 60 * 24 * 7,
    },
  )
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
    setGisu(gisuId)
    const activeRole = profileData.roles.find((role) => role.gisuId === gisuId)
    if (activeRole) {
      setRoles(activeRole)
    }
  }, [profileData, gisuId, setGisu, setRoles])

  const { data: schoolLinkData } = useCustomQuery(
    schoolKeys.getSchoolLink(schoolId).queryKey,
    schoolKeys.getSchoolLink(schoolId).queryFn,
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
