import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import Loading from '@/shared/ui/common/Loading/Loading'

import { useAuthMutation } from '../hooks/useAuthMutations'
import { useAuthRedirectByRole } from '../hooks/useAuthRedirectByRole'

type LoginCallbackParams = {
  success?: boolean
  code?: string
  error?: string
  message?: string
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
      error: params.get('error') ?? undefined,
      message: params.get('message')?.trim() ?? undefined,
      email: params.get('email') ?? undefined,
      accessToken,
      refreshToken,
      oAuthVerificationToken,
    }
  }, [])

const resolveOAuthFailureMessage = (error?: string, message?: string, success?: boolean) => {
  const normalizedMessage = message?.trim()

  if (error === 'oauth_failed' && normalizedMessage?.includes('authorization_request_not_found')) {
    return '소셜 로그인 요청이 만료되었거나 유효하지 않습니다. 로그인 화면에서 다시 시도해 주세요.'
  }

  if (
    error === 'access_denied' ||
    normalizedMessage?.includes('access_denied') ||
    normalizedMessage?.includes('cancel')
  ) {
    return '소셜 로그인 동의가 취소되었습니다. 다시 시도해 주세요.'
  }

  if (normalizedMessage && !/^\[[^\]]+\]$/.test(normalizedMessage)) {
    return normalizedMessage
  }

  if (error || success === false) {
    return '소셜 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.'
  }

  return undefined
}

export const LoginRedirectPage = () => {
  const callbackParams = useLoginCallbackParams()
  const {
    code,
    oAuthVerificationToken,
    email,
    accessToken,
    refreshToken,
    error,
    message,
    success,
  } = callbackParams
  const navigate = useNavigate()
  const { usePostMemberOAuth } = useAuthMutation()
  const { mutateAsync: addOAuthMutateAsync } = usePostMemberOAuth()
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
  const hasAccessToken = typeof accessToken === 'string' && accessToken.length > 0
  const failureMessage = useMemo(
    () => resolveOAuthFailureMessage(error, message, success),
    [error, message, success],
  )

  useEffect(() => {
    if (!failureMessage) return

    const provider = getOAuthConnectingProvider()
    if (provider) {
      removeOAuthConnectingProvider()
    }
    removeOAuthRedirectFrom()

    if (oAuthFrom === 'accountModal' && currrentPage) {
      window.alert(failureMessage)
      window.location.replace(currrentPage)
      return
    }

    navigate({
      to: '/auth/login',
      search: { oauthError: failureMessage },
      replace: true,
    })
  }, [
    currrentPage,
    failureMessage,
    getOAuthConnectingProvider,
    navigate,
    oAuthFrom,
    removeOAuthConnectingProvider,
    removeOAuthRedirectFrom,
  ])

  useEffect(() => {
    if (failureMessage) return
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
          } catch (requestError) {
            console.error('OAuth 연결에 실패했습니다.', requestError)
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
    failureMessage,
    removeOAuthRedirectFrom,
    removeOAuthConnectingProvider,
    oAuthFrom,
    getOAuthConnectingProvider,
  ])

  useAuthRedirectByRole({
    enabled: hasAccessToken && !oAuthFrom && !failureMessage,
    accessToken: accessToken ?? undefined,
    refreshToken: refreshToken ?? undefined,
    persistTokens: true,
  })

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
