import TermModalLayout from '@features/auth/components/TermModal/TermModalLayout'
import marketingTermContent from '@features/auth/constants/terms/marketingTerm.md?raw'

export default function MarketingTerm({ onClose }: { onClose: () => void }) {
  return (
    <TermModalLayout title="마케팅 이용약관" content={marketingTermContent} onClose={onClose} />
  )
}
