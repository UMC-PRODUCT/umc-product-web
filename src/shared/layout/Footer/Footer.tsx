import Logo from '@/shared/assets/umc_gray.svg?react'
import { FOOTER_INFO } from '@/shared/constants/umc'
import Flex from '@/shared/ui/common/Flex/Flex'

import * as S from './Footer.style'

type FooterProps = {
  serviceTermsLink?: string
  privacyTermsLink?: string
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
          <S.ContentLink href={`mailto:${FOOTER_INFO.email}`}>
            이메일 : {FOOTER_INFO.email}
          </S.ContentLink>
        </S.UmcInfo>
        <Flex gap="10px">
          {serviceTermsLink ? (
            <S.ContentLink href={serviceTermsLink} target="_blank" rel="noopener noreferrer">
              서비스이용약관
            </S.ContentLink>
          ) : (
            <S.Content>서비스이용약관</S.Content>
          )}
          <S.TextDivider />
          {privacyTermsLink ? (
            <S.ContentLink href={privacyTermsLink} target="_blank" rel="noopener noreferrer">
              개인정보처리방침
            </S.ContentLink>
          ) : (
            <S.Content>개인정보처리방침</S.Content>
          )}
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
