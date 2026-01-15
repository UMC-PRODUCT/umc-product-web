import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { getAllQuestionIdsFromPartBank, getPartKey } from '@/features/school/utils/partQuestionBank'
import { PART } from '@/shared/constants/umc'
import type { PartQuestionBank, RecruitingForms } from '@/shared/types/form'

import { recruitingFormSchema } from '../validation'

const defaultValues: RecruitingForms = {
  recruitingName: '',
  recruitingPart: [],
  documentStartDate: null,
  documentEndDate: null,
  documentResultDate: null,
  interviewStartDate: null,
  interviewEndDate: null,
  finalResultDate: null,
  interviewTimeSlots: {},
  noticeTitle: '',
  noticeContent: '',
  pages: [
    {
      page: 1,
      questions: [
        {
          questionId: 1,
          question: '',
          type: 'PART',
          necessary: true,
          options: [...PART],
          partSinglePick: false,
          isPartQuestion: true,
        },
        {
          questionId: 2,
          question: '',
          type: 'LONG_TEXT',
          necessary: true,
          options: [],
          partSinglePick: false,
          isPartQuestion: false,
        },
      ],
    },
    {
      page: 2,
      questions: [
        {
          questionId: 3,
          question: '',
          type: 'LONG_TEXT',
          necessary: true,
          options: [],
          partSinglePick: false,
          isPartQuestion: false,
        },
      ],
    },
  ],
  partQuestionBank: {},
}

export const useRecruitingForm = () => {
  const resolver = useMemo(() => zodResolver(recruitingFormSchema), [])
  const form = useForm<RecruitingForms>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver,
    defaultValues,
  })

  const [
    recruitingName,
    recruitingPart,
    documentStartDate,
    documentEndDate,
    documentResultDate,
    interviewStartDate,
    interviewEndDate,
    finalResultDate,
    interviewTimeSlots,
    pages,
    partQuestionBank,
    noticeTitle,
    noticeContent,
  ] = useWatch({
    control: form.control,
    name: [
      'recruitingName',
      'recruitingPart',
      'documentStartDate',
      'documentEndDate',
      'documentResultDate',
      'interviewStartDate',
      'interviewEndDate',
      'finalResultDate',
      'interviewTimeSlots',
      'pages',
      'partQuestionBank',
      'noticeTitle',
      'noticeContent',
    ],
  })

  useEffect(() => {
    const currentPages = form.getValues('pages')
    const currentBank = form.getValues('partQuestionBank')
    const allQuestionIds = [
      ...currentPages.flatMap((page) => page.questions.map((question) => question.questionId)),
      ...getAllQuestionIdsFromPartBank(currentBank),
    ]
    let nextQuestionId = allQuestionIds.length > 0 ? Math.max(...allQuestionIds) + 1 : 1
    const nextBank: PartQuestionBank = {}

    recruitingPart.forEach((part) => {
      const partKey = getPartKey(part)
      const existingQuestions = currentBank[partKey]
      if (existingQuestions && existingQuestions.length > 0) {
        nextBank[partKey] = existingQuestions
        return
      }
      nextBank[partKey] = [
        {
          questionId: nextQuestionId,
          question: '',
          type: 'LONG_TEXT',
          necessary: true,
          options: [],
          partSinglePick: false,
          isPartQuestion: false,
        },
      ]
      nextQuestionId += 1
    })

    if (JSON.stringify(currentBank) === JSON.stringify(nextBank)) {
      return
    }
    form.setValue('partQuestionBank', nextBank, { shouldDirty: true })
  }, [form, recruitingPart])

  const values = useMemo(
    () => ({
      recruitingName,
      recruitingPart,
      documentStartDate,
      documentEndDate,
      documentResultDate,
      interviewStartDate,
      interviewEndDate,
      finalResultDate,
      interviewTimeSlots,
      pages,
      partQuestionBank,
      noticeTitle,
      noticeContent,
    }),
    [
      recruitingName,
      recruitingPart,
      documentStartDate,
      documentEndDate,
      documentResultDate,
      interviewStartDate,
      interviewEndDate,
      finalResultDate,
      interviewTimeSlots,
      pages,
      partQuestionBank,
      noticeTitle,
      noticeContent,
    ],
  )

  const interviewDates = useMemo(() => {
    if (!interviewStartDate || !interviewEndDate) return []
    const start = dayjs(interviewStartDate).startOf('day')
    const end = dayjs(interviewEndDate).startOf('day')
    if (end.isBefore(start, 'day')) return []
    const dates: Array<string> = []
    let current = start
    while (!current.isAfter(end, 'day')) {
      dates.push(current.format('YYYY/MM/DD'))
      current = current.add(1, 'day')
    }
    return dates
  }, [interviewStartDate, interviewEndDate])

  return { form, values, interviewDates }
}
