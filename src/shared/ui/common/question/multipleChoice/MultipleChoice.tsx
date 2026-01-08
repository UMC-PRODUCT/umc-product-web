import { Flex } from '@/shared/ui/common/Flex'

import { CheckChoice } from './CheckChoice'

type QuestionMode = 'view' | 'edit'

interface MultipleChoiceQuestionProps {
  value?: Array<string>
  onChange?: (selectedOptions: Array<string>) => void
  options: Array<string>
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
      {options.map((option, optionIndex) => {
        const isOptionSelected = selectedOptions.includes(option)
        const uniqueKey = `${option}-${optionIndex}`

        return (
          <CheckChoice
            key={uniqueKey}
            content={option}
            isChecked={isOptionSelected}
            onToggle={() => handleOptionToggle(option)}
            mode={mode}
          />
        )
      })}
    </Flex>
  )
}
