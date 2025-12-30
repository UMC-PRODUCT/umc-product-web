import { createFileRoute } from '@tanstack/react-router'
import Logo from '@/assets/brand_logo.svg?react'
import IntroBanner from '@/components/auth/IntroBanner/IntroBanner'
import styled from '@emotion/styled'
import Button from '@/components/common/Button/Button'
import Kakao from '@/assets/social/kakao.svg?react'
import Google from '@/assets/social/google.svg?react'
import Apple from '@/assets/social/apple.svg?react'
import Divider from '@/components/auth/Divider/Divider'
import AuthSection from '@/components/auth/AuthSection/AuthSection'

export const Route = createFileRoute('/auth/login')({
  component: Login,
})

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 24px;
  gap: 24px;
  @media (max-width: ${({ theme }) => theme.breakPoints.desktop}) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`

function Login() {
  return (
    <Main>
      <IntroBanner></IntroBanner>
      <AuthSection size="md">
        <Logo></Logo>
        <Divider label="로그인 또는 회원가입"></Divider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            width: '100%',
          }}
        >
          <Button
            disabled={false}
            label="Kakao로 계속하기"
            Icon={Kakao}
            variant="solid"
            tone="kakao"
            onClick={() => {}}
          ></Button>
          <Button
            disabled={false}
            label="Google로 계속하기"
            Icon={Google}
            variant="solid"
            tone="white"
            onClick={() => {}}
          ></Button>
          <Button
            disabled={false}
            label="Apple로 계속하기"
            Icon={Apple}
            variant="solid"
            tone="white"
            onClick={() => {}}
          ></Button>
        </div>
      </AuthSection>
    </Main>
  )
}
