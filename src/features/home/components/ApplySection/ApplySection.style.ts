import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

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
  gap: 60px;
  padding: 40px 0;
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
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

export const TimelineDate = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${theme.colors.lime};
  letter-spacing: 1px;
  text-transform: uppercase;
`

export const TimelineTitle = styled.h3`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
  margin-top: 0;
`

export const TimelineText = styled.p`
  font-size: 16px;
  color: ${theme.colors.gray[400]};
  line-height: 1.8;
  margin: 0;
`
