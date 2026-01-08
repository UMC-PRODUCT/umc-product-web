import marketingTermContent from '@/shared/constants/terms/marketingTerm.md?raw'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const MarketingTerm = ({ onClose }: TermModalProps) => {
  return (
    <TermModalLayout title="마케팅 이용약관" content={marketingTermContent} onClose={onClose} />
  )
}

export default MarketingTerm
