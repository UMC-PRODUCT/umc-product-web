import styled from '@emotion/styled'

import AuthSection from '@features/auth/components/AuthSection/AuthSection'
import IntroBanner from '@features/auth/components/IntroBanner/IntroBanner'

import Logo from '@shared/assets/brand_logo.svg?react'
import Notice from '@shared/assets/icons/notice.svg?react'
import Apple from '@shared/assets/social/apple.svg?react'
import Google from '@shared/assets/social/google.svg?react'
import Kakao from '@shared/assets/social/kakao.svg?react'
import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'
import { Button } from '@shared/ui/common/Button/Button'
import Divider from '@shared/ui/common/Divider/Divider'
import Instruction from '@shared/ui/common/Instruction/Instruction'

export const LoginPage = () => {
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
