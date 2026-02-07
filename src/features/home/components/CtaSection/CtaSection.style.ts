import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export { HeroCta } from '../HeroSection/HeroSection.style'

export const CtaSection = styled.section`
  position: relative;
  text-align: center;
  padding: 140px 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  z-index: 0;

  ${media.down(theme.breakPoints.tablet)} {
    padding: 80px 32px;
  }
`

export const CtaContent = styled.div`
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
`

export const CtaTitle = styled.h2`
  font-size: 56px;
  font-weight: 900;
  margin-bottom: 32px;
  letter-spacing: -2px;
`

export const CtaText = styled.p`
  font-size: 18px;
  color: ${theme.colors.gray[400]};
  margin-bottom: 48px;
`

export const Blur = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  transition: none;
  background: linear-gradient(
    to top,
    rgba(149, 239, 75, 0.4) 0%,
    rgba(149, 239, 75, 0.3) 25%,
    rgba(149, 239, 75, 0.18) 55%,
    rgba(149, 239, 75, 0.08) 75%,
    rgba(149, 239, 75, 0) 100%
  );
  filter: blur(100px);
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  pointer-events: none;
`
