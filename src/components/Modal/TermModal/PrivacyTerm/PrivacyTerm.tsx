import Modal from '@/components/common/Modal/Modal'
import TermModalLayout from '@/components/Modal/TermModal/TermModalLayout'
import privacyTermContent from '@/constants/privacyTerm.md?raw'

export default function PrivacyTerm({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <TermModalLayout
        title="개인정보 처리방침"
        content={privacyTermContent}
        onClose={onClose}
      />
    </Modal>
  )
}
