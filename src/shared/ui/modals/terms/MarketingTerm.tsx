import { useGetTerm } from '@/shared/hooks/useGetTerm'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const MarketingTermContent = ({ onClose }: TermModalProps) => {
  const { data } = useGetTerm({ termsType: 'MARKETING' })
  return <TermModalLayout title={data.title} content={data.content} onClose={onClose} />
}

const MarketingTerm = (props: TermModalProps) => (
  <AsyncBoundary
    fallback={<SuspenseFallback label="마케팅 약관을 불러오는 중입니다." />}
    errorFallback={(error, reset) => (
      <ErrorPage
        title="마케팅 약관을 불러오는 중 오류가 발생했습니다."
        description={error.message || '잠시 후 다시 시도해 주세요.'}
        onRetry={reset}
      />
    )}
  >
    <MarketingTermContent {...props} />
  </AsyncBoundary>
)

export default MarketingTerm
