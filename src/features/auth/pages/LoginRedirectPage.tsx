import { useEffect, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

type LoginCallbackParams = {
  success?: boolean
  code?: string
  email?: string
  accessToken?: string
  oAuthVerificationToken?: string
}
// success=true&
// code=REGISTER_REQUIRED&
// email=kyj030719@kakao.com&
// oAuthVerificationToken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJPQVVUSF9WRVJJRklDQVRJT04iLCJlbWFpbCI6Imt5ajAzMDcxOUBrYWthby5jb20iLCJwcm92aWRlciI6IktBS0FPIiwicHJvdmlkZXJJZCI6IjQ3MDQ1ODg5MjYiLCJpYXQiOjE3Njg3OTcyOTQsImV4cCI6MTc2ODc5Nzg5NH0.cGzl3Yx3SKOQcbsxU-r2dYauOACCBUQLHkGM4WG-jLgLQE7Z0h2YBWedKDLEBEIaba7y0scemahuL5beX0gI7Q
const useLoginCallbackParams = (): LoginCallbackParams =>
  useMemo(() => {
    if (typeof window === 'undefined') {
      return {}
    }

    const params = new URLSearchParams(window.location.search)
    const success = params.get('success')

    const oAuthVerificationToken = params.get('oAuthVerificationToken') ?? undefined
    const accessToken = params.get('accessToken') ?? oAuthVerificationToken ?? undefined

    return {
      success: success === 'true' ? true : success === 'false' ? false : undefined,
      code: params.get('code') ?? undefined,
      email: params.get('email') ?? undefined,
      accessToken,
      oAuthVerificationToken,
    }
  }, [])

const LoginRedirectPage = () => {
  const navigate = useNavigate()
  const callbackParams = useLoginCallbackParams()
  const { code, oAuthVerificationToken, email } = callbackParams

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
  }, [code, navigate, oAuthVerificationToken, email])

  return (
    <Flex
      css={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: theme.colors.white,
        ...theme.typography.H3.Sb,
      }}
    >
      로그인 중입니다...
    </Flex>
  )
}

export default LoginRedirectPage
