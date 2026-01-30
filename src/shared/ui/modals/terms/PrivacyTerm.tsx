import AsyncBoundary from '@/shared/components/AsyncBoundary/AsyncBoundary'
import { useGetTerm } from '@/shared/hooks/useGetTerm'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const PrivacyTermContent = ({ onClose }: TermModalProps) => {
  const { data } = useGetTerm({ termsType: 'PRIVACY' })
  return <TermModalLayout title={data.title} content={data.content} onClose={onClose} />
}

const PrivacyTerm = (props: TermModalProps) => (
  <AsyncBoundary
    fallback={<SuspenseFallback label="개인정보 처리방침을 불러오는 중입니다." />}
    errorFallback={(error, reset) => (
      <ErrorPage
        title="개인정보 처리방침을 불러오는 중 오류가 발생했습니다."
        description={error.message || '잠시 후 다시 시도해 주세요.'}
        onRetry={reset}
      />
    )}
  >
    <PrivacyTermContent {...props} />
  </AsyncBoundary>
)

export default PrivacyTerm
