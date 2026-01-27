import type { QuestionMode } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'

import { CheckChoice } from './CheckChoice'

interface MultipleChoiceQuestionProps {
  value?: Array<string>
  onChange?: (selectedOptions: Array<string>) => void
  options: Array<{
    optionId: number
    content: string
  }>
  mode: QuestionMode
}

export const MultipleChoice = ({
  options,
  value = [],
  onChange,
  mode,
}: MultipleChoiceQuestionProps) => {
  const selectedOptions = Array.isArray(value) ? value : []

  const handleOptionToggle = (toggledOption: string) => {
    const isCurrentlySelected = selectedOptions.includes(toggledOption)

    const updatedSelection = isCurrentlySelected
      ? selectedOptions.filter((option) => option !== toggledOption)
      : [...selectedOptions, toggledOption]

    onChange?.(updatedSelection)
  }

  return (
    <Flex flexDirection="column" gap={10}>
      {options.map((option) => {
        const isOptionSelected = selectedOptions.includes(String(option.optionId))
        return (
          <CheckChoice
            key={option.optionId}
            content={option.content}
            isChecked={isOptionSelected}
            onToggle={() => handleOptionToggle(String(option.optionId))}
            mode={mode}
          />
        )
      })}
    </Flex>
  )
}
