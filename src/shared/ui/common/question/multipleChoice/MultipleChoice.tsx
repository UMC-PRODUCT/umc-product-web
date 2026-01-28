import type { QuestionMode } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'

import { CheckChoice } from './CheckChoice'

interface MultipleChoiceQuestionProps {
  value?: Array<string>
  onChange?: (selectedOptions: Array<string>) => void
  options: Array<{
    optionId?: string
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
      {options.map((option, index) => {
        const optionId = option.optionId ?? `${option.content}-${index}`
        const isOptionSelected = selectedOptions.includes(optionId)
        return (
          <CheckChoice
            key={optionId}
            content={option.content}
            isChecked={isOptionSelected}
            onToggle={() => handleOptionToggle(optionId)}
            mode={mode}
          />
        )
      })}
    </Flex>
  )
}
