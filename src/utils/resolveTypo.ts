import type { Theme } from '@emotion/react'

import type { TypoGroup, TypoToken } from '@/types/typo'

type TypoStyle = Record<string, string | number>

export const resolveTypo = (theme: Theme, token?: TypoToken): TypoStyle => {
  if (!token) return theme.typography.B3.Md

  const [group, variant] = token.split('.')
  if (!group || !variant) return theme.typography.B3.Md

  const groupKey = group as TypoGroup
  const groupTypo = theme.typography[groupKey]

  if (variant in groupTypo) {
    return groupTypo[variant as keyof typeof groupTypo]
  }

  return theme.typography.B3.Md
}
