import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import type { RecruitingForms } from '@/shared/types/form'

import { recruitingFormSchema, setScheduleValidationContext } from '../schemas/validation'
import {
  buildDefaultPage2Item,
  buildPreferredPartItem,
  buildScheduleItem,
  ensureRequiredItems,
} from '../utils/recruiting/requiredItems'

const draftLockEnabled = import.meta.env.VITE_FORCE_LOCK_IN_DRAFT === 'true'

const defaultValues: RecruitingForms = {
  title: '',
  recruitmentParts: [],
  maxPreferredPartCount: 2,
  schedule: {
    applyStartAt: null,
    applyEndAt: null,
    docResultAt: null,
    interviewStartAt: null,
    interviewEndAt: null,
    finalResultAt: null,
    interviewTimeTable: {
      dateRange: { start: '', end: '' },
      timeRange: { start: '09:00', end: '23:00' },
      slotMinutes: '30',
      enabledByDate: [],
      disabledByDate: [],
    },
  },
  noticeContent: '',
  status: 'DRAFT',
  items: [buildPreferredPartItem(), buildScheduleItem(), buildDefaultPage2Item()],
}

export const useRecruitingForm = () => {
  const resolver = useMemo(() => zodResolver(recruitingFormSchema), [])
  const form = useForm<RecruitingForms>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver,
    defaultValues,
  })

  // 폼이 생성될 때 현재 시각 기반 정책 컨텍스트 설정
  useEffect(() => {
    setScheduleValidationContext({ now: dayjs().toISOString(), forceLockInDraft: draftLockEnabled })
  }, [])

  const [title, recruitmentParts, maxPreferredPartCount, schedule, noticeContent, status, items] =
    useWatch({
      control: form.control,
      name: [
        'title',
        'recruitmentParts',
        'maxPreferredPartCount',
        'schedule',
        'noticeContent',
        'status',
        'items',
      ],
    })

  // 상태 변경 시 검증 컨텍스트에 반영 (DRAFT이면 잠금 규칙 비활성화)
  useEffect(() => {
    setScheduleValidationContext({ status, forceLockInDraft: draftLockEnabled })
  }, [status])

  const values = useMemo(
    () => ({
      title,
      recruitmentParts,
      maxPreferredPartCount,
      schedule,
      noticeContent,
      status,
      items,
    }),
    [title, recruitmentParts, maxPreferredPartCount, schedule, noticeContent, status, items],
  )

  useEffect(() => {
    const currentItems = Array.isArray(items) ? items : []
    const nextItems = ensureRequiredItems(currentItems, recruitmentParts)
    if (JSON.stringify(currentItems) === JSON.stringify(nextItems)) return
    form.setValue('items', nextItems, { shouldDirty: true })
  }, [form, items, recruitmentParts])

  const interviewDates = useMemo(() => {
    if (!schedule.interviewStartAt || !schedule.interviewEndAt) return []
    const start = dayjs(schedule.interviewStartAt).startOf('day')
    const end = dayjs(schedule.interviewEndAt).startOf('day')
    if (end.isBefore(start, 'day')) return []
    const dates: Array<string> = []
    let current = start
    while (!current.isAfter(end, 'day')) {
      dates.push(current.format('YYYY-MM-DD'))
      current = current.add(1, 'day')
    }
    return dates
  }, [schedule.interviewStartAt, schedule.interviewEndAt])

  return { form, values, interviewDates }
}
