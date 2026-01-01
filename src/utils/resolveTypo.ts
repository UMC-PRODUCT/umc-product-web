import type { TypoGroup, TypoToken } from '@/types/typo'
import type { Theme } from '@emotion/react'

export const resolveTypo = (
  theme: Theme,
  token?: TypoToken,
): Theme['typography'][TypoGroup][keyof Theme['typography'][TypoGroup]] => {
  if (!token) return theme.typography.B3.Md

  const [group, variant] = token.split('.')
  if (!group || !variant) return theme.typography.B3.Md

  const groupKey = group as TypoGroup
  const groupTypo = theme.typography[groupKey]
  const variantKey = variant as keyof typeof groupTypo

  if (variantKey in groupTypo) return groupTypo[variantKey]

  return theme.typography.B3.Md
}
