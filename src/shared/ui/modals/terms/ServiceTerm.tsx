import AsyncBoundary from '@/shared/components/AsyncBoundary/AsyncBoundary'
import { useGetTerm } from '@/shared/hooks/useGetTerm'
import { Button } from '@/shared/ui/common/Button'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const ServiceTermContent = ({ onClose }: TermModalProps) => {
  const { data } = useGetTerm({ termsType: 'SERVICE' })
  return <TermModalLayout title={data.title} content={data.content} onClose={onClose} />
}

const ServiceTerm = (props: TermModalProps) => (
  <AsyncBoundary
    fallback={<SuspenseFallback label="서비스 약관을 불러오는 중입니다." />}
    errorFallback={(error, reset) => (
      <SuspenseFallback label="서비스 약관을 불러오는 중 오류가 발생했습니다." gap={12}>
        <span>{error.message || '잠시 후 다시 시도해 주세요.'}</span>
        <Button label="다시 시도" tone="lime" onClick={reset} />
      </SuspenseFallback>
    )}
  >
    <ServiceTermContent {...props} />
  </AsyncBoundary>
)

export default ServiceTerm
