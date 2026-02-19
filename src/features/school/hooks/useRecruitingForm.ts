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
  normalizeItems,
} from '../utils/recruiting/requiredItems'

const defaultValues: RecruitingForms = {
  title: '',
  recruitmentParts: [],
  maxPreferredPartCount: '2',
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

const buildItemsSignature = (items: RecruitingForms['items']) =>
  items
    .map((item) => {
      const targetKey =
        item.target.kind === 'PART'
          ? `PART:${item.target.part}:${item.target.pageNo}`
          : `COMMON:${item.target.pageNo}`
      const optionsKey = (item.question.options ?? [])
        .map(
          (option) =>
            `${option.optionId ?? ''}:${option.orderNo}:${option.isOther ? '1' : '0'}:${option.content}`,
        )
        .join('|')
      return [
        targetKey,
        item.question.questionId ?? '',
        item.question.type,
        item.question.questionText,
        item.question.required ? '1' : '0',
        item.question.orderNo,
        optionsKey,
      ].join('::')
    })
    .join('||')

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
    setScheduleValidationContext({ now: dayjs().toISOString() })
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
    setScheduleValidationContext({ status })
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
    const currentItems = form.getValues('items')
    const safeItems = Array.isArray(currentItems) ? currentItems : []
    const { next } = normalizeItems(safeItems, recruitmentParts)
    if (buildItemsSignature(safeItems) === buildItemsSignature(next)) return
    form.setValue('items', next, { shouldDirty: true })
  }, [form, recruitmentParts])

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
