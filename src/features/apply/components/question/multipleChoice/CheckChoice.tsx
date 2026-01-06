/** @jsxImportSource @emotion/react */
import { theme } from '@/shared/styles/theme'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import { Flex } from '@/shared/ui/common/Flex'

interface CheckChoiceProps {
  content: string
  isChecked: boolean
  onToggle: () => void
}

export const CheckChoice = ({ content, isChecked, onToggle }: CheckChoiceProps) => {
  return (
    <Flex
      role="button"
      tabIndex={0}
      alignItems="center"
      gap={14}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      css={{ cursor: 'pointer', padding: '4px 0' }}
    >
      <Checkbox checked={isChecked} onCheckedChange={onToggle} tabIndex={-1} />
      <span
        css={{
          color: theme.colors.white,
          userSelect: 'none',
          ...theme.typography.B3.Md,
        }}
      >
        {content}
      </span>
    </Flex>
  )
}
