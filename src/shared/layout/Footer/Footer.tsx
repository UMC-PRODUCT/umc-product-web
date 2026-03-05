import Logo from '@/shared/assets/umc_gray.svg?react'
import { FOOTER_INFO } from '@/shared/constants/umc'
import Flex from '@/shared/ui/common/Flex/Flex'

import * as S from './Footer.style'

type FooterProps = {
  serviceTermsLink?: string
  privacyTermsLink?: string
}

const openExternalLink = (link?: string) => {
  if (!link) return
  window.open(link, '_blank', 'noopener,noreferrer')
}

const Footer = ({ serviceTermsLink, privacyTermsLink }: FooterProps) => {
  return (
    <S.FooterContainer>
      <Logo />
      <Flex gap="6px" flexDirection="column">
        <S.UmcInfo gap="10px" alignItems="flex-start">
          <S.Content>
            UMC {FOOTER_INFO.gisu}th 총괄 : {FOOTER_INFO.master}{' '}
          </S.Content>
          <S.TextDivider className="divider" />
          <S.Content
            onClick={() => (window.location.href = `mailto:${FOOTER_INFO.email}`)}
            css={{ cursor: 'pointer' }}
          >
            이메일 : {FOOTER_INFO.email}
          </S.Content>
        </S.UmcInfo>
        <Flex gap="10px">
          <S.Content
            onClick={() => openExternalLink(serviceTermsLink)}
            css={{ cursor: serviceTermsLink ? 'pointer' : 'default' }}
          >
            서비스이용약관
          </S.Content>
          <S.TextDivider />
          <S.Content
            onClick={() => openExternalLink(privacyTermsLink)}
            css={{ cursor: privacyTermsLink ? 'pointer' : 'default' }}
          >
            개인정보처리방침
          </S.Content>
        </Flex>
      </Flex>
      <Flex gap="0px" flexDirection="column">
        <Flex gap="10px">
          <S.Content>Copyright © UMC </S.Content>
        </Flex>
        <Flex gap="10px">
          <S.Content>All rights reserved.</S.Content>
        </Flex>
      </Flex>
    </S.FooterContainer>
  )
}

export default Footer
