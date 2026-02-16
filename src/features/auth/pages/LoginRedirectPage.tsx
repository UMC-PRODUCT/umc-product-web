import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { getActiveGisu, getMemberMe } from '@/features/auth/domain/api'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { theme } from '@/shared/styles/theme'
import type { RoleType } from '@/shared/types/umc'
import { Flex } from '@/shared/ui/common/Flex'
import Loading from '@/shared/ui/common/Loading/Loading'
import {
  getHighestPriorityRole,
  getRolesByGisu,
  isManagementRole,
  isSchoolRole,
} from '@/shared/utils/role'

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

const resolveInitialPathByRole = (roleType?: RoleType | null) => {
  if (!roleType) return '/dashboard'
  if (isManagementRole(roleType)) return '/management/generation'
  if (isSchoolRole(roleType)) return '/school/dashboard'
  return '/dashboard'
}

export const LoginRedirectPage = () => {
  const callbackParams = useLoginCallbackParams()
  const { code, oAuthVerificationToken, email, accessToken, refreshToken } = callbackParams
  const navigate = useNavigate()
  const { setName, setNickname, setEmail, setRoles, setRoleList, setGisu } = useUserProfileStore()
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
    let cancelled = false
    if (!accessToken || oAuthFrom) return
    const loadProfile = async () => {
      try {
        setAccessToken(accessToken)
        if (refreshToken) {
          setRefreshToken(refreshToken)
        }

        const [profile, activeGisuResponse] = await Promise.all([getMemberMe(), getActiveGisu()])
        if (cancelled) return

        const activeGisuId = activeGisuResponse.result.gisuId
        const activeGisuRoles = getRolesByGisu(profile.roles, activeGisuId)
        const selectedRole = getHighestPriorityRole(activeGisuRoles)

        setEmail(profile.email ?? '')
        setName(profile.name ?? '')
        setNickname(profile.nickname ?? '')
        setRoleList(profile.roles)
        setRoles(selectedRole)
        if (activeGisuId) {
          setGisu(activeGisuId)
        }
        const initialPath = resolveInitialPathByRole(selectedRole?.roleType ?? null)
        navigate({ to: initialPath, replace: true })
      } catch (error) {
        console.error('회원 정보 조회 실패', error)
        navigate({ to: '/dashboard', replace: true })
      }
    }

    void loadProfile()

    return () => {
      cancelled = true
    }
  }, [
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    oAuthFrom,
    setEmail,
    setName,
    setNickname,
    setRoles,
    setRoleList,
    setGisu,
    navigate,
  ])

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
