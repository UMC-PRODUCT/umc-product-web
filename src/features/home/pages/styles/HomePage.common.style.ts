import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// 홈 페이지 전용 반응형 폰트 헬퍼
// desktop / tablet / mobile 순서로 전달해서 각 컴포넌트에서 재사용할 수 있습니다.
export const homeResponsiveFont = (desktop: string, tablet: string, mobile: string) => css`
  font-size: ${desktop};

  ${media.down(theme.breakPoints.tablet)} {
    font-size: ${tablet};
  }

  ${media.down(theme.breakPoints.mobile)} {
    font-size: ${mobile};
  }
`

export const homeResponsiveSpace = (desktop: string, tablet: string, mobile: string) => css`
  ${desktop};

  ${media.down(theme.breakPoints.tablet)} {
    ${tablet};
  }

  ${media.down(theme.breakPoints.mobile)} {
    ${mobile};
  }
`

export const Page = styled.div`
  background: ${theme.colors.black};
  color: ${theme.colors.white};
  line-height: 1.6;
  max-width: 100vw;
  overflow-x: hidden;
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  scroll-behavior: smooth;

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: ${theme.colors.lime};
    color: ${theme.colors.black};
  }
`

export const Section = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  ${homeResponsiveSpace('padding: 140px 60px;', 'padding: 80px 32px;', 'padding: 64px 30px;')}
`

export const SectionHeader = styled.div`
  text-align: center;
  ${homeResponsiveSpace('margin-bottom: 100px;', 'margin-bottom: 72px;', 'margin-bottom: 52px;')}
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
`

export const SectionBadge = styled.div`
  ${homeResponsiveFont('17px', '15px', '13px')}
  font-weight: 700;
  color: ${theme.colors.lime};
  letter-spacing: 2px;
  ${homeResponsiveSpace('margin-bottom: 24px;', 'margin-bottom: 18px;', 'margin-bottom: 14px;')}
  text-transform: uppercase;
`

export const SectionTitle = styled.h2`
  ${homeResponsiveFont('64px', '48px', '34px')}
  font-weight: 900;
  line-height: 1.2;
  ${homeResponsiveSpace('margin-bottom: 24px;', 'margin-bottom: 18px;', 'margin-bottom: 14px;')}
  letter-spacing: -2px;
  margin-top: 0;
`

export const SectionDescription = styled.p`
  ${homeResponsiveFont('18px', '16px', '14px')}
  color: ${theme.colors.gray[400]};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
`

export const FullWidthSection = styled.section`
  ${homeResponsiveSpace('padding: 140px 0;', 'padding: 80px 0;', 'padding: 64px 20px;')}
  overflow: hidden;
`

export const FullWidthHeader = styled(SectionHeader)`
  ${homeResponsiveSpace('padding: 0 60px;', 'padding: 0 32px;', 'padding: 0 20px;')}
`

export const ScrollWrapper = styled.div<{ $paused?: boolean }>`
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: ${({ $paused }) => ($paused ? 'grab' : 'auto')};

  &::-webkit-scrollbar {
    display: none;
  }

  &:active {
    cursor: ${({ $paused }) => ($paused ? 'grabbing' : 'auto')};
  }
`

export const Reveal = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 0.8s forwards;
`

export const RevealDelay = styled.div<{ $delay?: number }>`
  opacity: 0;
  animation: ${fadeInUp} 0.8s forwards;
  animation-delay: ${({ $delay }) => ($delay ? `${$delay}s` : '0s')};
`
