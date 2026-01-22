import type { TermsResponseDTO } from '@/features/auth/domain/api'
import { getTermsId } from '@/features/auth/domain/api'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { termsKeys } from '@/shared/queryKeys/queryKey'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const PrivacyTerm = ({ onClose }: TermModalProps) => {
  const privacyQueryKey = termsKeys.detail('PRIVACY').queryKey
  const { data, isLoading, error } = useCustomQuery<TermsResponseDTO, Error>(
    privacyQueryKey,
    () => getTermsId({ termsType: 'PRIVACY' }),
    { retry: false },
  )

  return (
    <TermModalLayout
      title={data?.title ?? '개인정보 처리방침'}
      content={data?.content}
      onClose={onClose}
      isLoading={isLoading}
      error={error?.message}
    />
  )
}

export default PrivacyTerm
