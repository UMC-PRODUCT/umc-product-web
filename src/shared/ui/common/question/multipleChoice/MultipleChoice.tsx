import type { OptionAnswerValue, QuestionMode } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'

import { CheckChoice } from './CheckChoice'

type ChoiceOption = {
  optionId?: string
  content: string
  isOther?: boolean
}

interface MultipleChoiceQuestionProps {
  value?: OptionAnswerValue
  onChange?: (selectedOptions: OptionAnswerValue) => void
  options: Array<ChoiceOption>
  mode: QuestionMode
}

const getOptionId = (option: ChoiceOption, index: number) =>
  option.optionId ?? `${option.content}-${index}`

export const MultipleChoice = ({ options, value, onChange, mode }: MultipleChoiceQuestionProps) => {
  const selectedOptions = value?.selectedOptionIds ?? []

  const otherOptionEntries = options
    .map((option, index) => ({ option, optionId: getOptionId(option, index) }))
    .filter(({ option }) => option.isOther)
  const otherOptionIds = otherOptionEntries.map(({ optionId }) => optionId)

  const handleOptionToggle = (optionId: string) => {
    const isCurrentlySelected = selectedOptions.includes(optionId)

    const updatedSelection = isCurrentlySelected
      ? selectedOptions.filter((option) => option !== optionId)
      : [...selectedOptions, optionId]

    const shouldKeepOtherText = otherOptionIds.some((id) => updatedSelection.includes(id))

    const nextValue: OptionAnswerValue = {
      selectedOptionIds: updatedSelection,
      ...(shouldKeepOtherText ? { otherText: value?.otherText } : {}),
    }
    onChange?.(nextValue)
  }

  const handleOtherTextChange = (optionId: string, text: string) => {
    const hasText = text.trim().length > 0
    const isCurrentlySelected = selectedOptions.includes(optionId)
    const updatedSelection = hasText
      ? isCurrentlySelected
        ? selectedOptions
        : [...selectedOptions, optionId]
      : selectedOptions.filter((selected) => selected !== optionId)

    const nextValue: OptionAnswerValue = {
      selectedOptionIds: updatedSelection,
      ...(hasText ? { otherText: text } : {}),
    }

    onChange?.(nextValue)
  }

  return (
    <Flex flexDirection="column" gap={10}>
      {options.map((option, index) => {
        const optionId = getOptionId(option, index)
        const isOptionSelected = selectedOptions.includes(optionId)
        const isOtherOption = option.isOther ?? false

        return (
          <CheckChoice
            key={optionId}
            content={option.content}
            isChecked={isOptionSelected}
            onToggle={() => handleOptionToggle(optionId)}
            mode={mode}
            isOtherOption={isOtherOption}
            otherInputValue={isOtherOption ? (value?.otherText ?? '') : undefined}
            onOtherInputChange={
              isOtherOption ? (text) => handleOtherTextChange(optionId, text) : undefined
            }
          />
        )
      })}
    </Flex>
  )
}
