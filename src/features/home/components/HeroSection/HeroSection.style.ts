import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

import { fadeInUp } from '../../pages/styles/HomePage.common.style'

const blink = keyframes`
  0%, 49% {
    background-color: ${theme.colors.lime};
    color: ${theme.colors.black};
  }
  50%, 100% {
    background-color: transparent;
    color: ${theme.colors.white};
  }
`

export const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 100px 60px 70px;
  position: relative;

  ${media.down(theme.breakPoints.tablet)} {
    padding: 100px 32px 60px;
  }
`

export const HeroBadge = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${theme.colors.lime};
  letter-spacing: 2px;
  margin-bottom: 26px;
  text-transform: uppercase;
  opacity: 0;
  animation: ${fadeInUp} 0.8s forwards;
`

export const HeroTitle = styled.h1`
  font-size: 92px;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 28px;
  letter-spacing: -3px;
  min-height: 110px;
  white-space: pre;

  ${media.down('1200px')} {
    font-size: 62px;
  }

  ${media.down(theme.breakPoints.tablet)} {
    font-size: 42px;
    letter-spacing: -2px;
  }
`

export const HeroChar = styled.span<{ $isCursor?: boolean }>`
  display: inline-block;
  color: ${theme.colors.white};
  transition: all 0.3s;
  ${({ $isCursor }) =>
    $isCursor &&
    css`
      background-color: ${theme.colors.lime};
      color: ${theme.colors.black};
      animation: ${blink} 0.96s infinite;
    `}
`

export const HeroSubtitle = styled.p<{ $visible?: boolean }>`
  font-size: 16px;
  color: ${theme.colors.gray[400]};
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.8;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.8s;
`

export const HeroCta = styled.button<{ $visible?: boolean }>`
  background: ${theme.colors.lime};
  color: ${theme.colors.black};
  padding: 18px 48px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  display: inline-block;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 50px rgba(149, 239, 75, 0.4);
  }
`
