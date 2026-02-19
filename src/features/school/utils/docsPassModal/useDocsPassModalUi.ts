import { useState } from 'react'

import { usePartDropdown } from '@/shared/hooks/useManagedDropdown'
import type { Option } from '@/shared/types/form'
import type { PartType } from '@/shared/types/part'
import type { SelectionsSortType } from '@/shared/types/umc'

type ModalName = 'setPassPart' | 'setPassSuccess' | 'setFail' | 'inform' | null

export const sortOptions: Array<Option<string>> = [
  { label: '점수 높은 순', id: 'SCORE_DESC' },
  { label: '점수 낮은 순', id: 'SCORE_ASC' },
  { label: '평가 완료 시각 순', id: 'EVALUATED_AT_ASC' },
]

export const useDocsPassModalUi = () => {
  const { value: part, Dropdown } = usePartDropdown()
  const resolvedPart: PartType | 'ALL' = part && part.id !== '0' ? (part.id as PartType) : 'ALL'

  const [sortId, setSortId] = useState<SelectionsSortType>('SCORE_DESC')
  const sortValue = sortOptions.find((option) => option.id === sortId)

  const [modalOpen, setModalOpen] = useState<{
    open: boolean
    modalName: ModalName
    data?: {
      id: string
      name: string
      nickname: string
      score: string
      recruitmentId: string
    }
  }>({
    open: false,
    data: undefined,
    modalName: null,
  })

  const handleSortChange = (option: Option<unknown>) => {
    const id = option.id
    if (id === 'SCORE_DESC' || id === 'SCORE_ASC' || id === 'EVALUATED_AT_ASC') {
      setSortId(id)
    }
  }

  return {
    Dropdown,
    sortOptions,
    sortValue,
    handleSortChange,
    part: resolvedPart,
    sortId,
    modalOpen,
    setModalOpen,
  }
}
