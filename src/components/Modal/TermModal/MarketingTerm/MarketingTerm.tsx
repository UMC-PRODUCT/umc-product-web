import TermModalLayout from '@/components/modal/TermModal/TermModalLayout'
import marketingTermContent from '@/constants/marketingTerm.md?raw'

export default function MarketingTerm({ onClose }: { onClose: () => void }) {
  return (
    <TermModalLayout
      title="마케팅 이용약관"
      content={marketingTermContent}
      onClose={onClose}
    />
  )
}
