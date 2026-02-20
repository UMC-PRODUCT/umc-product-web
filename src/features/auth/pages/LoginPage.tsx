import styled from '@emotion/styled'
import { useNavigate } from '@tanstack/react-router'

import Logo from '@/shared/assets/brand_logo.svg?react'
import Notice from '@/shared/assets/icons/notice.svg?react'
import Apple from '@/shared/assets/social/apple.svg?react'
import Google from '@/shared/assets/social/google.svg?react'
import Kakao from '@/shared/assets/social/kakao.svg?react'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button/Button'
import Divider from '@/shared/ui/common/Divider/Divider'
import Instruction from '@/shared/ui/common/Instruction/Instruction'
import Loading from '@/shared/ui/common/Loading/Loading'

import AuthSection from '../components/AuthSection/AuthSection'
import IntroBanner from '../components/IntroBanner/IntroBanner'
import { useAuthRedirectByRole } from '../hooks/useAuthRedirectByRole'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { setItem, getItem: getPlatform } = useLocalStorage('platform')
  const { getItem: getAccessToken } = useLocalStorage('accessToken')
  const accessToken = getAccessToken()
  const hasAccessToken = typeof accessToken === 'string' && accessToken.length > 0

  const handleSocialLogin = (platform: string) => {
    setItem(platform)
    const baseUrl = `${import.meta.env.VITE_SERVER_API_URL}/auth/oauth2/authorization/${platform}`
    window.location.href = `${baseUrl}`
  }

  const lastPlatform = getPlatform()

  const { isResolving } = useAuthRedirectByRole({
    enabled: hasAccessToken,
  })

  if (hasAccessToken || isResolving) {
    return (
      <Main>
        <AuthSection size="md">
          <Loading
            size={52}
            borderWidth={4}
            spinnerColor={theme.colors.white}
            gap={12}
            aria-label="로그인 상태를 확인하는 중입니다"
          />
        </AuthSection>
      </Main>
    )
  }

  return (
    <Main>
      <IntroBanner />
      <AuthSection size="md">
        <Logo onClick={() => navigate({ to: '/' })} />
        <Divider label="로그인 또는 회원가입" />
        <ButtonGroup>
          <Button
            disabled={false}
            label="Kakao로 계속하기"
            Icon={Kakao}
            variant="solid"
            tone="kakao"
            onClick={() => handleSocialLogin('kakao')}
          />
          <Button
            disabled={false}
            label="Google로 계속하기"
            Icon={Google}
            variant="solid"
            tone="white"
            onClick={() => handleSocialLogin('google')}
          />
          <Button
            disabled={false}
            label="Apple로 계속하기"
            Icon={Apple}
            variant="solid"
            tone="white"
            // onClick={() => handleSocialLogin('apple')}
            onClick={() => alert('Apple 로그인은 현재 지원하지 않습니다.')}
          />
          {lastPlatform && (
            <Instruction
              mode="success"
              Icon={Notice}
              content={`최근 ${lastPlatform} 계정으로 로그인 하였습니다.`}
              typography="C3.Md"
            />
          )}
        </ButtonGroup>
      </AuthSection>
    </Main>
  )
}

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
  gap: 24px;
  ${media.down(theme.breakPoints.desktop)} {
    grid-template-columns: 1fr;
    justify-content: center;
    gap: 0;
  }
  overflow-y: auto;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  ${media.down(theme.breakPoints.mobile)} {
    gap: 16px;
  }
`
