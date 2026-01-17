import { useMemo, useState } from 'react'

import type { QuestionAnswerValue } from '../../../domain/model'
import { getChangedPartRanks } from '../ResumeFormSection.helpers'

export interface PartChangePending {
  questionId: number
  currentValue: QuestionAnswerValue | null
  nextValue: QuestionAnswerValue
}

/**
 * 파트 변경 확인 모달 상태를 관리하는 훅
 * - 모달 열림/닫힘 상태
 * - 대기 중인 파트 선택 정보
 */
export function usePartChangeModalState() {
  const [isOpen, setIsOpen] = useState(false)
  const [pending, setPending] = useState<PartChangePending | null>(null)

  const openModal = (data: PartChangePending) => {
    setPending(data)
    setIsOpen(true)
  }

  const closeModal = () => {
    setPending(null)
    setIsOpen(false)
  }

  const partChangeRanksText = useMemo(() => {
    if (!pending) return '선택'
    const changedRanks = getChangedPartRanks(pending.currentValue, pending.nextValue)
    return changedRanks.length > 0 ? `${changedRanks.join(', ')}지망` : '선택'
  }, [pending])

  return {
    isOpen,
    pending,
    partChangeRanksText,
    openModal,
    closeModal,
  }
}
