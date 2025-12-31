import Modal from '../Modal'
import TermModalLayout from '../TermModalLayout'
import marketingTermContent from '@/constants/privacyTerm.md?raw'

export default function MarketingTerm({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <TermModalLayout
        title="마케팅 이용약관"
        content={marketingTermContent}
      ></TermModalLayout>
    </Modal>
  )
}
