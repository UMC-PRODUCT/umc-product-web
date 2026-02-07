import { keyframes } from '@emotion/react'
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
  padding: 140px 60px;

  ${media.down(theme.breakPoints.tablet)} {
    padding: 80px 32px;
  }
`

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 100px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
`

export const SectionBadge = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: ${theme.colors.lime};
  letter-spacing: 2px;
  margin-bottom: 24px;
  text-transform: uppercase;
`

export const SectionTitle = styled.h2`
  font-size: 64px;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 24px;
  letter-spacing: -2px;
  margin-top: 0;
  ${media.down('1200px')} {
    font-size: 48px;
  }
`

export const SectionDescription = styled.p`
  font-size: 18px;
  color: ${theme.colors.gray[400]};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
`

export const FullWidthSection = styled.section`
  padding: 140px 0;
  overflow: hidden;

  ${media.down(theme.breakPoints.tablet)} {
    padding: 80px 0;
  }
`

export const FullWidthHeader = styled(SectionHeader)`
  padding: 0 60px;

  ${media.down(theme.breakPoints.tablet)} {
    padding: 0 32px;
  }
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
