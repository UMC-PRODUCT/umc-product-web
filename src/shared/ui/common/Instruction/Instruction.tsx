import { theme } from '@shared/styles/theme'
import type { TypoToken } from '@shared/types/typo'
import { resolveTypo } from '@shared/utils/resolveTypo'

import * as S from './Instruction.style'

type InstructionProps = {
  content: string
  typography: TypoToken
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  iconSize?: number
  mode: 'success' | 'error' | 'warning'
}

const Instruction = ({ content, typography, Icon, iconSize = 18, mode }: InstructionProps) => {
  const textStyle = resolveTypo(theme, typography)
  const color = S.getColor(mode)

  return (
    <S.Container>
      <Icon width={iconSize} height={iconSize} fill={color} color={color} />
      <S.Text $color={color} style={textStyle}>
        {content}
      </S.Text>
    </S.Container>
  )
}

export default Instruction
