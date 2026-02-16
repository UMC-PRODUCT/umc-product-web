import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

import { homeResponsiveFont, homeResponsiveSpace } from '../../pages/styles/HomePage.common.style'

export {
  Section,
  SectionBadge,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from '../../pages/styles/HomePage.common.style'

export const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${homeResponsiveSpace('gap: 80px 120px;', 'gap: 48px;', 'gap: 28px;')}
  align-items: start;
  max-width: 1000px;
  margin: 0 auto;

  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 1fr;
  }
`

export const AboutContent = styled.div`
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
`

export const AboutTitle = styled.h3`
  ${homeResponsiveFont('32px', '28px', '24px')}
  font-weight: 800;
  ${homeResponsiveSpace('margin-bottom: 16px;', 'margin-bottom: 12px;', 'margin-bottom: 10px;')}
  letter-spacing: -1px;
`

export const AboutText = styled.p`
  ${homeResponsiveFont('17px', '16px', '10px')}
  max-width: 650px;
  color: ${theme.colors.gray[400]};
  line-height: 1.8;
  margin-bottom: 0;
`
