import type { RecruitingForms } from '@/shared/types/form'
import type { PartType } from '@/shared/types/part'

export const isPartItemsValid = (items: RecruitingForms['items'], targetPart: PartType) => {
  const partItems = items.filter(
    (item) => item.target.kind === 'PART' && item.target.part === targetPart,
  )
  if (partItems.length === 0) return false
  return partItems.every((item) => {
    const questionText = item.question.questionText
    if (typeof questionText !== 'string' || questionText.trim().length === 0) return false
    if (item.question.type !== 'CHECKBOX' && item.question.type !== 'RADIO') return true
    const options = Array.isArray(item.question.options) ? item.question.options : []
    if (options.length === 0) return false
    const normalized = options.map((option) => option.content.trim())
    if (normalized.some((content) => content.length === 0)) return false
    const unique = new Set(normalized)
    return unique.size === normalized.length
  })
}
