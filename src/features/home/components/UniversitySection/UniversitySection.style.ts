import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const UniversitySection = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 140px 60px;
  display: flex;
  flex-direction: column;
  gap: 92px;

  ${media.down(theme.breakPoints.tablet)} {
    padding: 80px 0px;
  }
`

const marqueeLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

const marqueeRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`

export const UniversityList = styled.div`
  margin-top: 40px;
  display: grid;
  gap: 20px;
  overflow: hidden;
`

export const UniversityRow = styled.div<{ $direction?: 'left' | 'right' }>`
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);

  ${media.down(theme.breakPoints.tablet)} {
    mask-image: none;
    -webkit-mask-image: none;
  }

  .track {
    display: flex;
    gap: 32px;
    width: max-content;
    animation: ${({ $direction }) => ($direction === 'right' ? marqueeRight : marqueeLeft)} 30s
      linear infinite;
  }
`

export const UniversityItem = styled.div`
  min-width: 172px;
  height: 68px;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background: ${theme.colors.gray[800]};
  color: ${theme.colors.gray[400]};
  gap: 14px;
  font-size: 18px;
  font-weight: 600;

  img {
    max-height: 40px;
    max-width: 40px;
    object-fit: contain;
    display: block;
    border-radius: 6px;
  }
`
