import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'

import { containerStyle, detailStyle } from './ErrorFallback.style'

interface ErrorFallbackProps {
  error?: Error
  resetErrorBoundary?: () => void
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div css={containerStyle}>
      <ErrorPage
        title="문제가 발생했습니다"
        description="페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        detail={error?.message ? <p css={detailStyle}>{error.message}</p> : undefined}
        onRetry={resetErrorBoundary}
        showRetryButton={Boolean(resetErrorBoundary)}
      />
    </div>
  )
}

export default ErrorFallback
