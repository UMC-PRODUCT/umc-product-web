import { termsKeys } from '@/features/auth/domain/queryKeys'
import type { TermsResponseDTO } from '@/shared/api/terms'
import { getTermsId } from '@/shared/api/terms'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const ServiceTerm = ({ onClose }: TermModalProps) => {
  const serviceQueryKey = termsKeys.detail('SERVICE').queryKey
  const { data, isLoading, error } = useCustomQuery<TermsResponseDTO, Error>(
    serviceQueryKey,
    () => getTermsId({ termsType: 'SERVICE' }),
    { retry: false },
  )

  return (
    <TermModalLayout
      title={data?.title ?? '서비스이용약관'}
      content={data?.content}
      onClose={onClose}
      isLoading={isLoading}
      error={error?.message}
    />
  )
}

export default ServiceTerm
