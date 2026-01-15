import { useMemo, useState } from 'react'
import type { UseFormTrigger } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'

import { getPartFromKey } from '@/features/school/utils/partQuestionBank'
import type { RecruitingForms } from '@/shared/types/form'

import { getStepReady, step3Schema } from '../validation'

type UseRecruitingStepNavigationParams = {
  values: RecruitingForms
  interviewDates: Array<string>
  trigger: UseFormTrigger<RecruitingForms>
  scrollToTop?: () => void
}

export const useRecruitingStepNavigation = ({
  values,
  interviewDates,
  trigger,
  scrollToTop,
}: UseRecruitingStepNavigationParams) => {
  const [step, setStep] = useState(1)
  const [step3Page, setStep3Page] = useState(1)
  const [step3Part, setStep3Part] = useState<RecruitingForms['recruitingPart'][number] | null>(null)
  const navigate = useNavigate()

  const isStepReady = useMemo(
    () => getStepReady(step, values, { interviewDates }),
    [step, values, interviewDates],
  )

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
      return
    }
    navigate({
      to: '/school/recruiting',
      replace: true,
    })
  }

  const handleNext = async () => {
    if (step === 1) {
      if (!getStepReady(1, values)) {
        await trigger(['recruitingName', 'recruitingPart'], { shouldFocus: true })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }
    if (step === 2) {
      if (
        !getStepReady(2, values, {
          interviewDates,
        })
      ) {
        await trigger(
          [
            'documentStartDate',
            'documentEndDate',
            'documentResultDate',
            'interviewStartDate',
            'interviewEndDate',
            'finalResultDate',
            'interviewTimeSlots',
          ],
          { shouldFocus: true },
        )
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }
    if (step === 3) {
      const validation = step3Schema.safeParse({
        pages: values.pages,
        partQuestionBank: values.partQuestionBank,
        recruitingPart: values.recruitingPart,
      })
      if (!validation.success) {
        const firstIssue = validation.error.issues[0]
        const rootPath = firstIssue.path[0]
        if (rootPath === 'pages') {
          const issuePageIndex = typeof firstIssue.path[1] === 'number' ? firstIssue.path[1] : 0
          setStep3Page(values.pages[issuePageIndex].page)
        } else if (rootPath === 'partQuestionBank') {
          const issuePart =
            typeof firstIssue.path[1] === 'string' ? getPartFromKey(firstIssue.path[1]) : null
          setStep3Page(3)
          if (issuePart) {
            setStep3Part(issuePart)
          }
        } else {
          setStep3Page(3)
        }
        await trigger(['pages', 'partQuestionBank'], { shouldFocus: true })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }
    if (step === 4) {
      if (!getStepReady(4, values)) {
        await trigger(['noticeTitle', 'noticeContent'], { shouldFocus: true })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }
    setStep(step + 1)
    requestAnimationFrame(() => {
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
    })
  }

  return {
    step,
    setStep,
    step3Page,
    setStep3Page,
    step3Part,
    setStep3Part,
    isStepReady,
    handlePrevious,
    handleNext,
  }
}
