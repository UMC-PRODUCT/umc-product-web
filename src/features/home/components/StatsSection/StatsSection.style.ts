import styled from '@emotion/styled'

import {
  homeResponsiveFont,
  homeResponsiveSpace,
} from '@/features/home/pages/styles/HomePage.common.style'
import { theme } from '@/shared/styles/theme'

export const Stats = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  ${homeResponsiveSpace('padding: 100px 60px;', 'padding: 60px 32px;', 'padding: 48px 20px;')}
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  ${homeResponsiveSpace('gap: 60px;', 'gap: 40px;', 'gap: 28px;')}
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`

export const StatItem = styled.div`
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
`

export const StatNumber = styled.div`
  ${homeResponsiveFont('72px', '56px', '28px')}
  font-weight: 900;
  color: ${theme.colors.lime};
  line-height: 1;
  ${homeResponsiveSpace('margin-bottom: 16px;', 'margin-bottom: 12px;', 'margin-bottom: 8px;')}
  letter-spacing: -3px;
`

export const StatLabel = styled.div`
  ${homeResponsiveFont('15px', '14px', '12px')}
  color: ${theme.colors.gray[400]};
  font-weight: 500;
  white-space: nowrap;
`
