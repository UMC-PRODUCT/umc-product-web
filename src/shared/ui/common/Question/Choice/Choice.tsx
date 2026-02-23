import type { OptionAnswerValue, QuestionMode } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'

import RadioChoice from './RadioChoice'

type ChoiceOption = {
  optionId?: string
  content: string
  isOther?: boolean
}

interface SingleChoiceQuestionProps {
  value?: OptionAnswerValue
  onChange?: (selectedOption: OptionAnswerValue) => void
  options: Array<ChoiceOption>
  mode: QuestionMode
}

const getOptionId = (option: ChoiceOption, index: number) =>
  option.optionId ?? `${option.content}-${index}`

export const Choice = ({ value, onChange, options, mode }: SingleChoiceQuestionProps) => {
  const isEditable = mode === 'edit'
  const radioGroupName = 'question-choice'
  const selectedOptions = value?.selectedOptionIds ?? []
  const selectedOptionId = selectedOptions[0]

  const handleOptionSelect = (optionId: string, isOtherOption: boolean) => {
    const nextValue: OptionAnswerValue = {
      selectedOptionIds: [optionId],
      ...(isOtherOption ? { otherText: value?.otherText } : {}),
    }
    onChange?.(nextValue)
  }

  const handleOtherTextChange = (text: string, optionId: string) => {
    if (!isEditable) return
    const hasText = text.length > 0
    const nextSelection = hasText ? [optionId] : selectedOptions
    onChange?.({
      selectedOptionIds: nextSelection,
      otherText: text,
    })
  }

  return (
    <Flex flexDirection="column" gap={10}>
      {options.map((option, index) => {
        const optionId = getOptionId(option, index)
        const handleClick = isEditable
          ? () => handleOptionSelect(optionId, Boolean(option.isOther))
          : undefined
        const isOtherOption = option.isOther ?? false
        return (
          <RadioChoice
            key={optionId}
            optionId={optionId}
            content={option.content}
            value={selectedOptionId}
            groupName={radioGroupName}
            mode={mode}
            onClick={handleClick}
            isOtherOption={isOtherOption}
            otherInputValue={isOtherOption ? (value?.otherText ?? '') : undefined}
            onOtherInputChange={
              isOtherOption ? (text) => handleOtherTextChange(text, optionId) : undefined
            }
          />
        )
      })}
    </Flex>
  )
}
