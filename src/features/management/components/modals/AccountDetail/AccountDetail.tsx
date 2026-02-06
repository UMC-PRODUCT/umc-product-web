import { useState } from 'react'

import Close from '@/shared/assets/icons/close.svg?react'
import Mail from '@/shared/assets/icons/mail.svg?react'
import Phone from '@/shared/assets/icons/phone.svg?react'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './AccountDetail.style'

const AccountDetail = ({ onClose }: { onClose: () => void }) => {
  const [role, setRole] = useState<string>('총괄')
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />

        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="520px"
            height={'800px'}
            maxHeight={'80vh'}
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Modal.Title asChild>
                  <S.ModalTitle>계정 상세 정보 및 권한 관리</S.ModalTitle>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={20} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Section variant="solid" css={{ marginTop: '32px' }}>
              <Flex alignItems="center" justifyContent="center" gap={25}>
                <img
                  src="/src/shared/assets/icons/profile.svg"
                  alt="프로필 이미지"
                  css={{ borderRadius: '50%', width: '100px', height: '100px' }}
                />
                <Flex flexDirection="column" alignItems="flex-start">
                  <Flex alignItems="center" gap={20}>
                    <S.Name>닉네임/이름</S.Name>
                    <S.Status>
                      <S.Circle />
                      활성
                    </S.Status>
                  </Flex>
                  <S.School>중앙대학교</S.School>
                  <S.SubInfo>
                    <Mail />
                    email@example.com
                  </S.SubInfo>
                  <S.SubInfo>
                    <Phone />
                    010-1234-5678
                  </S.SubInfo>
                </Flex>
              </Flex>
            </Section>
            <Flex flexDirection="column" gap={10}>
              <Flex flexDirection="column" gap={4}>
                <S.Title>권한 설정</S.Title>
                <S.SubTitle>챌린저의 권한을 선택하세요</S.SubTitle>
              </Flex>
              <Section variant="solid" gap={16}>
                <S.Grid>
                  <S.RoleButton isActive={role === '총괄'} onClick={() => setRole('총괄')}>
                    <S.RadioChoiceInput $isChecked={role === '총괄'} />
                    총괄
                  </S.RoleButton>
                  <S.RoleButton
                    isActive={role === 'Product Team'}
                    onClick={() => setRole('Product Team')}
                  >
                    <S.RadioChoiceInput $isChecked={role === 'Product Team'} />
                    Product Team
                  </S.RoleButton>
                  <S.RoleButton isActive={role === '회장단'} onClick={() => setRole('회장단')}>
                    <S.RadioChoiceInput $isChecked={role === '회장단'} />
                    회장단
                  </S.RoleButton>
                  <S.RoleButton isActive={role === '운영진'} onClick={() => setRole('운영진')}>
                    <S.RadioChoiceInput $isChecked={role === '운영진'} />
                    운영진
                  </S.RoleButton>
                </S.Grid>
                <S.RoleButton isActive={role === '챌린저'} onClick={() => setRole('챌린저')}>
                  <S.RadioChoiceInput $isChecked={role === '챌린저'} />
                  챌린저
                </S.RoleButton>
              </Section>
            </Flex>

            <Flex flexDirection="column" gap={10}>
              <Flex flexDirection="column" gap={4}>
                <S.Title>활동 이력</S.Title>
                <S.SubTitle>기수별 참여 파트 정보를 확인할 수 있습니다.</S.SubTitle>
              </Flex>
              {/* TODO: 추후 여기 map 돌리는 걸로 수정 */}
              <Section variant="solid" flexDirection="row" padding="15px 40px">
                <S.Generation isActive={true}>10기</S.Generation>
                <S.ActivityInfo isActive={true}>
                  <span>파트</span>
                  <span>Web</span>
                </S.ActivityInfo>
                <S.ActivityInfo isActive={true}>
                  <span>기간</span>
                  <span>2024.03 ~ 2024.08</span>
                </S.ActivityInfo>
              </Section>
            </Flex>
            <Modal.Footer>
              <S.FooterWrapper>
                <Button typo="C3.Md" tone="necessary" label="계정 비활성화" />
                <Flex gap={8} width={'fit-content'}>
                  <Button typo="C3.Md" tone="gray" label="닫기" onClick={onClose} />
                  <Button
                    type="submit"
                    tone="lime"
                    typo="C3.Md"
                    variant="solid"
                    label="상세 정보 등록"
                    css={{ width: 'fit-content', padding: '6px 18px' }}
                  />
                </Flex>
              </S.FooterWrapper>
            </Modal.Footer>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
export default AccountDetail
