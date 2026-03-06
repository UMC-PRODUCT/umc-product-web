import type { HTMLAttributes, ReactNode } from 'react'

import type { TypoToken } from '@/shared/types/typo'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Loading from '@/shared/ui/common/Loading/Loading'

import {
  contentStyle,
  descriptionStyle,
  detailTextStyle,
  errorIconStyle,
  getErrorContainerStyle,
  getRetryButtonStyle,
  hintStyle,
  loadingContainerStyle,
  titleStyle,
} from './FeedbackState.style'

type FeedbackStateProps = {
  mode: 'loading' | 'error'
  loadingLabel?: ReactNode
  title?: ReactNode
  description?: ReactNode
  hint?: ReactNode
  detail?: ReactNode
  onRetry?: () => void
  retryLabel?: string
  showRetryButton?: boolean
  retryButtonWidth?: number | string
  retryButtonMinWidth?: number | string
  retryButtonHeight?: number | string
  retryButtonTypo?: TypoToken
  compact?: boolean
  gap?: number
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>

const isPrimitiveText = (value: ReactNode): value is string | number =>
  typeof value === 'string' || typeof value === 'number'

const FeedbackState = ({
  mode,
  loadingLabel = '로딩 중입니다',
  title = '오류가 발생했습니다',
  description = '잠시 후 다시 시도해 주세요.',
  hint,
  detail,
  onRetry,
  retryLabel = '다시 시도',
  showRetryButton = true,
  retryButtonWidth = 300,
  retryButtonMinWidth = 140,
  retryButtonHeight = 40,
  retryButtonTypo,
  compact = false,
  gap,
  children,
  ...rest
}: FeedbackStateProps) => {
  if (mode === 'loading') {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        height="100%"
        width="100%"
        gap={gap ?? 18}
        css={loadingContainerStyle}
        {...rest}
      >
        <Loading label={loadingLabel} />
        {children}
      </Flex>
    )
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={compact ? 10 : 14}
      css={getErrorContainerStyle(compact)}
      {...rest}
    >
      <Flex alignItems="center" justifyContent="center" width={64} height={64} css={errorIconStyle}>
        !
      </Flex>
      <Flex flexDirection="column" gap={6} css={contentStyle}>
        <span css={titleStyle}>{title}</span>
        <span css={descriptionStyle}>{description}</span>
        {hint ? <span css={hintStyle}>{hint}</span> : null}
        {detail ? (
          isPrimitiveText(detail) ? (
            <span css={detailTextStyle}>{detail}</span>
          ) : (
            detail
          )
        ) : null}
      </Flex>
      {showRetryButton ? (
        <Button
          label={retryLabel}
          tone="lime"
          variant="solid"
          typo={retryButtonTypo}
          onClick={onRetry}
          disabled={!onRetry}
          css={getRetryButtonStyle(retryButtonMinWidth, retryButtonWidth, retryButtonHeight)}
        />
      ) : null}
      {children}
    </Flex>
  )
}

export default FeedbackState
