import type { TypoGroup, TypoToken } from '@/types/typo'
import type { Theme } from '@emotion/react'

export const resolveTypo = (theme: Theme, token?: TypoToken) => {
  if (!token) return undefined
  const [group, variant] = token.split('.')
  if (!group || !variant) return undefined
  const groupKey = group as TypoGroup
  const variantKey = variant as keyof Theme['typography'][TypoGroup]
  return theme.typography[groupKey]?.[variantKey]
}
