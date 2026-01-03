import TermModalLayout from '@/components/modal/TermModal/TermModalLayout'
import serviceTermContent from '@/constants/serviceTerm.md?raw'

export default function ServiceTerm({ onClose }: { onClose: () => void }) {
  return (
    <TermModalLayout
      title="서비스이용약관"
      content={serviceTermContent}
      onClose={onClose}
    />
  )
}
