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

export const Timeline = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

export const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  ${homeResponsiveSpace('gap: 60px;', 'gap: 16px;', 'gap: 10px;')}
  ${homeResponsiveSpace('padding: 40px 0;', 'padding: 28px 0;', 'padding: 20px 0;')}
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s ease-out;

  &.animate {
    opacity: 1;
    transform: translateX(0);
  }

  &:last-child {
    border-bottom: none;
  }

  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 140px 1fr;
  }
  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 120px 1fr;
  }
`

export const TimelineDate = styled.div`
  ${homeResponsiveFont('14px', '13px', '12px')}
  font-weight: 700;
  color: ${theme.colors.lime};
  letter-spacing: 1px;
  text-transform: uppercase;
`

export const TimelineTitle = styled.h3`
  ${homeResponsiveFont('24px', '20px', '18px')}
  font-weight: 800;
  ${homeResponsiveSpace('margin-bottom: 12px;', 'margin-bottom: 10px;', 'margin-bottom: 8px;')}
  letter-spacing: -0.5px;
  margin-top: 0;
`

export const TimelineText = styled.p`
  ${homeResponsiveFont('16px', '15px', '14px')}
  color: ${theme.colors.gray[400]};
  line-height: 1.8;
  margin: 0;
`
