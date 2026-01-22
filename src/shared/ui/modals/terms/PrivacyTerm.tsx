import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
  content: string
}

const PrivacyTerm = ({ onClose, content }: TermModalProps) => {
  return <TermModalLayout title="개인정보 처리방침" content={content} onClose={onClose} />
}

export default PrivacyTerm
