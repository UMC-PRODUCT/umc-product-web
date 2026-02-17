import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { clearTokens, setAccessToken, setRefreshToken } from '@/api/tokenManager'
import { getActiveGisu, getMemberMe } from '@/features/auth/domain/api'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { getHighestPriorityRole, getRolesByGisu } from '@/shared/utils/role'

import { resolveInitialPathByRole } from '../utils/resolveInitialPathByRole'

type UseAuthRedirectByRoleParams = {
  enabled: boolean
  accessToken?: string
  refreshToken?: string
  persistTokens?: boolean
  fallbackPath?: string
  unauthorizedPath?: string
}

/**
 * accessToken이 있을 때 사용자 프로필/활성 기수를 조회해
 * 역할 기준 초기 경로로 리다이렉트하는 공통 훅.
 */
export const useAuthRedirectByRole = ({
  enabled,
  accessToken,
  refreshToken,
  persistTokens = false,
  fallbackPath = '/dashboard',
  unauthorizedPath = '/auth/login',
}: UseAuthRedirectByRoleParams) => {
  const navigate = useNavigate()
  const [isResolving, setIsResolving] = useState(false)
  const { setName, setNickname, setEmail, setRoles, setRoleList, setGisu } = useUserProfileStore()

  useEffect(() => {
    let cancelled = false
    if (!enabled) return

    const resolveAndRedirect = async () => {
      setIsResolving(true)

      try {
        // OAuth 콜백처럼 URL로 토큰을 받는 경우에만 저장한다.
        if (persistTokens && accessToken) {
          setAccessToken(accessToken)
          if (refreshToken) {
            setRefreshToken(refreshToken)
          }
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

        const path = resolveInitialPathByRole(selectedRole?.roleType ?? null)
        navigate({ to: path, replace: true })
      } catch (error) {
        if (cancelled) return

        const status = (error as { response?: { status?: number } } | null)?.response?.status
        // 인증 실패 토큰은 즉시 정리하고 로그인으로 보낸다.
        if (status === 401 || status === 403) {
          clearTokens()
          navigate({ to: unauthorizedPath, replace: true })
          return
        }

        // 기타 오류는 앱 기본 경로로 우회한다.
        navigate({ to: fallbackPath, replace: true })
      } finally {
        if (!cancelled) {
          setIsResolving(false)
        }
      }
    }

    void resolveAndRedirect()

    return () => {
      cancelled = true
    }
  }, [
    accessToken,
    enabled,
    fallbackPath,
    navigate,
    persistTokens,
    refreshToken,
    setEmail,
    setGisu,
    setName,
    setNickname,
    setRoleList,
    setRoles,
    unauthorizedPath,
  ])

  return { isResolving }
}
