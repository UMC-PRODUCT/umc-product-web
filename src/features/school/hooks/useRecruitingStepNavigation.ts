import { useMemo, useState } from 'react'
import type { FieldPath, UseFormTrigger } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'

import type { RecruitingForms } from '@/shared/types/form'

import { getStepReady, step3ItemsSchema } from '../schemas/validation'

type UseRecruitingStepNavigationParams = {
  values: RecruitingForms
  interviewDates: Array<string>
  trigger: UseFormTrigger<RecruitingForms>
  scrollToTop?: () => void
  partCompletion?: Partial<Record<RecruitingForms['recruitmentParts'][number], boolean>>
}

export const useRecruitingStepNavigation = ({
  values,
  interviewDates,
  trigger,
  scrollToTop,
  partCompletion,
}: UseRecruitingStepNavigationParams) => {
  const [step, setStep] = useState(1)
  const [step3Page, setStep3Page] = useState(1)
  const [step3Part, setStep3Part] = useState<RecruitingForms['recruitmentParts'][number] | null>(
    null,
  )
  const navigate = useNavigate()

  // 상단으로 스크롤: 외부 콜백이 있으면 우선 사용
  const scrollToTopInternal = () => {
    if (scrollToTop) {
      scrollToTop()
      return
    }
    const scroller = document.scrollingElement
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // 검증 실패 시 해당 필드로 포커스 이동 후 스크롤
  const triggerAndScrollToTop = async (fields: Array<FieldPath<RecruitingForms>>) => {
    await trigger(fields, { shouldFocus: true })
    scrollToTopInternal()
  }

  // 파트별 문항 완료 여부 집계
  const allPartsCompleted = useMemo(
    () => values.recruitmentParts.every((part) => partCompletion?.[part]),
    [values.recruitmentParts, partCompletion],
  )
  // 현재 단계의 진행 가능 여부 계산
  const canProceedStep = useMemo(() => {
    if (step === 3) {
      return getStepReady(3, values, { interviewDates }) && allPartsCompleted
    }
    return getStepReady(step, values, { interviewDates })
  }, [step, values, interviewDates, allPartsCompleted])

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
      return
    }
    navigate({
      to: '/school/recruiting',
      replace: true,
    })
  }

  // 3단계(문항 작성) 전용 검증 및 포커스 이동
  const validateStep3 = async () => {
    if (!allPartsCompleted) {
      const firstIncompletePart = values.recruitmentParts.find((part) => !partCompletion?.[part])
      setStep3Page(3)
      setStep3Part(firstIncompletePart ?? null)
      scrollToTopInternal()
      return false
    }
    const validation = step3ItemsSchema.safeParse({
      items: values.items,
      recruitmentParts: values.recruitmentParts,
    })
    if (!validation.success) {
      const firstIssue = validation.error.issues[0]
      if (firstIssue.path[0] === 'recruitmentParts' && typeof firstIssue.path[1] === 'string') {
        setStep3Page(3)
        setStep3Part(firstIssue.path[1] as RecruitingForms['recruitmentParts'][number])
      } else {
        const issueIndex = typeof firstIssue.path[1] === 'number' ? firstIssue.path[1] : null
        const issueItem = issueIndex !== null ? values.items[issueIndex] : null
        if (issueItem?.target.kind === 'COMMON_PAGE') {
          setStep3Page(issueItem.target.pageNo)
        } else if (issueItem?.target.kind === 'PART') {
          setStep3Page(3)
          setStep3Part(issueItem.target.part)
        } else {
          setStep3Page(3)
        }
      }
      await triggerAndScrollToTop(['items'])
      return false
    }
    return true
  }

  // 단계 이동 + 각 단계별 검증 처리
  const goToNextStep = async () => {
    if (step === 1) {
      if (!getStepReady(1, values)) {
        await triggerAndScrollToTop(['title', 'recruitmentParts'])
        return
      }
    }
    if (step === 2) {
      if (
        !getStepReady(2, values, {
          interviewDates,
        })
      ) {
        await triggerAndScrollToTop([
          'schedule.applyStartAt',
          'schedule.applyEndAt',
          'schedule.docResultAt',
          'schedule.interviewStartAt',
          'schedule.interviewEndAt',
          'schedule.finalResultAt',
          'schedule.interviewTimeTable.enabled',
        ])
        return
      }
    }
    if (step === 3) {
      const isStep3Valid = await validateStep3()
      if (!isStep3Valid) {
        return
      }
    }
    if (step === 4) {
      if (!getStepReady(4, values)) {
        await triggerAndScrollToTop(['noticeContent'])
        return
      }
    }
    setStep(step + 1)
    requestAnimationFrame(scrollToTopInternal)
  }

  return {
    step,
    setStep,
    step3PageNumber: step3Page,
    setStep3PageNumber: setStep3Page,
    step3SelectedPart: step3Part,
    setStep3SelectedPart: setStep3Part,
    canProceedStep,
    goToPreviousStep,
    goToNextStep,
  }
}
