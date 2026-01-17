import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex/index'

export const Section = styled(Flex, {
  shouldForwardProp: (prop) => prop !== '$variant',
})<{
  $variant?: 'solid' | 'outline' | 'none' | 'both' | 'dashed'
}>`
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 38px;
  padding: 34px 38px;
  border-radius: 10px;
  ${media.down(theme.breakPoints.tablet)} {
    padding: 15px 15px;
  }

  ${({ $variant }) =>
    ($variant === 'outline' || $variant === 'solid') &&
    `border: 1px solid ${theme.colors.gray[700]};`}
  ${({ $variant }) => $variant === 'both' && `border: 1px solid ${theme.colors.gray[600]};`}

  ${({ $variant }) =>
    $variant === 'dashed' ? `border: 2px dashed ${theme.colors.gray[700]};` : ''}
  
  ${({ $variant }) =>
    $variant === 'solid' || $variant === 'both'
      ? `background-color: ${theme.colors.gray[800]};`
      : 'inherit'}
`
