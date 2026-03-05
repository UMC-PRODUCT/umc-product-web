import { useTerms } from '@/features/auth/hooks/register/useTerms'
import SharedFooter from '@/shared/layout/Footer/Footer'

const Footer = () => {
  const { data: serviceData } = useTerms({ termsType: 'SERVICE' })
  const { data: privacyData } = useTerms({ termsType: 'PRIVACY' })

  return (
    <SharedFooter
      serviceTermsLink={serviceData?.result.link}
      privacyTermsLink={privacyData?.result.link}
    />
  )
}

export default Footer
