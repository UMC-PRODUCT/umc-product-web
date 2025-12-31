import Modal from '@/components/common/Modal/Modal'

import serviceTermContent from '@/constants/serviceTerm.md?raw'
import TermModalLayout from '@/components/Modal/TermModal/TermModalLayout'

export default function ServiceTerm({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <TermModalLayout title="서비스이용약관" content={serviceTermContent} />
    </Modal>
  )
}
