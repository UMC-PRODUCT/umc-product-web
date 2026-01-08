import privacyTermContent from '@features/auth/constants/terms/privacyTerm.md?raw'

import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

export default function PrivacyTerm({ onClose }: { onClose: () => void }) {
  return (
    <TermModalLayout title="개인정보 처리방침" content={privacyTermContent} onClose={onClose} />
  )
}
