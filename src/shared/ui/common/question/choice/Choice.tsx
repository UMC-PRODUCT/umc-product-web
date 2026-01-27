import type { QuestionMode } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'

import RadioChoice from './RadioChoice'

interface SingleChoiceQuestionProps {
  value?: string
  onChange?: (selectedOption: string) => void
  options: Array<{
    optionId: number
    content: string
  }>
  mode: QuestionMode
}

export const Choice = ({ value, onChange, options, mode }: SingleChoiceQuestionProps) => {
  const isEditable = mode === 'edit'

  const handleOptionSelect = (selectedOption: string) => {
    onChange?.(selectedOption)
  }

  return (
    <Flex flexDirection="column" gap={10}>
      {options.map((option) => {
        const uniqueKey = `choice-${option.optionId}`
        const handleClick = isEditable ? () => handleOptionSelect(option.content) : undefined

        return (
          <RadioChoice
            key={uniqueKey}
            content={option.content}
            value={value}
            mode={mode}
            onClick={handleClick}
          />
        )
      })}
    </Flex>
  )
}
