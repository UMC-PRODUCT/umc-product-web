import type { PartType } from '@/features/auth/domain'
import type { RecruitingItem } from '@/shared/types/form'

const PREFERRED_PART_TEXT = '희망하는 파트를 선택해 주세요.'
const SCHEDULE_TEXT = '면접 가능한 시간을 선택해 주세요.'

export const buildPreferredPartItem = (): RecruitingItem => ({
  target: { kind: 'COMMON_PAGE', pageNo: 1 },
  question: {
    type: 'PREFERRED_PART',
    questionText: PREFERRED_PART_TEXT,
    required: true,
    orderNo: 1,
  },
})

export const buildScheduleItem = (): RecruitingItem => ({
  target: { kind: 'COMMON_PAGE', pageNo: 2 },
  question: {
    type: 'SCHEDULE',
    questionText: SCHEDULE_TEXT,
    required: true,
    orderNo: 1,
  },
})

export const buildDefaultPage2Item = (): RecruitingItem => ({
  target: { kind: 'COMMON_PAGE', pageNo: 2 },
  question: {
    type: 'LONG_TEXT',
    questionText: '',
    required: true,
    orderNo: 1,
  },
})

export const buildDefaultPartItem = (part: PartType): RecruitingItem => ({
  target: { kind: 'PART', part, pageNo: 2 },
  question: {
    type: 'LONG_TEXT',
    questionText: '',
    required: true,
    orderNo: 1,
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

export const ensureRequiredItems = (
  items: Array<RecruitingItem>,
  recruitmentParts: Array<PartType>,
) => {
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
    .filter((item) => item.target.kind !== 'PART' || recruitmentParts.includes(item.target.part!))

  if (!hasPreferredPartItem(next)) {
    next.push(buildPreferredPartItem())
  }
  if (!hasScheduleItem(next)) {
    next.push(buildScheduleItem())
  }
  if (!hasPage2CommonItem(next)) {
    next.push(buildDefaultPage2Item())
  }

  recruitmentParts.forEach((part) => {
    const hasPartQuestions = next.some(
      (item) => item.target.kind === 'PART' && item.target.part === part,
    )
    if (!hasPartQuestions) {
      next.push(buildDefaultPartItem(part))
    }
  })

  return next
}
