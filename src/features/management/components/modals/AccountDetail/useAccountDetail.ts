import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { useActiveGisuQuery, useMemberMeQuery } from '@/features/auth/hooks/useAuthQueries'
import {
  deleteChallengerRole,
  postChallengerDeactivate,
  postChallengerRole,
} from '@/features/management/domain/api'
import {
  useGetChallengerRole,
  useGetMemberProfile,
} from '@/features/management/hooks/useManagementQueries'
import { useCustomMutation } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { RoleType } from '@/shared/types/umc'

type UseAccountDetailParams = {
  memberId: string
  initialRoleType?: RoleType | null
  onClose: () => void
}

export const useAccountDetail = ({
  memberId,
  initialRoleType: _initialRoleType,
  onClose,
}: UseAccountDetailParams) => {
  const [role, setRole] = useState<RoleType | null>(null)
  const [createdRoleId, setCreatedRoleId] = useState<string>('')

  const queryClient = useQueryClient()
  const { data: myProfile } = useMemberMeQuery()
  const { data: activeGisu } = useActiveGisuQuery()
  const { data, isLoading } = useGetMemberProfile(memberId)
  const { data: createdRoleDetail } = useGetChallengerRole(createdRoleId)

  const profile = data?.result
  const activeChallengerRecord =
    profile?.challengerRecords.find((record) => record.status === 'ACTIVE') ??
    profile?.challengerRecords[0]
  const activeGisuId = activeGisu?.result.gisuId
  const activeGisuRoles =
    activeGisuId == null
      ? []
      : (profile?.roles ?? []).filter(
          (profileRole) => String(profileRole.gisuId) === String(activeGisuId),
        )

  const formatDateToDot = (value?: string) => {
    if (!value) return '-'

    const isoLike = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (isoLike) return `${isoLike[1]}.${isoLike[2]}.${isoLike[3]}`

    const dotted = value.match(/^(\d{4})\.(\d{2})\.(\d{2})/)
    if (dotted) return `${dotted[1]}.${dotted[2]}.${dotted[3]}`

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '-'

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}.${month}.${day}`
  }

  const activityHistories = (profile?.challengerRecords ?? []).map((record) => {
    const periodText =
      record.startAt && record.endAt
        ? `${formatDateToDot(record.startAt)} ~ ${formatDateToDot(record.endAt)}`
        : '-'

    return {
      challengerId: record.challengerId,
      gisu: record.gisu,
      part: record.part,
      periodText,
      isActive: record.status === 'ACTIVE',
    }
  })

  const { mutate: deactivateChallenger, isPending: isDeactivating } =
    useCustomMutation<CommonResponseDTO<null> | null>(
      () => {
        if (!profile || !activeChallengerRecord) return Promise.resolve(null)

        return postChallengerDeactivate(String(activeChallengerRecord.challengerId), {
          deactivationType: 'WITHDRAW',
          modifiedBy: myProfile?.id ?? '0',
          reason: '관리자에 의한 비활성화 처리',
          memberId: profile.id,
        })
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['management', 'challenger'] })
          await queryClient.invalidateQueries({
            queryKey: managementKeys.getMemberProfileDetail(memberId),
          })
          onClose()
        },
      },
    )

  const { mutate: createChallengerRole, isPending: isSavingRole } =
    useCustomMutation<CommonResponseDTO<{ challengerRoleId: string }> | null>(
      async () => {
        if (!profile || !role || !activeChallengerRecord) return null

        if (role === 'CHAPTER_PRESIDENT') {
          alert('지부장 권한은 현재 화면에서 지부 organizationId가 없어 설정할 수 없습니다.')
          return null
        }
        if (activeGisuRoles.some((profileRole) => profileRole.roleType === role)) {
          alert('현재 기수에 이미 보유 중인 권한입니다.')
          return null
        }

        const organizationId = role.startsWith('SCHOOL_') ? profile.schoolId : null
        const responsiblePart =
          role === 'SCHOOL_PART_LEADER' || role === 'CENTRAL_EDUCATION_TEAM_MEMBER'
            ? activeChallengerRecord.part
            : null

        return postChallengerRole({
          challengerId: activeChallengerRecord.challengerId,
          roleType: role,
          organizationId,
          responsiblePart,
          gisuId: activeGisuId ?? activeChallengerRecord.gisu,
        })
      },
      {
        onSuccess: async (created) => {
          if (!created) return
          const createdId = created.result.challengerRoleId
          if (createdId) setCreatedRoleId(String(createdId))
          await queryClient.invalidateQueries({ queryKey: ['management', 'challenger'] })
          await queryClient.invalidateQueries({
            queryKey: managementKeys.getMemberProfileDetail(memberId),
          })
        },
      },
    )

  const { mutate: deleteCreatedRole, isPending: isDeletingRole } = useCustomMutation(
    async (challengerRoleId: string) => deleteChallengerRole(challengerRoleId),
    {
      onSuccess: async () => {
        setCreatedRoleId('')
        await queryClient.invalidateQueries({ queryKey: ['management', 'challenger'] })
        await queryClient.invalidateQueries({
          queryKey: managementKeys.getMemberProfileDetail(memberId),
        })
      },
    },
  )

  const onClickRoleOption = (roleType: RoleType) => {
    const selectedExistingRole = activeGisuRoles.find(
      (profileRole) => profileRole.roleType === roleType,
    )

    if (selectedExistingRole) {
      deleteCreatedRole(String(selectedExistingRole.id))
      if (role === roleType) setRole(null)
      return
    }

    setRole((prevRole) => (prevRole === roleType ? null : roleType))
  }

  const onDeleteCreatedRole = () => {
    if (!createdRoleId) return
    deleteCreatedRole(createdRoleId)
  }

  const isRoleActive = (roleType: RoleType) => {
    const hasExistingRole = activeGisuRoles.some((profileRole) => profileRole.roleType === roleType)
    return hasExistingRole || role === roleType
  }

  return {
    role,
    setRole,
    isLoading,
    profile,
    activeChallengerRecord,
    activityHistories,
    activeGisuRoles,
    createdRoleDetail,
    deactivateChallenger,
    isDeactivating,
    createChallengerRole,
    isSavingRole,
    onDeleteCreatedRole,
    onClickRoleOption,
    isRoleActive,
    isDeletingRole,
  }
}
