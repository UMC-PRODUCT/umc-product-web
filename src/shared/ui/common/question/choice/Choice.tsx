import { Flex } from '@/shared/ui/common/Flex'

import RadioChoice from './RadioChoice'

type QuestionMode = 'view' | 'edit'

interface SingleChoiceQuestionProps {
  value?: string
  onChange?: (selectedOption: string) => void
  options: Array<string>
  mode: QuestionMode
}

export const Choice = ({ value, onChange, options, mode }: SingleChoiceQuestionProps) => {
  const isEditable = mode === 'edit'

  const handleOptionSelect = (selectedOption: string) => {
    onChange?.(selectedOption)
  }

  return (
    <Flex flexDirection="column" gap={10}>
      {options.map((option, optionIndex) => {
        const uniqueKey = `choice-${optionIndex}`
        const handleClick = isEditable ? () => handleOptionSelect(option) : undefined

        return (
          <RadioChoice
            key={uniqueKey}
            content={option}
            value={value}
            mode={mode}
            onClick={handleClick}
          />
        )
      })}
    </Flex>
  )
}
