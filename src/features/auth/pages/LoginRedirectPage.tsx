import { useEffect, useMemo } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useNavigate } from '@tanstack/react-router'

import { getMyInfo } from '@/features/auth/domain/api'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

type LoginCallbackParams = {
  success?: boolean
  code?: string
  email?: string
  accessToken?: string
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
    const accessToken = params.get('accessToken') ?? oAuthVerificationToken ?? undefined
    console.log('accessToken', accessToken)
    return {
      success: success === 'true' ? true : success === 'false' ? false : undefined,
      code: params.get('code') ?? undefined,
      email: params.get('email') ?? undefined,
      accessToken,
      oAuthVerificationToken,
    }
  }, [])

const LoginRedirectPage = () => {
  const callbackParams = useLoginCallbackParams()
  const { code, oAuthVerificationToken, email, accessToken } = callbackParams
  const navigate = useNavigate()
  const { setName, setNickname, setEmail } = useUserProfileStore()
  const { setItem: setAccessToken } = useLocalStorage('accessToken')
  useEffect(() => {
    if (!accessToken) {
      return
    }

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

    const loadProfile = async () => {
      try {
        const profile = await getMyInfo()
        if (cancelled) return
        setEmail(profile.email ?? '')
        setName(profile.name ?? '')
        setNickname(profile.nickname ?? '')
      } catch (error) {
        console.error('회원 정보 조회 실패', error)
      }
    }

    void loadProfile()

    return () => {
      cancelled = true
    }
  }, [accessToken, setEmail, setName, setNickname])

  useEffect(() => {
    if (!accessToken) return
    setAccessToken(accessToken)
  }, [accessToken, setAccessToken])

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
      <LoadingSpinner />
      <span css={{ marginTop: '12px', ...theme.typography.H4.Sb }}>인증을 확인하고 있습니다.</span>
    </Flex>
  )
}

export default LoginRedirectPage

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingSpinner = styled.div`
  width: 52px;
  height: 52px;
  border: 4px solid rgba(255, 255, 255, 0.25);
  border-top-color: ${theme.colors.white};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`
