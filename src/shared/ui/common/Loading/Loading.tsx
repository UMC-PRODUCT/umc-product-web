import type { HTMLAttributes, ReactNode } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.span<{ $inline: boolean; $gap: number }>`
  display: inline-flex;
  flex-direction: ${({ $inline }) => ($inline ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
  gap: ${({ $gap }) => `${$gap}px`};
`

const Spinner = styled.span<{
  $size: number
  $borderWidth: number
  $borderColor: string
  $highlightColor: string
}>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border: ${({ $borderWidth, $borderColor }) => `${$borderWidth}px solid ${$borderColor}`};
  border-top-color: ${({ $highlightColor }) => $highlightColor};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  display: inline-flex;
`

const Label = styled.span<{ $color?: string }>`
  color: ${({ $color }) => $color ?? theme.colors.gray[300]};
  ${theme.typography.B4.Rg};
`

type LoadingProps = {
  size?: number
  borderWidth?: number
  borderColor?: string
  spinnerColor?: string
  label?: ReactNode
  labelPlacement?: 'bottom' | 'right'
  labelColor?: string
  gap?: number
} & Omit<HTMLAttributes<HTMLSpanElement>, 'color'>

const Loading = ({
  size = 36,
  borderWidth = 3,
  borderColor = 'rgba(255, 255, 255, 0.25)',
  spinnerColor = theme.colors.lime,
  label,
  labelPlacement = 'bottom',
  labelColor,
  gap = 8,
  className,
  'aria-label': ariaLabel,
  'aria-live': ariaLive,
  ...restProps
}: LoadingProps) => {
  const inline = labelPlacement === 'right'
  const statusLabel = ariaLabel ?? (label ? undefined : '로딩 중입니다')

  return (
    <Wrapper
      $inline={inline}
      $gap={gap}
      className={className}
      role="status"
      aria-live={ariaLive ?? 'polite'}
      aria-label={statusLabel}
      {...restProps}
    >
      <Spinner
        $size={size}
        $borderWidth={borderWidth}
        $borderColor={borderColor}
        $highlightColor={spinnerColor}
      />
      {label && (
        <Label $color={labelColor} aria-hidden={Boolean(statusLabel && !label)}>
          {label}
        </Label>
      )}
    </Wrapper>
  )
}

export default Loading
