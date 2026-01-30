import type { PartType } from '@/features/auth/domain'
import type { QuestionMode } from '@/shared/types/form'

import { Button } from '../../Button'
import { Flex } from '../../Flex'
import * as S from './PartChoice.style'

type PartSelectionValue = {
  id: number
  answer: PartType
  recruitmentPartId?: string
}

type PartChoiceProps = {
  value: Array<PartSelectionValue> | undefined
  onChange?: (selectedOptions: Array<PartSelectionValue>) => void
  mode: QuestionMode
  preferredPartOptions: Array<{
    recruitmentPartId: string | number
    label: string
    value: PartType
  }>
  maxSelectCount: string | null
}
const PartChoice = ({
  maxSelectCount,
  value,
  preferredPartOptions,
  mode,
  onChange,
}: PartChoiceProps) => {
  const selectedOptions = Array.isArray(value) ? value : []
  const renderedOptions = Array.isArray(preferredPartOptions) ? preferredPartOptions : []
  const normalizedMaxSelectCount =
    typeof maxSelectCount === 'string' ? Math.max(Number(maxSelectCount), 1) : 1
  const ranks = Array.from({ length: normalizedMaxSelectCount }, (_, index) => index + 1)

  const handleOptionSelect = (
    targetId: number,
    optionValue: PartType,
    recruitmentPartId: string | number,
  ) => {
    const normalizedRecruitmentPartId = String(recruitmentPartId)
    const optionEntry = {
      id: targetId,
      answer: optionValue,
      recruitmentPartId: normalizedRecruitmentPartId,
    }
    const updatedSelection = selectedOptions.some((item) => item.id === targetId)
      ? selectedOptions.map((item) =>
          item.id === targetId
            ? { ...item, answer: optionValue, recruitmentPartId: normalizedRecruitmentPartId }
            : item,
        )
      : [...selectedOptions.filter((item) => item.id !== targetId), optionEntry]

    onChange?.(updatedSelection)
  }

  const getSelectedOption = (targetId: number) =>
    selectedOptions.find((item) => item.id === targetId)?.answer
  return (
    <Flex flexDirection="column" gap={22}>
      {ranks.map((targetId) => {
        const selectedOption = getSelectedOption(targetId)

        return (
          <Flex key={targetId} gap={13}>
            <S.StyledSpan>{targetId}지망:</S.StyledSpan>
            <Flex css={{ overflowX: 'auto' }}>
              <Flex gap={20} height={37} width={'fit-content'}>
                {renderedOptions.map((option) => (
                  <Button
                    variant="outline"
                    tone={selectedOption === option.value ? 'lime' : 'gray'}
                    key={`${String(option.recruitmentPartId)}-${targetId}`}
                    label={option.label}
                    type="button"
                    onClick={
                      mode === 'edit'
                        ? () => handleOptionSelect(targetId, option.value, option.recruitmentPartId)
                        : undefined
                    }
                    css={{
                      width: 'fit-content',
                      cursor: mode === 'edit' ? 'pointer' : 'default',
                    }}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default PartChoice
