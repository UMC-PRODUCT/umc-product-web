import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

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
  gap: 80px 120px;
  align-items: start;
  max-width: 1000px;
  margin: 0 auto;

  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 1fr;
    gap: 48px;
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
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -1px;
`

export const AboutText = styled.p`
  font-size: 17px;
  max-width: 650px;
  color: ${theme.colors.gray[400]};
  line-height: 1.8;
  margin-bottom: 0;
`
