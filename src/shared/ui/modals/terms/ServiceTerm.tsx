import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
  content: string
}

const ServiceTerm = ({ content, onClose }: TermModalProps) => {
  return <TermModalLayout title="서비스이용약관" content={content} onClose={onClose} />
}

export default ServiceTerm
