import Modal from '@/components/common/Modal/Modal'
import TermModalLayout from '@/components/Modal/TermModal/TermModalLayout'
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
