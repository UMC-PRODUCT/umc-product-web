import { useMemo } from 'react'

import { useGetMemberProfile } from '@/features/management/hooks/useManagementQueries'
import Close from '@/shared/assets/icons/close.svg?react'
import Mail from '@/shared/assets/icons/mail.svg?react'
import DefaultProfile from '@/shared/assets/icons/profile.svg'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import FeedbackState from '@/shared/ui/common/FeedbackState/FeedbackState'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import Section from '@/shared/ui/common/Section/Section'
import { transformPart, transformRoleKorean } from '@/shared/utils/transformKorean'

import * as S from './ActorProfileModal.style'

type ActorProfileModalProps = {
  memberId: string
  onClose: () => void
}

const STATUS_META = {
  ACTIVE: { label: '활성', tone: 'lime' },
  INACTIVE: { label: '비활성', tone: 'gray' },
  PENDING: { label: '대기', tone: 'darkGray' },
  WITHDRAWN: { label: '탈퇴', tone: 'necessary' },
} as const

const PROFILE_LINKS = [
  { key: 'linkedIn', label: 'LinkedIn' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'github', label: 'GitHub' },
  { key: 'blog', label: 'Blog' },
  { key: 'personal', label: 'Personal' },
] as const

const toExternalHref = (url: string) =>
  url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`

const resolveStatusMeta = (status?: string) => {
  if (!status) return { label: '-', tone: 'gray' as const }

  return Object.prototype.hasOwnProperty.call(STATUS_META, status)
    ? STATUS_META[status as keyof typeof STATUS_META]
    : { label: status, tone: 'gray' as const }
}

const resolveRoleLabel = (roleType: string) => {
  const label = transformRoleKorean(roleType)
  return label === '일반 유저' ? roleType : label
}

const ORGANIZATION_TYPE_LABELS = {
  CENTRAL: '중앙',
  CHAPTER: '지부',
  SCHOOL: '학교',
} as const

const resolveOrganizationTypeLabel = (organizationType: string) =>
  Object.prototype.hasOwnProperty.call(ORGANIZATION_TYPE_LABELS, organizationType)
    ? ORGANIZATION_TYPE_LABELS[organizationType as keyof typeof ORGANIZATION_TYPE_LABELS]
    : organizationType

const ActorProfileModal = ({ memberId, onClose }: ActorProfileModalProps) => {
  const { data, isLoading, isError, refetch } = useGetMemberProfile(memberId)

  const profile = data?.result
  const statusMeta = resolveStatusMeta(profile?.status)

  const profileLinks = useMemo(
    () =>
      PROFILE_LINKS.map(({ key, label }) => ({
        label,
        url: profile?.profile?.[key]?.trim() ?? '',
      })).filter((item) => item.url.length > 0),
    [profile?.profile],
  )

  const activityHistory = useMemo(
    () =>
      [...(profile?.challengerRecords ?? [])].sort(
        (left, right) => Number(right.gisu) - Number(left.gisu),
      ),
    [profile?.challengerRecords],
  )

  const roleGroups = useMemo(() => {
    const gisuLabelById = new Map(
      (profile?.challengerRecords ?? []).map((record) => [record.gisuId, `${record.gisu}기`]),
    )

    const grouped = new Map<string, { gisuLabel: string; entries: Array<string> }>()

    ;(profile?.roles ?? []).forEach((role) => {
      const gisuLabel = gisuLabelById.get(role.gisuId) ?? `기수 ID ${role.gisuId}`
      const entry = `${resolveRoleLabel(role.roleType)} · ${resolveOrganizationTypeLabel(
        role.organizationType,
      )} (${role.organizationType})`

      const current = grouped.get(role.gisuId)
      if (current) {
        current.entries.push(entry)
        return
      }

      grouped.set(role.gisuId, {
        gisuLabel,
        entries: [entry],
      })
    })

    return Array.from(grouped.entries())
      .sort((left, right) => Number(right[0]) - Number(left[0]))
      .map(([gisuId, value]) => ({
        gisuId,
        gisuLabel: value.gisuLabel,
        content: value.entries.join(', '),
      }))
  }, [profile?.challengerRecords, profile?.roles])

  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper flexDirection="column" gap={18}>
            <Modal.Header>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Modal.Title asChild>
                  <S.ModalTitle>회원 상세 정보</S.ModalTitle>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={20} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>

            {isLoading ? (
              <Section variant="solid" padding="28px 24px" css={{ minHeight: '320px', gap: 0 }}>
                <FeedbackState mode="loading" loadingLabel="회원 정보를 불러오는 중입니다." />
              </Section>
            ) : isError ? (
              <Section variant="solid" padding="28px 24px" css={{ minHeight: '320px', gap: 0 }}>
                <FeedbackState
                  mode="error"
                  title="회원 정보를 불러오지 못했습니다."
                  description="잠시 후 다시 시도해 주세요."
                  onRetry={() => {
                    void refetch()
                  }}
                />
              </Section>
            ) : profile ? (
              <>
                <Section variant="solid" padding="20px" css={{ gap: 18 }}>
                  <S.HeroSection>
                    <S.ProfileImage
                      src={profile.profileImageLink || DefaultProfile}
                      alt={`${profile.nickname || profile.name} 프로필 이미지`}
                    />
                    <S.Headline>
                      <S.NameRow>
                        <S.Name>{`${profile.nickname || '-'} / ${profile.name || '-'}`}</S.Name>
                        <S.Status>
                          <S.Circle />
                          {statusMeta.label}
                        </S.Status>
                      </S.NameRow>
                      <S.School>{profile.schoolName || '-'}</S.School>
                      <S.EmailRow>
                        <Mail width={14} height={14} />
                        <span>{profile.email || '-'}</span>
                      </S.EmailRow>
                      <S.MetaInfo>{`Member ID ${profile.id} · 권한 ${profile.roles.length}개 · 활동 이력 ${profile.challengerRecords.length}건`}</S.MetaInfo>
                    </S.Headline>
                  </S.HeroSection>
                </Section>

                <S.SectionBlock>
                  <S.SectionTitle>권한 정보</S.SectionTitle>
                  <S.SectionDescription>
                    기수별 권한과 조직 유형을 확인할 수 있습니다.
                  </S.SectionDescription>
                  <Section variant="solid" padding="18px 20px" alignItems="flex-start">
                    {roleGroups.length > 0 ? (
                      <S.RoleGroupList>
                        {roleGroups.map((group) => (
                          <S.RoleGroupCard key={group.gisuId}>
                            <S.RoleGroupTitle>{group.gisuLabel}</S.RoleGroupTitle>
                            <S.RoleGroupText>{group.content}</S.RoleGroupText>
                          </S.RoleGroupCard>
                        ))}
                      </S.RoleGroupList>
                    ) : (
                      <S.EmptyText>부여된 역할이 없습니다.</S.EmptyText>
                    )}
                  </Section>
                </S.SectionBlock>

                <S.SectionBlock>
                  <S.SectionTitle>활동 이력</S.SectionTitle>
                  <S.SectionDescription>
                    기수별 참여 파트 정보를 확인할 수 있습니다.
                  </S.SectionDescription>
                  <S.HistoryList>
                    {activityHistory.length > 0 ? (
                      activityHistory.map((record) => {
                        const recordStatus = resolveStatusMeta(record.status)
                        const isActive = record.status === 'ACTIVE'

                        return (
                          <Section
                            key={`${record.challengerId}-${record.gisuId}`}
                            variant="solid"
                            css={{ padding: '15px 24px' }}
                          >
                            <S.HistoryRow>
                              <S.Generation isActive={isActive}>{`${record.gisu}기`}</S.Generation>
                              <S.ActivityInfo isActive={isActive}>
                                <span>파트</span>
                                <span>{transformPart(record.part)}</span>
                              </S.ActivityInfo>
                              <S.ActivityInfo isActive={isActive}>
                                <span>조직</span>
                                <span>{record.chapterName || record.schoolName || '-'}</span>
                              </S.ActivityInfo>
                              <S.ActivityInfo isActive={isActive}>
                                <span>상태</span>
                                <span>{recordStatus.label}</span>
                              </S.ActivityInfo>
                            </S.HistoryRow>
                          </Section>
                        )
                      })
                    ) : (
                      <Section variant="solid" padding="15px 24px">
                        <S.EmptyText>등록된 활동 이력이 없습니다.</S.EmptyText>
                      </Section>
                    )}
                  </S.HistoryList>
                </S.SectionBlock>

                <S.SectionBlock>
                  <S.SectionTitle>외부 링크</S.SectionTitle>
                  <S.SectionDescription>
                    프로필에 등록된 링크를 바로 열 수 있습니다.
                  </S.SectionDescription>
                  {profileLinks.length > 0 ? (
                    <S.LinkList>
                      {profileLinks.map((item) => (
                        <S.LinkCard
                          key={`${memberId}-${item.label}`}
                          href={toExternalHref(item.url)}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <S.LinkLabel>{item.label}</S.LinkLabel>
                          <S.LinkValue>{item.url}</S.LinkValue>
                        </S.LinkCard>
                      ))}
                    </S.LinkList>
                  ) : (
                    <Section variant="solid" padding="18px 20px">
                      <S.EmptyText>등록된 외부 링크가 없습니다.</S.EmptyText>
                    </Section>
                  )}
                </S.SectionBlock>
              </>
            ) : (
              <Section variant="solid" padding="28px 24px" css={{ minHeight: '320px', gap: 0 }}>
                <FeedbackState
                  mode="error"
                  title="회원 정보를 찾을 수 없습니다."
                  description="존재하지 않는 회원이거나 조회 권한이 없습니다."
                />
              </Section>
            )}

            <Modal.Footer>
              <S.Footer>
                <Button typo="C3.Md" tone="gray" label="닫기" onClick={onClose} />
              </S.Footer>
            </Modal.Footer>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default ActorProfileModal
