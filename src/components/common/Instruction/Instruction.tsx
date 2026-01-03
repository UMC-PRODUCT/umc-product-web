import { theme } from '@/styles/theme'
import type { TypoToken } from '@/types/typo'
import { resolveTypo } from '@/utils/resolveTypo'

import * as S from './Instruction.style'

type InstructionProps = {
  content: string
  typography: TypoToken
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  iconSize?: number
  mode: 'success' | 'error' | 'warning'
}

export default function Instruction({
  content,
  typography,
  Icon,
  iconSize = 18,
  mode,
}: InstructionProps) {
  const textStyle = resolveTypo(theme, typography)
  const color = S.getColor(mode)

  return (
    <S.Container>
      <Icon width={iconSize} height={iconSize} fill={color} />
      <S.Text color={color} style={textStyle}>
        {content}
      </S.Text>
    </S.Container>
  )
}
