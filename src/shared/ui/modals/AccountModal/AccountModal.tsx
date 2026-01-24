import Close from '@shared/assets/icons/close.svg?react'
import AppleIcon from '@shared/assets/social/apple.svg?react'
import GoogleIcon from '@shared/assets/social/google.svg?react'
import KakaoIcon from '@shared/assets/social/kakao.svg?react'
import Flex from '@shared/ui/common/Flex/Flex'
import { Modal } from '@shared/ui/common/Modal'

import { theme } from '@/shared/styles/theme'
import * as S from '@/shared/ui/modals/AccountModal/AccountModal.style'

import { Button } from '../../common/Button'

type AccountModalProps = {
  onClose: () => void
}

const AccountModal = ({ onClose }: AccountModalProps) => {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="480px"
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                css={{ marginBottom: '33px' }}
              >
                <Modal.Title asChild>
                  <S.TitleGroup>
                    <S.Title>계정 연동</S.Title>
                    <S.Subtitle>계정을 연결하거나 연결을 해제할 수 있습니다.</S.Subtitle>
                  </S.TitleGroup>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[400]} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <S.ContentWrapper
                justifyContent="flex-start"
                width="100%"
                minHeight="50px"
                alignItems="center"
                flexDirection="column"
                gap={'16px'}
              >
                <S.SocialItem>
                  <S.Social>
                    <S.Logo bgColor={theme.colors.kakao}>
                      <KakaoIcon width={30} height={30} />
                    </S.Logo>
                    카카오
                  </S.Social>
                  <Button typo="B4.Md" tone="gray" variant="outline" label="연결 해제" />
                </S.SocialItem>
                <S.Divider />
                <S.SocialItem>
                  <S.Social>
                    <S.Logo bgColor={theme.colors.white}>
                      <GoogleIcon width={30} height={30} />
                    </S.Logo>
                    Google
                  </S.Social>
                  <Button typo="B4.Md" tone="gray" label="연결하기" />
                </S.SocialItem>
                <S.Divider />
                <S.SocialItem>
                  <S.Social>
                    <S.Logo bgColor={theme.colors.white}>
                      <AppleIcon width={30} height={30} />
                    </S.Logo>
                    Apple
                  </S.Social>
                  <Button typo="B4.Md" tone="gray" label="연결하기" />
                </S.SocialItem>
              </S.ContentWrapper>
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default AccountModal
