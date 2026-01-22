import type { TermsResponseDTO } from '@/features/auth/domain/api'
import { getTermsId } from '@/features/auth/domain/api'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { termsKeys } from '@/shared/queryKeys/terms'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const MarketingTerm = ({ onClose }: TermModalProps) => {
  const marketingQueryKey = termsKeys.detail('MARKETING').queryKey
  const { data, isLoading, error } = useCustomQuery<TermsResponseDTO, Error>(
    marketingQueryKey,
    () => getTermsId({ termsType: 'MARKETING' }),
    { retry: false },
  )

  return (
    <TermModalLayout
      title={data?.title ?? '마케팅 이용약관'}
      content={data?.content}
      onClose={onClose}
      isLoading={isLoading}
      error={error?.message}
    />
  )
}

export default MarketingTerm
