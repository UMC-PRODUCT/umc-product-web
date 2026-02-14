import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

import {
  fadeInUp,
  homeResponsiveFont,
  homeResponsiveSpace,
} from '../../pages/styles/HomePage.common.style'

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${homeResponsiveSpace(
    'padding: 240px 60px 140px;',
    'padding: 200px 32px 120px;',
    'padding: 150px 20px 80px 20px;',
  )}
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: -34%;
    background: linear-gradient(
      to top left,
      rgba(184, 243, 86, 0) 28%,
      rgba(184, 243, 86, 0.03) 42%,
      rgba(184, 243, 86, 0.1) 49%,
      rgba(184, 243, 86, 0.2) 54%,
      rgba(184, 243, 86, 0.12) 59%,
      rgba(184, 243, 86, 0.05) 66%,
      rgba(184, 243, 86, 0) 76%
    );
    opacity: 0.95;
    filter: blur(54px);
    -webkit-mask-image: radial-gradient(
      78% 58% at 50% 44%,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.82) 38%,
      rgba(0, 0, 0, 0.45) 62%,
      rgba(0, 0, 0, 0) 88%
    );
    mask-image: radial-gradient(
      78% 58% at 50% 44%,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.82) 38%,
      rgba(0, 0, 0, 0.45) 62%,
      rgba(0, 0, 0, 0) 88%
    );
    transform: translateY(-8%);
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`

export const HeroBadge = styled.div`
  ${homeResponsiveFont('13px', '12px', '8px')}
  font-weight: 700;
  color: ${theme.colors.lime};
  letter-spacing: 2px;
  ${homeResponsiveSpace('margin-bottom: 26px;', 'margin-bottom: 20px;', 'margin-bottom: 0px;')}
  text-transform: uppercase;
  opacity: 0;
  animation: ${fadeInUp} 0.8s forwards;
`

export const HeroTitle = styled.h1`
  ${homeResponsiveFont('92px', '62px', '38px')}
  font-weight: 900;
  line-height: 1.1;
  ${homeResponsiveSpace(
    'margin-bottom: 28px;',
    'margin-bottom: 22px;',
    'margin-bottom: 16px; marginTop: 0',
  )}
  letter-spacing: -3px;
  white-space: pre;

  ${media.down(theme.breakPoints.mobile)} {
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
  ${homeResponsiveFont('16px', '15px', '12px')}
  color: ${theme.colors.gray[400]};
  max-width: 800px;
  ${homeResponsiveSpace('margin: 0 auto 40px;', 'margin: 0 auto 30px;', 'margin: 0 auto 24px;')}
  line-height: 1.8;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.8s;
`

export const HeroCta = styled.button<{ $visible?: boolean }>`
  background: ${theme.colors.lime};
  color: ${theme.colors.black};
  ${homeResponsiveSpace('padding: 18px 48px;', 'padding: 12px 38px;', 'padding: 8px 14px;')}
  border-radius: 12px;
  font-weight: 900;
  ${homeResponsiveFont('20px', '15px', '14px')}
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
