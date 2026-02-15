import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

import { homeResponsiveFont, homeResponsiveSpace } from '../../pages/styles/HomePage.common.style'

export { HeroCta } from '../HeroSection/HeroSection.style'

export const CtaSection = styled.section`
  position: relative;
  text-align: center;
  ${homeResponsiveSpace('padding: 140px 60px;', 'padding: 80px 32px;', 'padding: 64px 20px;')}
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  z-index: 0;
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
  ${homeResponsiveFont('56px', '42px', '24px')}
  font-weight: 900;
  ${homeResponsiveSpace('margin-bottom: 20px;', 'margin-bottom: 20px;', 'margin-bottom: 0px;')}
  letter-spacing: -2px;
  white-space: nowrap;
`

export const CtaText = styled.p`
  ${homeResponsiveFont('18px', '16px', '14px')}
  color: ${theme.colors.gray[400]};
  ${homeResponsiveSpace('margin-bottom: 48px;', 'margin-bottom: 36px;', 'margin: 6px 0 12px 0;')}
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
