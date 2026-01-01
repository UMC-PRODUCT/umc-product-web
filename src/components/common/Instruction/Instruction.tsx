import type { TypoToken } from '@/types/typo'
import { theme } from '@/styles/theme'
import { resolveTypo } from '@/utils/resolveTypo'
import Flex from '@/components/common/Flex/Flex'

export default function Instruction({
  content,
  typography,
  Icon,
  iconSize,
  mode,
}: {
  content: string
  typography: TypoToken
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  iconSize?: number
  mode: 'success' | 'error' | 'warning'
}) {
  const textStyle = resolveTypo(theme, typography)
  const color =
    mode === 'success'
      ? theme.colors.lime
      : mode === 'error'
        ? theme.colors.necessary
        : theme.colors.caution
  const IconWithColor = () => (
    <Icon width={iconSize || 18} height={iconSize || 18} fill={color} />
  )
  return (
    <Flex
      alignItems="center"
      width="fit-content"
      css={{
        alignSelf: 'center',
      }}
    >
      <IconWithColor />
      <span style={{ ...textStyle, marginLeft: '8px', color }}>{content}</span>
    </Flex>
  )
}
