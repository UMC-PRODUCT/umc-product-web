import serviceTermContent from '@/shared/constants/terms/serviceTerm.md?raw'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const ServiceTerm = ({ onClose }: TermModalProps) => {
  return <TermModalLayout title="서비스이용약관" content={serviceTermContent} onClose={onClose} />
}

export default ServiceTerm
