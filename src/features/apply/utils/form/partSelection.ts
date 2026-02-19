import type { FormQuestion, RecruitmentApplicationForm } from '@/shared/types/form'
import type { PartType } from '@/shared/types/part'

/**
 * 파트 질문(PREFERRED_PART)을 찾습니다.
 */
export function findPartQuestion(
  questionData: RecruitmentApplicationForm,
  sourceQuestionId?: number,
): FormQuestion | undefined {
  for (const page of questionData.pages) {
    const questions = page.questions ?? []
    if (questions.length === 0) continue
    for (const question of questions) {
      if (
        question.type === 'PREFERRED_PART' &&
        (sourceQuestionId == null || question.questionId === sourceQuestionId)
      ) {
        return question
      }
    }
  }
  return undefined
}

/**
 * 파트 질문 답변에서 선택된 파트를 우선순위 순으로 추출합니다.
 */
export function getSelectedPartsFromAnswer(
  answerValue: unknown,
  order: Array<1 | 2>,
): Array<PartType> {
  if (!Array.isArray(answerValue)) return []

  const entries = answerValue as Array<{ id?: number; answer?: PartType }>
  return order
    .map((orderId) => entries.find((entry) => entry.id === orderId)?.answer)
    .filter((part): part is PartType => Boolean(part))
}

/**
 * 제출용 파트 목록을 추출합니다.
 */
export function getSelectedPartsForSubmission(
  questionData: RecruitmentApplicationForm,
  formValues: Record<string, unknown>,
): Array<PartType> {
  const partQuestion = findPartQuestion(questionData)
  if (!partQuestion) return []

  const partQuestionId = partQuestion.questionId
  const order: Array<1 | 2> = [1, 2]
  const maxSelectCountValue = Number(partQuestion.maxSelectCount ?? 0)
  const requiredCount = Math.max(!Number.isNaN(maxSelectCountValue) ? maxSelectCountValue : 0, 1)
  const effectiveOrder = order.slice(0, requiredCount)
  const answerValue = formValues[String(partQuestionId)]
  return getSelectedPartsFromAnswer(answerValue, effectiveOrder)
}
