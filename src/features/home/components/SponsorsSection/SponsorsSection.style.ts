import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

import { homeResponsiveFont, homeResponsiveSpace } from '../../pages/styles/HomePage.common.style'

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
  ${homeResponsiveSpace('gap: 30px;', 'gap: 20px;', 'gap: 16px;')}
  ${homeResponsiveSpace('margin-bottom: 40px;', 'margin-bottom: 32px;', 'margin-bottom: 24px;')}
  opacity: 0;
  transition: all 0.8s ease-out;
  height: 200px;
  max-width: 600px;

  ${media.down('1200px')} {
    max-width: 550px;
    gap: 25px;
  }

  ${media.down(theme.breakPoints.tablet)} {
    height: 180px;
  }

  ${media.down(theme.breakPoints.mobile)} {
    height: 100px;
  }

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

  ${media.down(theme.breakPoints.tablet)} {
    width: 120px;
    height: 120px;
  }
  ${media.down(theme.breakPoints.mobile)} {
    width: 64px;
    height: 64px;
  }
`

export const SponsorInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const SponsorName = styled.h3`
  ${homeResponsiveFont('24px', '22px', '20px')}
  font-weight: 800;
  ${homeResponsiveSpace('margin-bottom: 8px;', 'margin-bottom: 7px;', 'margin-bottom: 6px;')}
  letter-spacing: -0.5px;
  color: ${theme.colors.white};
`

export const SponsorText = styled.p`
  ${homeResponsiveFont('13px', '12px', '11px')}
  color: ${theme.colors.gray[400]};
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 0;
`
