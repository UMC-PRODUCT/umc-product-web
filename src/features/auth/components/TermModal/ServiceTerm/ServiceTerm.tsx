import TermModalLayout from '@features/auth/components/TermModal/TermModalLayout'
import serviceTermContent from '@features/auth/constants/terms/serviceTerm.md?raw'

export default function ServiceTerm({ onClose }: { onClose: () => void }) {
  return <TermModalLayout title="서비스이용약관" content={serviceTermContent} onClose={onClose} />
}
