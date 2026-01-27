import type { PartType } from '@features/auth/domain'

import type { RecruitingForms } from '@/features/school/domain'
import type { RecruitingPart } from '@/shared/types/form'

import type { ResumeFormValues } from './buildDefaultValuesFromQuestions'
import { findPartQuestion } from './findPartQuestion'
import { getSelectedPartsFromAnswer } from './getSelectedPartsFromAnswer'

const DEFAULT_RECRUITING_PARTS: Array<RecruitingPart> = [
  'PLAN',
  'DESIGN',
  'WEB',
  'IOS',
  'ANDROID',
  'SPRINGBOOT',
  'NODEJS',
]

const PART_TYPE_TO_RECRUITING_PART: Record<PartType, RecruitingPart> = {
  Plan: 'PLAN',
  Design: 'DESIGN',
  Web: 'WEB',
  iOS: 'IOS',
  Android: 'ANDROID',
  SpringBoot: 'SPRINGBOOT',
  'Node.js': 'NODEJS',
}

export function resolvePagesWithSlots(
  questionData: RecruitingForms,
  formValues: ResumeFormValues,
  options?: { labelMode?: 'ranked' | 'part'; showAllParts?: boolean },
) {
  const partQuestionId = 3
  const partOrder: Array<1 | 2> = [1, 2]
  const labelMode = options?.labelMode ?? 'ranked'
  const showAllParts = options?.showAllParts ?? false

  const pages = Array.isArray(questionData.pages) ? questionData.pages : []
  const partQuestionGroups = pages.flatMap((page) =>
    Array.isArray(page.partQuestions) ? page.partQuestions : [],
  )

  const partQuestion = findPartQuestion(questionData, partQuestionId)
  const availableParts = Array.from(new Set(partQuestionGroups.map((group) => group.part)))
  const resolvedParts = availableParts.length > 0 ? availableParts : DEFAULT_RECRUITING_PARTS

  const mapPartQuestions = (part: RecruitingPart, label: string) =>
    partQuestionGroups
      .filter((group) => group.part === part)
      .flatMap((group) => group.questions.map((question) => ({ ...question, __partLabel: label })))

  const mergedCommonQuestions = (parts: Array<RecruitingPart>) =>
    parts.flatMap((part, index) => {
      const label = labelMode === 'part' ? `${part} 파트 질문` : `${index + 1}지망 - ${part}`
      return mapPartQuestions(part, label)
    })

  const resolvedPages = (questions: Array<RecruitingPart>) => {
    const mergedQuestions = mergedCommonQuestions(questions)
    return pages.map((page) => {
      if (page.page !== 3) {
        return page
      }

      return {
        ...page,
        questions: mergedQuestions,
      }
    })
  }

  if (!partQuestion || showAllParts) {
    const resolved = resolvedPages(resolvedParts)
    return resolved.map((page, index) => ({ ...page, page: index + 1 }))
  }

  const answerValue = formValues[String(partQuestionId)]
  const requiredCount = Math.max(partQuestion.options.length, 1)
  const effectiveOrder = partOrder.slice(0, requiredCount)
  const selectedParts = getSelectedPartsFromAnswer(answerValue, effectiveOrder)

  const preferenceParts = effectiveOrder.map((_, index) => {
    const selectedPart = selectedParts[index]
    const normalized = PART_TYPE_TO_RECRUITING_PART[selectedPart]
    return normalized
  })
  const resolved = resolvedPages(preferenceParts)
  return resolved.map((page, index) => ({ ...page, page: index + 1 }))
}
