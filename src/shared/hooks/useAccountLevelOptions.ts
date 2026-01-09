import { useMemo } from 'react'

import { ACCOUNT_LEVEL } from '@/shared/constants/umc'
import type { AccountLevelType } from '@/shared/types/umc'
import type { Option } from '@/shared/ui/common/Dropdown'
import { transformRoleKorean } from '@/shared/utils/transformKorean'

const useAccountLevelOptions = () => {
  const accountLevelOptions = useMemo<Array<Option<string>>>(
    () =>
      ACCOUNT_LEVEL.map((option) => ({
        ...option,
        label: transformRoleKorean(option.label),
      })),
    [],
  )

  const resolveAccountLevelValue = (id: string | number): AccountLevelType | undefined => {
    return ACCOUNT_LEVEL.find((option) => String(option.id) === String(id))?.label
  }

  return { accountLevelOptions, resolveAccountLevelValue }
}

export default useAccountLevelOptions
