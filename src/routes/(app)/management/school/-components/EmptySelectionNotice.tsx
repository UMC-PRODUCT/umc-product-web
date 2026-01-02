import Flex from '@/components/common/Flex/Flex'
import { theme } from '@/styles/theme'

export function EmptySelectionNotice() {
  return (
    <Flex
      width="100%"
      justifyContent="center"
      css={{
        border: `1px solid ${theme.colors.gray[600]}`,
        borderRadius: '8px',
        padding: '80px 0',
        color: theme.colors.gray[300],
        ...theme.typography.B3.Rg,
      }}
    >
      선택된 학교가 없습니다.
    </Flex>
  )
}
