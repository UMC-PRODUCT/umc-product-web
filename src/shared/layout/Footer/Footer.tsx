import Logo from '@shared/assets/umc_gray.svg?react'
import Flex from '@shared/ui/common/Flex/Flex'

import * as S from './Footer.style'

export default function Footer() {
  return (
    <S.FooterContainer>
      <Logo />
      <Flex gap="6px" flexDirection="column">
        <Flex gap="10px">
          <S.Content>UMC 10th 총괄 : 성이름 </S.Content>
          <S.TextDivider />
          <S.Content>이메일 : email10@gmail.com</S.Content>
        </Flex>
        <Flex gap="10px">
          <S.Content>서비스이용약관</S.Content>
          <S.TextDivider />
          <S.Content>개인정보처리방침</S.Content>
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
