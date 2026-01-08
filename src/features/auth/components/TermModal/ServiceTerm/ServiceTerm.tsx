import serviceTermContent from '@features/auth/constants/terms/serviceTerm.md?raw'

import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

export default function ServiceTerm({ onClose }: { onClose: () => void }) {
  return <TermModalLayout title="서비스이용약관" content={serviceTermContent} onClose={onClose} />
}
