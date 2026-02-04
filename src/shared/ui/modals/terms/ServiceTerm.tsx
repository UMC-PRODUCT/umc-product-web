import { useGetTerm } from '@/shared/hooks/useGetTerm'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import Loading from '@/shared/ui/common/Loading/Loading'
import TermModalLayout, { TermMarkdown } from '@/shared/ui/modals/TermModalLayout/TermModalLayout'
import * as S from '@/shared/ui/modals/TermModalLayout/TermModalLayout.style'

type TermModalProps = {
  onClose: () => void
}

const ServiceTermContent = () => {
  const { data } = useGetTerm({ termsType: 'SERVICE' })
  return <TermMarkdown content={data.content} />
}

const ServiceTerm = ({ onClose }: TermModalProps) => (
  <TermModalLayout title="서비스 약관" onClose={onClose}>
    <AsyncBoundary
      fallback={
        <S.StatusWrapper>
          <Loading
            size={32}
            borderWidth={3}
            spinnerColor="#92F204"
            label="서비스 약관을 불러오는 중입니다."
            labelColor="#d1d5db"
          />
        </S.StatusWrapper>
      }
      errorFallback={(error, reset) => (
        <ErrorPage
          title="서비스 약관을 불러오는 중 오류가 발생했습니다."
          description={error.message || '잠시 후 다시 시도해 주세요.'}
          onRetry={reset}
        />
      )}
    >
      <ServiceTermContent />
    </AsyncBoundary>
  </TermModalLayout>
)

export default ServiceTerm
