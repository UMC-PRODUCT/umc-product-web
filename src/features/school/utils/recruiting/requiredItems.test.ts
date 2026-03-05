import { describe, expect, it } from 'vitest'

import type { RecruitingItem } from '@/shared/types/form'

import { ensureRequiredItems } from './requiredItems'

const makePartPlaceholder = (part: 'WEB' | 'IOS'): RecruitingItem => ({
  target: { kind: 'PART', part, pageNo: 2 },
  question: {
    type: 'LONG_TEXT',
    questionText: '',
    required: true,
    orderNo: '1',
  },
})

const makePartRealQuestion = (part: 'WEB' | 'IOS'): RecruitingItem => ({
  target: { kind: 'PART', part, pageNo: 2 },
  question: {
    questionId: 100,
    type: 'LONG_TEXT',
    questionText: '실제 질문',
    required: true,
    orderNo: '2',
  },
})

describe('required items smoke tests', () => {
  it('adds missing preferred/schedule/page2/part required items', () => {
    const result = ensureRequiredItems([], ['WEB', 'IOS'], {
      requirePreferred: true,
      requireSchedule: true,
      requirePage2: true,
      requireParts: ['WEB', 'IOS'],
    })

    expect(
      result.some(
        (item) =>
          item.target.kind === 'COMMON_PAGE' &&
          item.target.pageNo === 1 &&
          item.question.type === 'PREFERRED_PART',
      ),
    ).toBe(true)
    expect(
      result.some(
        (item) =>
          item.target.kind === 'COMMON_PAGE' &&
          item.target.pageNo === 2 &&
          item.question.type === 'SCHEDULE',
      ),
    ).toBe(true)
    expect(result.some((item) => item.target.kind === 'PART' && item.target.part === 'WEB')).toBe(
      true,
    )
    expect(result.some((item) => item.target.kind === 'PART' && item.target.part === 'IOS')).toBe(
      true,
    )
  })

  it('deduplicates required items and drops placeholder when real part question exists', () => {
    const duplicated: Array<RecruitingItem> = [
      {
        target: { kind: 'COMMON_PAGE', pageNo: 1 },
        question: { type: 'PREFERRED_PART', questionText: '희망', required: true, orderNo: '1' },
      },
      {
        target: { kind: 'COMMON_PAGE', pageNo: 1 },
        question: { type: 'PREFERRED_PART', questionText: '희망2', required: true, orderNo: '2' },
      },
      makePartPlaceholder('WEB'),
      makePartRealQuestion('WEB'),
    ]

    const result = ensureRequiredItems(duplicated, ['WEB'], {
      requirePreferred: true,
      requireParts: ['WEB'],
    })

    const preferredCount = result.filter((item) => item.question.type === 'PREFERRED_PART').length
    expect(preferredCount).toBe(1)

    const webPartCount = result.filter(
      (item) => item.target.kind === 'PART' && item.target.part === 'WEB',
    ).length
    expect(webPartCount).toBe(1)
    expect(
      result.find((item) => item.target.kind === 'PART' && item.target.part === 'WEB')?.question
        .questionId,
    ).toBe(100)
  })
})
