import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export {
  Section,
  SectionBadge,
  SectionHeader,
  SectionTitle,
} from '../../pages/styles/HomePage.common.style'

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 1fr;
  }
`

export const ValueCard = styled.div`
  text-align: center;
  padding: 60px 40px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
`

export const ValueIcon = styled.div`
  font-size: 56px;
  margin-bottom: 24px;
`

export const ValueTitle = styled.h3`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
`

export const ValueText = styled.p`
  font-size: 16px;
  color: ${theme.colors.gray[400]};
  line-height: 1.8;
`
