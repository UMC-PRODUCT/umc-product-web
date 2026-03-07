import { useMemo, useState } from 'react'
import { useQueries, useQueryClient } from '@tanstack/react-query'

import { useActiveGisuQuery, useMemberMeQuery } from '@/features/auth/hooks/useAuthQueries'
import {
  deleteChallengerRole,
  getGisuById,
  postChallengerDeactivate,
  postChallengerRole,
} from '@/features/management/domain/api'
import { useGetMemberProfile } from '@/features/management/hooks/useManagementQueries'
import { getGisuPeriodText } from '@/features/management/utils/gisu'
import { useCustomMutation } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { RoleType } from '@/shared/types/umc'

type UseAccountDetailParams = {
  memberId: string
  onClose: () => void
}

export const useAccountDetail = ({ memberId, onClose }: UseAccountDetailParams) => {
  const [selectedRoles, setSelectedRoles] = useState<Array<RoleType>>([])

  const queryClient = useQueryClient()
  const { data: myProfile } = useMemberMeQuery()
  const { data: activeGisu } = useActiveGisuQuery()
  const { data, isLoading, error } = useGetMemberProfile(memberId)

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

  const gisuIds = useMemo(
    () => Array.from(new Set((profile?.challengerRecords ?? []).map((record) => record.gisuId))),
    [profile?.challengerRecords],
  )

  const gisuDetailQueries = useQueries({
    queries: gisuIds.map((gisuId) => ({
      queryKey: managementKeys.getGisuDetail(gisuId),
      queryFn: () => getGisuById({ gisuId }),
      enabled: Boolean(gisuId),
    })),
  })

  const gisuDetailMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof getGisuPeriodText>>()

    gisuIds.forEach((gisuId, index) => {
      const gisu = gisuDetailQueries[index]?.data?.result
      map.set(gisuId, getGisuPeriodText(gisu))
    })

    return map
  }, [gisuIds, gisuDetailQueries])

  const activityHistories = (profile?.challengerRecords ?? []).map((record) => {
    const periodText = gisuDetailMap.get(record.gisuId) ?? '-'

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
          await queryClient.invalidateQueries({ queryKey: managementKeys.getChallengerBase })
          await queryClient.invalidateQueries({
            queryKey: managementKeys.getMemberProfileDetail(memberId),
          })
          onClose()
        },
      },
    )

  const { mutate: createChallengerRole, isPending: isSavingRole } = useCustomMutation<null>(
    async () => {
      if (!profile || !activeChallengerRecord) return null

      const rolesToCreate = selectedRoles.filter(
        (roleType) => !activeGisuRoles.some((profileRole) => profileRole.roleType === roleType),
      )

      const allowedRoles = rolesToCreate.filter((roleType) => {
        if (roleType === 'CHAPTER_PRESIDENT') {
          alert('지부장 권한은 현재 화면에서 지부 organizationId가 없어 설정할 수 없습니다.')
          return false
        }
        return true
      })

      if (allowedRoles.length === 0) {
        alert('추가할 권한을 선택해 주세요.')
        return null
      }

      await Promise.all(
        allowedRoles.map((roleType) => {
          const organizationId = roleType.startsWith('SCHOOL_') ? profile.schoolId : null
          const responsiblePart =
            roleType === 'SCHOOL_PART_LEADER' || roleType === 'CENTRAL_EDUCATION_TEAM_MEMBER'
              ? activeChallengerRecord.part
              : null

          return postChallengerRole({
            challengerId: activeChallengerRecord.challengerId,
            roleType,
            organizationId,
            responsiblePart,
            gisuId: activeGisuId ?? activeChallengerRecord.gisuId,
          })
        }),
      )

      return null
    },
    {
      onSuccess: async () => {
        setSelectedRoles([])
        await queryClient.invalidateQueries({ queryKey: managementKeys.getChallengerBase })
        await queryClient.invalidateQueries({
          queryKey: managementKeys.getMemberProfileDetail(memberId),
        })
        onClose()
      },
    },
  )

  const { mutate: deleteCreatedRole, isPending: isDeletingRole } = useCustomMutation(
    async (challengerRoleId: string) => deleteChallengerRole(challengerRoleId),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: managementKeys.getChallengerBase })
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
      setSelectedRoles((prev) => prev.filter((selected) => selected !== roleType))
      return
    }

    setSelectedRoles((prevRoles) =>
      prevRoles.includes(roleType)
        ? prevRoles.filter((selected) => selected !== roleType)
        : [...prevRoles, roleType],
    )
  }

  const errorStatus = (error as { response?: { status?: number } } | null)?.response?.status

  const isRoleActive = (roleType: RoleType) => {
    const hasExistingRole = activeGisuRoles.some((profileRole) => profileRole.roleType === roleType)
    return hasExistingRole || selectedRoles.includes(roleType)
  }

  return {
    selectedRoles,
    setSelectedRoles,
    isLoading,
    errorStatus,
    profile,
    activeGisu: activeGisu?.result.gisu,
    activeChallengerRecord,
    activityHistories,
    activeGisuRoles,
    deactivateChallenger,
    isDeactivating,
    createChallengerRole,
    isSavingRole,
    onClickRoleOption,
    isRoleActive,
    isDeletingRole,
  }
}
