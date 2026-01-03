import TermModalLayout from '@/components/modal/TermModal/TermModalLayout'
import privacyTermContent from '@/constants/privacyTerm.md?raw'

export default function PrivacyTerm({ onClose }: { onClose: () => void }) {
  return (
    <TermModalLayout
      title="개인정보 처리방침"
      content={privacyTermContent}
      onClose={onClose}
    />
  )
}
