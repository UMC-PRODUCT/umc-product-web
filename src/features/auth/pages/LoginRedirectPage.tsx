import { useEffect, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { getMyInfo } from '@/features/auth/domain/api'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import Loading from '@/shared/ui/common/Loading/Loading'

type LoginCallbackParams = {
  success?: boolean
  code?: string
  email?: string
  accessToken?: string
  refreshToken?: string
  oAuthVerificationToken?: string
}
const useLoginCallbackParams = (): LoginCallbackParams =>
  useMemo(() => {
    if (typeof window === 'undefined') {
      return {}
    }

    const params = new URLSearchParams(window.location.search)
    const success = params.get('success')

    const oAuthVerificationToken = params.get('oAuthVerificationToken') ?? undefined
    const accessToken = params.get('accessToken') ?? undefined
    const refreshToken = params.get('refreshToken') ?? undefined

    return {
      success: success === 'true' ? true : success === 'false' ? false : undefined,
      code: params.get('code') ?? undefined,
      email: params.get('email') ?? undefined,
      accessToken,
      refreshToken,
      oAuthVerificationToken,
    }
  }, [])

export const LoginRedirectPage = () => {
  const callbackParams = useLoginCallbackParams()
  const { code, oAuthVerificationToken, email, accessToken, refreshToken } = callbackParams
  const navigate = useNavigate()
  const { setName, setNickname, setEmail, setLevel } = useUserProfileStore()
  const { setItem: setAccessToken } = useLocalStorage('accessToken')
  const { setItem: setRefreshToken } = useLocalStorage('refreshToken')
  useEffect(() => {
    if (code === 'REGISTER_REQUIRED') {
      const search: Record<string, string> = {}
      if (oAuthVerificationToken) {
        search.oAuthVerificationToken = oAuthVerificationToken
      }
      if (email) {
        search.email = email
      }

      navigate({
        to: '/auth/register',
        search: Object.keys(search).length ? search : undefined,
      })
    }
  }, [code, navigate, oAuthVerificationToken, email, accessToken])

  useEffect(() => {
    let cancelled = false
    if (!accessToken) return
    const loadProfile = async () => {
      try {
        const profile = await getMyInfo()
        if (cancelled) return
        setEmail(profile.email ?? '')
        setName(profile.name ?? '')
        setNickname(profile.nickname ?? '')
        setLevel(profile.level)
      } catch (error) {
        console.error('회원 정보 조회 실패', error)
      }
    }

    void loadProfile()

    return () => {
      cancelled = true
    }
  }, [accessToken, setEmail, setName, setNickname, setLevel])

  useEffect(() => {
    if (!accessToken) return
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    navigate({ to: '/dashboard' })
  }, [accessToken, refreshToken, setAccessToken, setRefreshToken, navigate])

  return (
    <Flex
      css={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        color: theme.colors.white,
      }}
    >
      <Loading
        size={52}
        borderWidth={4}
        spinnerColor={theme.colors.white}
        gap={12}
        aria-label="인증을 확인하는 중입니다"
      />
      <span css={{ marginTop: '12px', ...theme.typography.H4.Sb }}>인증을 확인하고 있습니다.</span>
    </Flex>
  )
}
