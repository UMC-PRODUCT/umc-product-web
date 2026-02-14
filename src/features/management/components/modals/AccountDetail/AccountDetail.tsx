import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { useMemberMeQuery } from '@/features/auth/hooks/useAuthQueries'
import {
  deleteChallengerRole,
  postChallengerDeactivate,
  postChallengerRole,
} from '@/features/management/domain/api'
import {
  useGetChallengerDetail,
  useGetChallengerRole,
} from '@/features/management/hooks/useManagementQueries'
import Close from '@/shared/assets/icons/close.svg?react'
import Mail from '@/shared/assets/icons/mail.svg?react'
import DefaultProfile from '@/shared/assets/icons/profile.svg'
import { useCustomMutation } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'
import { theme } from '@/shared/styles/theme'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { RoleType } from '@/shared/types/umc'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import Section from '@/shared/ui/common/Section/Section'
import { transformPart } from '@/shared/utils/transformKorean'

import * as S from './AccountDetail.style'

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: '활성',
  INACTIVE: '비활성',
  PENDING: '대기',
  WITHDRAWN: '탈퇴',
}

const ROLE_OPTIONS: Array<{ roleType: RoleType; label: string }> = [
  { roleType: 'SUPER_ADMIN', label: '프로덕트 팀' },
  { roleType: 'CENTRAL_PRESIDENT', label: '중앙 총괄' },
  { roleType: 'CENTRAL_VICE_PRESIDENT', label: '중앙 부총괄' },
  { roleType: 'CENTRAL_OPERATING_TEAM_MEMBER', label: '중앙 운영국원' },
  { roleType: 'CENTRAL_EDUCATION_TEAM_MEMBER', label: '중앙 교육국원' },
  { roleType: 'CHAPTER_PRESIDENT', label: '지부장' },
  { roleType: 'SCHOOL_PRESIDENT', label: '학교 회장' },
  { roleType: 'SCHOOL_VICE_PRESIDENT', label: '학교 부회장' },
  { roleType: 'SCHOOL_PART_LEADER', label: '학교 파트장' },
  { roleType: 'SCHOOL_ETC_ADMIN', label: '학교 기타 운영진' },
]

const AccountDetail = ({
  challengerId,
  initialRoleType,
  onClose,
}: {
  challengerId: string
  initialRoleType?: RoleType | null
  onClose: () => void
}) => {
  const [role, setRole] = useState<RoleType | null>(initialRoleType ?? null)
  const [createdRoleId, setCreatedRoleId] = useState<string>('')
  const queryClient = useQueryClient()
  const { data: myProfile } = useMemberMeQuery()
  const { data, isLoading } = useGetChallengerDetail(challengerId)
  const { data: createdRoleDetail } = useGetChallengerRole(createdRoleId)
  const profile = data?.result
  const { mutate: deactivateChallenger, isPending: isDeactivating } = useCustomMutation(
    () =>
      postChallengerDeactivate(challengerId, {
        deactivationType: 'WITHDRAW',
        modifiedBy: Number(myProfile?.id ?? 0),
        reason: '관리자에 의한 비활성화 처리',
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['management', 'challenger'] })
        await queryClient.invalidateQueries({
          queryKey: managementKeys.getChallengerDetail(challengerId),
        })
        onClose()
      },
    },
  )
  const { mutate: createChallengerRole, isPending: isSavingRole } =
    useCustomMutation<CommonResponseDTO<{ challengerRoleId: number }> | null>(
      async () => {
        if (!profile || !role) return null

        if (role === 'CHAPTER_PRESIDENT') {
          alert('지부장 권한은 현재 화면에서 지부 organizationId가 없어 설정할 수 없습니다.')
          return null
        }

        const organizationId = role.startsWith('SCHOOL_') ? Number(profile.schoolId) : null
        const responsiblePart =
          role === 'SCHOOL_PART_LEADER' || role === 'CENTRAL_EDUCATION_TEAM_MEMBER'
            ? profile.part
            : null

        return postChallengerRole({
          challengerId: Number(profile.challengerId),
          roleType: role,
          organizationId,
          responsiblePart,
          gisuId: Number(profile.gisu),
        })
      },
      {
        onSuccess: async (created) => {
          if (!created) return
          const createdId = created.result.challengerRoleId
          if (createdId) setCreatedRoleId(String(createdId))
          await queryClient.invalidateQueries({ queryKey: ['management', 'challenger'] })
          await queryClient.invalidateQueries({
            queryKey: managementKeys.getChallengerDetail(challengerId),
          })
        },
      },
    )
  const { mutate: deleteCreatedRole, isPending: isDeletingRole } = useCustomMutation(
    async () => {
      if (!createdRoleId) return null
      return deleteChallengerRole(createdRoleId)
    },
    {
      onSuccess: async () => {
        if (createdRoleId) {
          await queryClient.invalidateQueries({
            queryKey: managementKeys.getChallengerRoleDetail(createdRoleId),
          })
        }
        setCreatedRoleId('')
        await queryClient.invalidateQueries({ queryKey: ['management', 'challenger'] })
        await queryClient.invalidateQueries({
          queryKey: managementKeys.getChallengerDetail(challengerId),
        })
      },
    },
  )

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
                  css={{ borderRadius: '50%', width: '100px', height: '100px' }}
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
                      {STATUS_LABEL[profile?.status ?? ''] ?? '알 수 없음'}
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
                      isActive={role === option.roleType}
                      onClick={() => setRole(option.roleType)}
                    >
                      <S.RadioChoiceInput $isChecked={role === option.roleType} />
                      {option.label}
                    </S.RoleButton>
                  ))}
                </S.Grid>
              </Section>
              {createdRoleDetail?.result && (
                <Section variant="solid" gap={8}>
                  <S.SubTitle>최근 생성 역할</S.SubTitle>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Flex flexDirection="column" alignItems="flex-start" gap={2}>
                      <S.SubInfo>Role: {createdRoleDetail.result.roleType}</S.SubInfo>
                      <S.SubInfo>
                        Organization: {createdRoleDetail.result.organizationType}
                      </S.SubInfo>
                      <S.SubInfo>Gisu: {createdRoleDetail.result.gisu}기</S.SubInfo>
                    </Flex>
                    <Button
                      tone="necessary"
                      typo="C3.Md"
                      label="역할 삭제"
                      isLoading={isDeletingRole}
                      onClick={() => deleteCreatedRole()}
                    />
                  </Flex>
                </Section>
              )}
            </Flex>

            <Flex flexDirection="column" gap={10}>
              <Flex flexDirection="column" gap={4}>
                <S.Title>활동 이력</S.Title>
                <S.SubTitle>기수별 참여 파트 정보를 확인할 수 있습니다.</S.SubTitle>
              </Flex>
              <Section variant="solid" flexDirection="row" padding="15px 40px">
                <S.Generation isActive={true}>
                  {profile?.gisu ? `${profile.gisu}기` : '-'}
                </S.Generation>
                <S.ActivityInfo isActive={true}>
                  <span>파트</span>
                  <span>{profile?.part ? transformPart(profile.part) : '-'}</span>
                </S.ActivityInfo>
                <S.ActivityInfo isActive={true}>
                  <span>기수</span>
                  <span>{profile?.gisu ? `${profile.gisu}기` : '-'}</span>
                </S.ActivityInfo>
              </Section>
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
