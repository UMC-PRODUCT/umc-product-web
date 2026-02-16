import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

import { homeResponsiveFont, homeResponsiveSpace } from '../../pages/styles/HomePage.common.style'

export {
  Section,
  SectionBadge,
  SectionHeader,
  SectionTitle,
} from '../../pages/styles/HomePage.common.style'

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  ${homeResponsiveSpace('gap: 40px;', 'gap: 28px;', 'gap: 8px;')}
`

export const ValueCard = styled.div`
  text-align: center;
  ${homeResponsiveSpace('padding: 60px 40px;', 'padding: 44px 28px;', 'padding: 32px 5px;')}
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
`

export const ValueIcon = styled.div`
  ${homeResponsiveFont('56px', '48px', '40px')}
  ${homeResponsiveSpace('margin-bottom: 24px;', 'margin-bottom: 18px;', 'margin-bottom: 14px;')}
`

export const ValueTitle = styled.h3`
  ${homeResponsiveFont('24px', '22px', '12px')}
  font-weight: 800;
  ${homeResponsiveSpace('margin-bottom: 16px;', 'margin-bottom: 12px;', 'margin-bottom: 10px;')}
  letter-spacing: -0.5px;
`

export const ValueText = styled.p`
  ${homeResponsiveFont('16px', '15px', '10px')}
  color: ${theme.colors.gray[400]};
  line-height: 1.8;
`
