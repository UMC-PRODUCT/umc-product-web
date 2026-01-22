import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
  content: string
}

const MarketingTerm = ({ onClose, content }: TermModalProps) => {
  return <TermModalLayout title="마케팅 이용약관" content={content} onClose={onClose} />
}

export default MarketingTerm
