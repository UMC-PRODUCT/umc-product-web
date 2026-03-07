import type { ReactNode } from 'react'

import FeedbackState from '@/shared/ui/common/FeedbackState/FeedbackState'

type ErrorPageProps = {
  title?: ReactNode
  description?: ReactNode
  hint?: ReactNode
  detail?: ReactNode
  onRetry?: () => void
  retryLabel?: string
  compact?: boolean
  showRetryButton?: boolean
}

const ErrorPage = ({
  title = '오류가 발생했습니다',
  description = '잠시 후 다시 시도해 주세요.',
  hint,
  detail,
  onRetry,
  retryLabel = '다시 시도',
  compact = false,
  showRetryButton = true,
}: ErrorPageProps) => (
  <FeedbackState
    mode="error"
    title={title}
    description={description}
    hint={hint}
    detail={detail}
    onRetry={onRetry}
    retryLabel={retryLabel}
    compact={compact}
    showRetryButton={showRetryButton}
  />
)

export default ErrorPage
