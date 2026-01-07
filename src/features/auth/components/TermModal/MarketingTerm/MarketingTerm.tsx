import marketingTermContent from '@features/auth/constants/terms/marketingTerm.md?raw'

import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

export default function MarketingTerm({ onClose }: { onClose: () => void }) {
  return (
    <TermModalLayout title="마케팅 이용약관" content={marketingTermContent} onClose={onClose} />
  )
}
