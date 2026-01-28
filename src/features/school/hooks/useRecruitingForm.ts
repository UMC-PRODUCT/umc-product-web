import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import type { RecruitingForms } from '@/shared/types/form'

import { recruitingFormSchema } from '../schemas/validation'
import {
  buildDefaultPage2Item,
  buildPreferredPartItem,
  buildScheduleItem,
  ensureRequiredItems,
} from '../utils/recruiting/requiredItems'

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
