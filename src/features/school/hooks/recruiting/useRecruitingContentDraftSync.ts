import { useEffect } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import dayjs from 'dayjs'

import { setScheduleValidationContext } from '@/features/school/schemas/validation'
import { convertApplicationFormToItems } from '@/features/school/utils/recruiting/applicationFormMapper'
import { buildRecruitingInitialForm } from '@/features/school/utils/recruiting/buildInitialForm'
import type {
  FormPage,
  FormQuestion,
  RecruitingForms,
  RecruitingSchedule,
} from '@/shared/types/form'

type DraftSyncParams = {
  form: UseFormReturn<RecruitingForms>
  recruitingData: { result: Parameters<typeof buildRecruitingInitialForm>[0] }
  applicationData: {
    result: Parameters<typeof convertApplicationFormToItems>[0]
  }
  setInitialSchedule: (next: RecruitingSchedule | null) => void
}

export const useRecruitingContentDraftSync = ({
  form,
  recruitingData,
  applicationData,
  setInitialSchedule,
}: DraftSyncParams) => {
  // 리크루팅 기본 정보 초기화
  useEffect(() => {
    const result = recruitingData.result
    const initialForm = buildRecruitingInitialForm(result)
    const currentItems = form.getValues('items')
    const hasCurrentItems = Array.isArray(currentItems) && currentItems.length > 0
    form.reset({
      ...initialForm,
      items: hasCurrentItems ? currentItems : initialForm.items,
    })
    setInitialSchedule(initialForm.schedule)
    setScheduleValidationContext({
      initialSchedule: initialForm.schedule,
      now: dayjs().toISOString(),
      status: initialForm.status,
    })
  }, [form, recruitingData.result, setInitialSchedule])

  // 지원서 질문 설계 데이터 로딩(페이지/질문/옵션)
  useEffect(() => {
    const result = applicationData.result
    if (!result.pages.length) return
    const nextItems = convertApplicationFormToItems(result)
    const preferredQuestion = result.pages
      .flatMap((page: FormPage) => page.questions ?? [])
      .find((question: FormQuestion) => question.type === 'PREFERRED_PART')
    const nextMaxPreferredCount = preferredQuestion?.maxSelectCount
      ? Number(preferredQuestion.maxSelectCount)
      : undefined
    form.reset(
      {
        ...form.getValues(),
        items: nextItems,
        ...(nextMaxPreferredCount
          ? { maxPreferredPartCount: nextMaxPreferredCount.toString() }
          : {}),
      },
      { keepErrors: true, keepTouched: true, keepDirty: false },
    )
  }, [form, applicationData.result])
}
