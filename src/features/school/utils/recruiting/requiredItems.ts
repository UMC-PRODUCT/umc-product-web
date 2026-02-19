import type { RecruitingItem } from '@/shared/types/form'
import type { PartType } from '@/shared/types/part'

const PREFERRED_PART_TEXT = '희망하는 파트를 선택해 주세요.'
const SCHEDULE_TEXT = '면접 가능한 시간을 선택해 주세요.'

export const buildPreferredPartItem = (): RecruitingItem => ({
  target: { kind: 'COMMON_PAGE', pageNo: 1 },
  question: {
    type: 'PREFERRED_PART',
    questionText: PREFERRED_PART_TEXT,
    required: true,
    orderNo: '1',
  },
})

export const buildScheduleItem = (): RecruitingItem => ({
  target: { kind: 'COMMON_PAGE', pageNo: 2 },
  question: {
    type: 'SCHEDULE',
    questionText: SCHEDULE_TEXT,
    required: true,
    orderNo: '1',
  },
})

export const buildDefaultPage2Item = (): RecruitingItem => ({
  target: { kind: 'COMMON_PAGE', pageNo: 2 },
  question: {
    type: 'LONG_TEXT',
    questionText: '',
    required: true,
    orderNo: '1',
  },
})

export const buildDefaultPartItem = (part: PartType): RecruitingItem => ({
  target: { kind: 'PART', part, pageNo: 2 },
  question: {
    type: 'LONG_TEXT',
    questionText: '',
    required: true,
    orderNo: '1',
  },
})

export const hasPreferredPartItem = (items: Array<RecruitingItem>) =>
  items.some(
    (item) =>
      item.target.kind === 'COMMON_PAGE' &&
      item.target.pageNo === 1 &&
      item.question.type === 'PREFERRED_PART',
  )

export const hasScheduleItem = (items: Array<RecruitingItem>) =>
  items.some(
    (item) =>
      item.target.kind === 'COMMON_PAGE' &&
      item.target.pageNo === 2 &&
      item.question.type === 'SCHEDULE',
  )

export const hasPage2CommonItem = (items: Array<RecruitingItem>) =>
  items.some((item) => item.target.kind === 'COMMON_PAGE' && item.target.pageNo === 2)

export type EnsureRequiredItemsOptions = {
  requirePreferred?: boolean
  requireSchedule?: boolean
  requirePage2?: boolean
  requireParts?: Array<PartType>
}

export const normalizeItems = (items: Array<RecruitingItem>, recruitmentParts: Array<PartType>) => {
  const uniqueParts = Array.from(new Set(recruitmentParts))
  const existingPartSet = new Set(
    items
      .filter((item) => item.target.kind === 'PART' && item.target.part)
      .map((item) => item.target.part as PartType),
  )
  const hasRealPartItem = (part: PartType, targetItems: Array<RecruitingItem>) =>
    targetItems.some(
      (item) =>
        item.target.kind === 'PART' &&
        item.target.part === part &&
        (Boolean(item.question.questionId) ||
          (typeof item.question.questionText === 'string' &&
            item.question.questionText.trim().length > 0)),
    )
  let hasPreferred = false
  let hasSchedule = false

  const next = items
    .map((item) => {
      if (item.question.type === 'PREFERRED_PART') {
        return { ...item, target: { kind: 'COMMON_PAGE' as const, pageNo: 1 } }
      }
      if (item.question.type === 'SCHEDULE') {
        return { ...item, target: { kind: 'COMMON_PAGE' as const, pageNo: 2 } }
      }
      return item
    })
    .filter((item) => {
      if (item.question.type === 'PREFERRED_PART') {
        if (hasPreferred) return false
        hasPreferred = true
        return true
      }
      if (item.question.type === 'SCHEDULE') {
        if (hasSchedule) return false
        hasSchedule = true
        return true
      }
      return true
    })
    .filter((item) => {
      if (item.target.kind !== 'PART' || !item.target.part) return true
      const partKey = item.target.part
      const shouldDropPlaceholder =
        !item.question.questionId &&
        (typeof item.question.questionText !== 'string' ||
          item.question.questionText.trim().length === 0) &&
        hasRealPartItem(partKey, items)
      return !shouldDropPlaceholder
    })
    .filter((item) => item.target.kind !== 'PART' || uniqueParts.includes(item.target.part!))

  return { next, uniqueParts, existingPartSet }
}

export const ensureRequiredItems = (
  items: Array<RecruitingItem>,
  recruitmentParts: Array<PartType>,
  options: EnsureRequiredItemsOptions = {},
) => {
  const {
    requirePreferred = false,
    requireSchedule = false,
    requirePage2 = false,
    requireParts = [],
  } = options

  const { next, uniqueParts, existingPartSet } = normalizeItems(items, recruitmentParts)

  if (requirePreferred && !hasPreferredPartItem(next)) {
    next.push(buildPreferredPartItem())
  }
  if (requireSchedule && !hasScheduleItem(next)) {
    next.push(buildScheduleItem())
  }
  if (requirePage2 && !hasPage2CommonItem(next)) {
    next.push(buildDefaultPage2Item())
  }

  requireParts
    .filter((part) => uniqueParts.includes(part))
    .forEach((part) => {
      const hasPartQuestions =
        existingPartSet.has(part) ||
        next.some((item) => item.target.kind === 'PART' && item.target.part === part)
      if (!hasPartQuestions) {
        next.push(buildDefaultPartItem(part))
      }
    })

  return next
}
