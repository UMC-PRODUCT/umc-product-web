import FeedbackState from '@/shared/ui/common/FeedbackState/FeedbackState'
import Section from '@/shared/ui/common/Section/Section'

type ServerErrorCardProps = {
  errorStatus?: number
  errorMessage: string
  onRetry?: () => void
  message?: string
  description?: string
}

const ServerErrorCard = ({
  errorStatus,
  errorMessage,
  onRetry,
  message,
  description,
}: ServerErrorCardProps) => {
  const isServerMaintenance = errorStatus === 500
  const title = message ?? (isServerMaintenance ? '서버 점검 안내' : '데이터 로딩 실패')
  const helperText =
    description ??
    (isServerMaintenance
      ? '현재 서버 점검으로 인해 요청을 처리할 수 없습니다.'
      : '네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.')
  const detailText = isServerMaintenance
    ? '서버 점검중입니다. 잠시후에 다시 시도해주세요.'
    : errorMessage

  return (
    <Section maxHeight={504} gap={10} padding="24px 16px">
      <FeedbackState
        mode="error"
        compact
        title={title}
        description={helperText}
        detail={detailText}
        onRetry={onRetry}
        retryLabel="다시 시도"
        retryButtonTypo="B4.Md"
        retryButtonWidth={280}
      />
    </Section>
  )
}

export default ServerErrorCard
