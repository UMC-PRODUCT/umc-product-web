import { useState } from 'react'

import Logo from '@shared/assets/umc_gray.svg?react'
import Flex from '@shared/ui/common/Flex/Flex'

import { FOOTER_INFO } from '@/shared/constants/umc'
import PrivacyTerm from '@/shared/ui/modals/terms/PrivacyTerm'
import ServiceTerm from '@/shared/ui/modals/terms/ServiceTerm'

import * as S from './Footer.style'

type ModalType = 'service' | 'privacy' | null

const Footer = () => {
  const [openModal, setOpenModal] = useState<ModalType>(null)
  const closeModal = () => setOpenModal(null)

  return (
    <S.FooterContainer>
      <Logo />
      <Flex gap="6px" flexDirection="column">
        <S.UmcInfo gap="10px" alignItems="flex-start">
          <S.Content>
            UMC {FOOTER_INFO.generation}th 총괄 : {FOOTER_INFO.master}{' '}
          </S.Content>
          <S.TextDivider className="divider" />
          <S.Content>이메일 : {FOOTER_INFO.email}</S.Content>
        </S.UmcInfo>
        <Flex gap="10px">
          <S.Content onClick={() => setOpenModal('service')} css={{ cursor: 'pointer' }}>
            서비스이용약관
          </S.Content>
          <S.TextDivider />
          <S.Content onClick={() => setOpenModal('privacy')} css={{ cursor: 'pointer' }}>
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

      {openModal === 'service' && <ServiceTerm onClose={closeModal} />}
      {openModal === 'privacy' && <PrivacyTerm onClose={closeModal} />}
    </S.FooterContainer>
  )
}

export default Footer
