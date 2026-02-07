import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export {
  Section,
  SectionBadge,
  SectionHeader,
  SectionTitle,
} from '../../pages/styles/HomePage.common.style'

export const SponsorsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

export const SponsorRow = styled.div<{ $direction?: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
  opacity: 0;
  transition: all 0.8s ease-out;
  height: 200px;
  max-width: 600px;
  ${({ $direction }) =>
    $direction === 'left'
      ? `
    transform: translateX(50px);
    margin-left: 0;
    margin-right: auto;
  `
      : `
    transform: translateX(-50px);
    margin-left: auto;
    margin-right: 0;
    flex-direction: row-reverse;
  `}

  &.animate {
    opacity: 1;
    transform: translateX(0);
  }

  ${media.down('1200px')} {
    max-width: 550px;
    gap: 25px;
  }

  ${media.down(theme.breakPoints.tablet)} {
    flex-direction: column !important;
    gap: 20px;
    margin-bottom: 40px;
    height: auto;
    max-width: 100%;
    margin-left: auto !important;
    margin-right: auto !important;
    text-align: center;
  }
`

export const SponsorLogoContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;
  overflow: hidden;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 5px 40px rgba(149, 239, 75, 0.2);
  }

  ${media.down('1200px')} {
    width: 140px;
    height: 140px;
  }

  ${media.down(theme.breakPoints.tablet)} {
    width: 120px;
    height: 120px;
  }
`

export const SponsorInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const SponsorName = styled.h3`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  color: ${theme.colors.white};

  ${media.down('1200px')} {
    font-size: 22px;
  }

  ${media.down(theme.breakPoints.tablet)} {
    font-size: 20px;
  }
`

export const SponsorText = styled.p`
  font-size: 13px;
  color: ${theme.colors.gray[400]};
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 0;

  ${media.down('1200px')} {
    font-size: 12px;
  }

  ${media.down(theme.breakPoints.tablet)} {
    font-size: 13px;
  }
`
