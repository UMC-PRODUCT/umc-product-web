import type { PartType } from '@/shared/types/umc'

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
