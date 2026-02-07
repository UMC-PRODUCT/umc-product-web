import type { PartType } from '@features/auth/domain'

import { PART_TYPE_TO_SMALL_PART } from '@shared/constants/part'

import type { RecruitingForms } from '@/features/school/domain'
import type { FormPage, FormQuestion } from '@/shared/types/form'

import { DEFAULT_RECRUITING_PARTS } from '../domain/constants'
import type { ResumeFormValues } from './buildDefaultValuesFromQuestions'
import { findPartQuestion } from './findPartQuestion'
import { getSelectedPartsFromAnswer } from './getSelectedPartsFromAnswer'

const PART_ORDER: Array<1 | 2> = [1, 2]

const buildPartQuestions = (
  groups: Array<{ part: PartType; questions: Array<FormQuestion> }>,
  part: PartType,
) =>
  groups
    .filter((group) => group.part === part)
    .flatMap((group) =>
      Array.isArray(group.questions) ? group.questions : (group.questions as Array<FormQuestion>),
    )

const buildPartGroups = (
  groups: Array<{ part: PartType; questions: Array<FormQuestion> }>,
  parts: ReadonlyArray<PartType>,
  useRankLabel: boolean,
) =>
  parts
    .map((part, index) => {
      const label = useRankLabel
        ? `${index + 1}지망 - ${PART_TYPE_TO_SMALL_PART[part]}`
        : `${PART_TYPE_TO_SMALL_PART[part]} 파트 질문`
      return {
        part,
        label,
        questions: buildPartQuestions(groups, part),
      }
    })
    .filter((group) => group.questions.length > 0)

const flattenPartGroups = (
  groups: Array<{ part: PartType; label: string; questions: Array<FormQuestion> }>,
) =>
  groups.flatMap((group) =>
    group.questions.map((question) => ({
      ...question,
      __partLabel: group.label,
    })),
  )

const hasPartQuestions = (page: FormPage) =>
  Array.isArray(page.partQuestions) && page.partQuestions.length > 0

const applyPartGroupsToPage = (
  page: FormPage,
  groups: Array<{ part: PartType; label: string; questions: Array<FormQuestion> }>,
) =>
  hasPartQuestions(page)
    ? {
        ...page,
        partQuestions: groups,
        questions: flattenPartGroups(groups),
      }
    : page

const addPageNumbers = (pageList: Array<FormPage>) =>
  pageList.map((page, index) => ({ ...page, page: index + 1 }))

export function resolvePagesWithSlots(
  questionData: RecruitingForms,
  formValues: ResumeFormValues,
  options?: { labelMode?: 'ranked' | 'part'; showAllParts?: boolean },
) {
  const labelMode = options?.labelMode ?? 'ranked'
  const showAllParts = options?.showAllParts ?? false

  const pages = Array.isArray(questionData.pages) ? questionData.pages : []
  const partQuestionGroups = pages.flatMap((page) =>
    Array.isArray(page.partQuestions) ? page.partQuestions : [],
  )

  const partQuestion = findPartQuestion(questionData)
  const availableParts = Array.from(new Set(partQuestionGroups.map((group) => group.part)))
  const resolvedParts = availableParts.length > 0 ? availableParts : DEFAULT_RECRUITING_PARTS

  const partQuestionId = partQuestion?.questionId
  const maxSelectCountValue = partQuestion
    ? Number(partQuestion.maxSelectCount ?? partQuestion.options.length)
    : 1
  const normalizedMaxCount = !Number.isNaN(maxSelectCountValue) ? maxSelectCountValue : 1
  const requiredCount = Math.max(normalizedMaxCount, 1)
  const effectiveOrder = PART_ORDER.slice(0, requiredCount)

  const answerValue = partQuestionId !== undefined ? formValues[String(partQuestionId)] : undefined
  const selectedParts = getSelectedPartsFromAnswer(answerValue, effectiveOrder)
  const shouldUsePreferenceLabels = selectedParts.length > 0 && !showAllParts
  const partsToShow = shouldUsePreferenceLabels ? selectedParts : resolvedParts
  const limitedParts = shouldUsePreferenceLabels ? partsToShow.slice(0, requiredCount) : partsToShow
  const filteredParts = limitedParts.length > 0 ? limitedParts : resolvedParts

  const useRankLabelForAll = labelMode !== 'part'
  const allGroups = buildPartGroups(partQuestionGroups, resolvedParts, useRankLabelForAll)
  const limitedGroups = buildPartGroups(
    partQuestionGroups,
    filteredParts,
    shouldUsePreferenceLabels,
  )

  if (!partQuestion || showAllParts) {
    const resolved = pages.map((page) => applyPartGroupsToPage(page, allGroups))
    return addPageNumbers(resolved)
  }

  const resolved = pages.map((page) => applyPartGroupsToPage(page, limitedGroups))
  return addPageNumbers(resolved)
}
