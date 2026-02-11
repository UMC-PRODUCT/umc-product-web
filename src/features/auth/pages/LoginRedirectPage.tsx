import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { getMemberMe } from '@/features/auth/domain/api'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import Loading from '@/shared/ui/common/Loading/Loading'

import { gisuKeys } from '../domain/queryKeys'
import { useAuthMutation } from '../hooks/useAuthMutations'

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
  const { data: gisu } = useCustomQuery(gisuKeys.active.queryKey, gisuKeys.active.queryFn, {
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  })
  const { setName, setNickname, setEmail, setRoles } = useUserProfileStore()
  const { usePostMemberOAuth } = useAuthMutation()
  const { mutateAsync: addOAuthMutateAsync } = usePostMemberOAuth()
  const { setItem: setAccessToken } = useLocalStorage('accessToken')
  const { setItem: setRefreshToken } = useLocalStorage('refreshToken')
  const { getItem: getOAuthRedirectFrom, removeItem: removeOAuthRedirectFrom } =
    useLocalStorage('oAuthRedirectFrom')
  const { getItem: getOAuthConnectingProvider, removeItem: removeOAuthConnectingProvider } =
    useLocalStorage('oAuthConnectingProvider')
  const { getItem: getCurrentPage } = useLocalStorage('currentPage')
  const currrentPage = (() => {
    const value = getCurrentPage()
    if (typeof value !== 'string' || value.length === 0) return null
    if (value.startsWith('http://') || value.startsWith('https://')) {
      try {
        return new URL(value).pathname
      } catch {
        return null
      }
    }
    return value.startsWith('/') ? value : `/${value}`
  })()
  const oAuthFrom = getOAuthRedirectFrom()
  const hasRequestedAddOAuthRef = useRef(false)

  useEffect(() => {
    if (hasRequestedAddOAuthRef.current) return
    if (code === 'REGISTER_REQUIRED') {
      const search: Record<string, string> = {}
      if (oAuthVerificationToken) {
        search.oAuthVerificationToken = oAuthVerificationToken
      }

      if (email) {
        search.email = email
      }
      if (oAuthFrom === 'accountModal' && currrentPage && oAuthVerificationToken) {
        hasRequestedAddOAuthRef.current = true
        const target = currrentPage || '/'
        void (async () => {
          try {
            await addOAuthMutateAsync({
              oAuthVerificationToken,
            })
            console.log('OAuth 연결에 성공했습니다.')
          } catch (error) {
            console.error('OAuth 연결에 실패했습니다.', error)
          } finally {
            const provider = getOAuthConnectingProvider()
            if (provider) {
              removeOAuthConnectingProvider()
            }
            removeOAuthRedirectFrom()
            window.location.replace(target)
          }
        })()
        return
      }
      navigate({
        to: '/auth/register',
        search: Object.keys(search).length ? search : undefined,
      })
    }
  }, [
    code,
    navigate,
    oAuthVerificationToken,
    email,
    addOAuthMutateAsync,
    currrentPage,
    removeOAuthRedirectFrom,
    removeOAuthConnectingProvider,
    oAuthFrom,
    getOAuthConnectingProvider,
  ])

  useEffect(() => {
    if (!accessToken || oAuthFrom) return
    setAccessToken(accessToken)
    if (refreshToken) {
      setRefreshToken(refreshToken)
    }
    navigate({ to: '/dashboard' })
  }, [accessToken, refreshToken, setAccessToken, setRefreshToken, navigate, oAuthFrom])

  useEffect(() => {
    let cancelled = false
    if (!accessToken) return
    const loadProfile = async () => {
      try {
        const profile = await getMemberMe()
        if (cancelled) return
        setEmail(profile.email ?? '')
        setName(profile.name ?? '')
        setNickname(profile.nickname ?? '')
        const activeRole = profile.roles.find((role) => role.gisuId === gisu?.result.gisuId)
        setRoles(activeRole ?? null)
      } catch (error) {
        console.error('회원 정보 조회 실패', error)
      }
    }

    void loadProfile()

    return () => {
      cancelled = true
    }
  }, [accessToken, setEmail, setName, setNickname, setRoles, gisu])

  return (
    <>
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
        <span css={{ marginTop: '12px', ...theme.typography.H4.Sb }}>
          인증을 확인하고 있습니다.
        </span>
      </Flex>
    </>
  )
}
