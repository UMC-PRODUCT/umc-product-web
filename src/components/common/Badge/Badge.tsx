import { useTheme } from '@emotion/react'

import type { TypoToken } from '@/types/typo'
import { resolveTypo } from '@/utils/resolveTypo'

import { getTone } from './Badge.style'

type toneType = 'lime' | 'gray' | 'white'

export default function Badge({
  content,
  tone,
  typo,
  variant,
}: {
  content: string
  tone: toneType
  variant: 'solid' | 'outline'
  typo: TypoToken
}) {
  const theme = useTheme()
  const toneMap = getTone(theme)
  const t = toneMap[tone][variant]
  const textStyle = resolveTypo(theme, typo)

  return (
    <div
      css={{
        borderRadius: 20,
        padding: '3px 10px',
        textAlign: 'center',
        width: 'fit-content',
        height: 'fit-content',
        background: t.background,
        color: t.color,
        border: t.border,
        ...textStyle,
      }}
    >
      {content}
    </div>
  )
}
