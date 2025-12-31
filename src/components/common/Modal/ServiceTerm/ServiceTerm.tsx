import Modal from '../Modal'
import TermModalLayout from '../TermModalLayout'
import serviceTermContent from '@/constants/serviceTerm.md?raw'

export default function ServiceTerm({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <TermModalLayout title="서비스이용약관" content={serviceTermContent} />
    </Modal>
  )
}
