import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Stats = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 100px 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: repeat(1, 1fr);
    gap: 40px;
    padding: 60px 32px;
  }
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
  font-size: 72px;
  font-weight: 900;
  color: ${theme.colors.lime};
  line-height: 1;
  margin-bottom: 16px;
  letter-spacing: -3px;
`

export const StatLabel = styled.div`
  font-size: 15px;
  color: ${theme.colors.gray[400]};
  font-weight: 500;
`
