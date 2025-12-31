import Modal from '../Modal'
import TermModalLayout from '../TermModalLayout'
import privacyTermContent from '@/constants/privacyTerm.md?raw'

export default function PrivacyTerm({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <TermModalLayout
        title="개인정보 처리방침"
        content={privacyTermContent}
      ></TermModalLayout>
    </Modal>
  )
}
