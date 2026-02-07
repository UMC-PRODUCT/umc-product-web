import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

export const MainSlogan = styled.h1`
  margin: 0;
  color: var(--White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 108px;
  font-style: normal;
  font-weight: 800;
  line-height: 101.2px;
  letter-spacing: -3px;
`
export const CustomButton = styled(Button)`
  width: 233px;
  font-weight: 700;
  font-size: 24px;
  line-height: 130%;
`
export const MainTitle = styled.h2`
  margin: 150px 0 0 0;
  color: ${theme.colors.lime};
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 800;
  line-height: 20.8px; /* 94.545% */
  letter-spacing: 2px;
  text-transform: uppercase;
`
export const Info = styled.p`
  color: ${theme.colors.gray[400]};
  text-align: center;
  font-family: Pretendard;
  font-size: 21px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 133.333% */
`

export const Container = styled(Flex)`
  width: 100%;
  padding: 120px 0;
  height: 912px;
  gap: 24px;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  > * {
    position: relative;
    z-index: 1;
  }
`

export const Highlight = styled.div`
  position: absolute;
  inset: -8%;
  z-index: 0;
  top: 120px;
  height: 30%;
  background: linear-gradient(90deg, rgba(149, 239, 75, 0.1) 0%, rgba(149, 239, 75, 0.25) 100%);
  filter: blur(100px);
  transform: scaleX(1.2) rotate(-20deg);
  pointer-events: none;
`
