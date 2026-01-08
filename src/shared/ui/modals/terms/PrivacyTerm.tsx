import privacyTermContent from '@/shared/constants/terms/privacyTerm.md?raw'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const PrivacyTerm = ({ onClose }: TermModalProps) => {
  return (
    <TermModalLayout title="개인정보 처리방침" content={privacyTermContent} onClose={onClose} />
  )
}

export default PrivacyTerm
