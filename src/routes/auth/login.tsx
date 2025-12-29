import { createFileRoute } from '@tanstack/react-router'
import Logo from '@/assets/brand_logo.svg?react'
import IntroBanner from '@/components/auth/IntroBanner'
import styled from '@emotion/styled'
import Button from '@/components/common/Button'
import Kakao from '@/assets/social/kakao.svg?react'
import Google from '@/assets/social/google.svg?react'
import Apple from '@/assets/social/apple.svg?react'
export const Route = createFileRoute('/auth/login')({
  component: Login,
})

const Main = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 24px;
  @media (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    justify-content: center;
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 372px;
`

function Login() {
  return (
    <Main>
      <IntroBanner></IntroBanner>
      <Section>
        <Logo></Logo>
        <Button
          disabled={false}
          label="Kakao로 계속하기"
          Icon={Kakao}
          variant="solid"
          tone="kakao"
        ></Button>
        <Button
          disabled={false}
          label="Google로 계속하기"
          Icon={Google}
          variant="solid"
          tone="white"
        ></Button>
        <Button
          disabled={false}
          label="Apple로 계속하기"
          Icon={Apple}
          variant="solid"
          tone="white"
        ></Button>
      </Section>
    </Main>
  )
}
