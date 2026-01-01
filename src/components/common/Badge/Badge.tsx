import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { getTone } from '../Button/Button.style'
import type { TypoToken } from '@/types/typo'
import { resolveTypo } from '@/utils/resolveTypo'

type toneType = 'lime' | 'gray'
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

  const BadgeDiv = styled.div`
    border-radius: 20px;
    padding: 3px 10px;
    text-align: center;
    width: fit-content;
    height: fit-content;
    background: ${t.background};
    color: ${t.color};
    border: ${t.border};
    ${textStyle}
  `
  return <BadgeDiv>{content}</BadgeDiv>
}
