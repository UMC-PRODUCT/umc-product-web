import { termsKeys } from '@/features/auth/domain/queryKeys'
import type { TermsResponseDTO } from '@/shared/api/terms'
import { getTermsId } from '@/shared/api/terms'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const MarketingTerm = ({ onClose }: TermModalProps) => {
  const queryKey = termsKeys.detail('MARKETING').queryKey
  const { data, isLoading, error } = useCustomQuery<TermsResponseDTO, Error>(
    queryKey,
    () => getTermsId({ termsType: 'MARKETING' }),
    { retry: false },
  )

  return (
    <TermModalLayout
      title={data?.result.title ?? '마케팅 이용약관'}
      content={data?.result.content}
      onClose={onClose}
      isLoading={isLoading}
      error={error?.message}
    />
  )
}

export default MarketingTerm
