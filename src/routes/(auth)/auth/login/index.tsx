import styled from '@emotion/styled'
import { createFileRoute } from '@tanstack/react-router'

import Logo from '@/assets/brand_logo.svg?react'
import Notice from '@/assets/icons/notice.svg?react'
import Apple from '@/assets/social/apple.svg?react'
import Google from '@/assets/social/google.svg?react'
import Kakao from '@/assets/social/kakao.svg?react'
import AuthSection from '@/components/auth/AuthSection/AuthSection'
import Divider from '@/components/auth/Divider/Divider'
import IntroBanner from '@/components/auth/IntroBanner/IntroBanner'
import Button from '@/components/common/Button/Button'
import Instruction from '@/components/common/Instruction/Instruction'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

export const Route = createFileRoute('/(auth)/auth/login/')({
  component: () => {
    return (
      <Main>
        <IntroBanner></IntroBanner>
        <AuthSection size="md">
          <Logo></Logo>
          <Divider label="로그인 또는 회원가입"></Divider>
          <ButtonGroup>
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
            <Instruction
              mode="success"
              Icon={Notice}
              content={'최근 카카오 계정으로 로그인 하였습니다.'}
              typography="C3.Md"
            ></Instruction>
          </ButtonGroup>
        </AuthSection>
      </Main>
    )
  },
})

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
