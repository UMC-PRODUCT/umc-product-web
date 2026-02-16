import Close from '@/shared/assets/icons/close.svg?react'
import Mail from '@/shared/assets/icons/mail.svg?react'
import DefaultProfile from '@/shared/assets/icons/profile.svg'
import { theme } from '@/shared/styles/theme'
import type { RoleType } from '@/shared/types/umc'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import Section from '@/shared/ui/common/Section/Section'
import { transformPart, transformRoleKorean } from '@/shared/utils/transformKorean'

import * as S from './AccountDetail.style'
import { useAccountDetail } from './useAccountDetail'

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: '활성',
  INACTIVE: '비활성',
  PENDING: '대기',
  WITHDRAWN: '탈퇴',
}

const ROLE_OPTION_TYPES: Array<RoleType> = [
  'SUPER_ADMIN',
  'CENTRAL_PRESIDENT',
  'CENTRAL_VICE_PRESIDENT',
  'CENTRAL_OPERATING_TEAM_MEMBER',
  'CENTRAL_EDUCATION_TEAM_MEMBER',
  'CHAPTER_PRESIDENT',
  'SCHOOL_PRESIDENT',
  'SCHOOL_VICE_PRESIDENT',
  'SCHOOL_PART_LEADER',
  'SCHOOL_ETC_ADMIN',
]

const ROLE_OPTIONS: Array<{ roleType: RoleType; label: string }> = ROLE_OPTION_TYPES.map(
  (roleType) => ({
    roleType,
    label: transformRoleKorean(roleType),
  }),
)

const AccountDetail = ({ memberId, onClose }: { memberId: string; onClose: () => void }) => {
  const {
    isLoading,
    profile,
    activityHistories,
    deactivateChallenger,
    isDeactivating,
    createChallengerRole,
    isSavingRole,
    onClickRoleOption,
    isRoleActive,
  } = useAccountDetail({
    memberId,
    onClose,
  })

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
                  src={profile?.profileImageLink || DefaultProfile}
                  alt="프로필 이미지"
                  css={{ borderRadius: '50%', width: '100px', minWidth: '100px', height: '100px' }}
                />
                <Flex flexDirection="column" alignItems="flex-start">
                  <Flex alignItems="center" gap={20}>
                    <S.Name>
                      {isLoading
                        ? '불러오는 중...'
                        : `${profile?.nickname ?? '-'} / ${profile?.name ?? '-'}`}
                    </S.Name>
                    <S.Status>
                      <S.Circle />
                      {STATUS_LABEL[profile?.status ?? '']}
                    </S.Status>
                  </Flex>
                  <S.School>{profile?.schoolName ?? '-'}</S.School>
                  <S.SubInfo>
                    <Mail />
                    {profile?.email ?? '-'}
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
                  {ROLE_OPTIONS.map((option) => (
                    <S.RoleButton
                      key={option.roleType}
                      isActive={isRoleActive(option.roleType)}
                      onClick={() => onClickRoleOption(option.roleType)}
                    >
                      <S.RadioChoiceInput $isChecked={isRoleActive(option.roleType)} />
                      {option.label}
                    </S.RoleButton>
                  ))}
                </S.Grid>
              </Section>
            </Flex>

            <Flex flexDirection="column" gap={10}>
              <Flex flexDirection="column" gap={4}>
                <S.Title>활동 이력</S.Title>
                <S.SubTitle>기수별 참여 파트 정보를 확인할 수 있습니다.</S.SubTitle>
              </Flex>
              <Flex flexDirection="column" gap={8} width="100%">
                {activityHistories.length > 0 ? (
                  activityHistories.map((history, index) => (
                    <Section
                      key={`${history.challengerId}-${history.gisu}-${history.part}-${index}`}
                      variant="solid"
                      flexDirection="row"
                      padding="15px 40px"
                    >
                      <S.Generation isActive={history.isActive}>{`${history.gisu}기`}</S.Generation>
                      <S.ActivityInfo isActive={history.isActive}>
                        <span>파트</span>
                        <span>{transformPart(history.part)}</span>
                      </S.ActivityInfo>
                      <S.ActivityInfo isActive={history.isActive}>
                        <span>기간</span>
                        <span>{history.periodText}</span>
                      </S.ActivityInfo>
                    </Section>
                  ))
                ) : (
                  <Section variant="solid" flexDirection="row" padding="15px 40px">
                    <S.ActivityInfo isActive={false}>
                      <span>활동 이력이 없습니다.</span>
                    </S.ActivityInfo>
                  </Section>
                )}
              </Flex>
            </Flex>
            <Modal.Footer>
              <S.FooterWrapper>
                <Button
                  typo="C3.Md"
                  tone="necessary"
                  label="계정 비활성화"
                  isLoading={isDeactivating}
                  onClick={() => deactivateChallenger()}
                />
                <Flex gap={8} width={'fit-content'}>
                  <Button typo="C3.Md" tone="gray" label="닫기" onClick={onClose} />
                  <Button
                    type="submit"
                    tone="lime"
                    typo="C3.Md"
                    variant="solid"
                    label="상세 정보 등록"
                    isLoading={isSavingRole}
                    onClick={() => createChallengerRole()}
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
