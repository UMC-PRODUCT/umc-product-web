import type { QuestionMode, RecruitingPart } from '@/shared/types/form'

import { Button } from '../../Button'
import { Flex } from '../../Flex'
import * as S from './PartChoice.style'

type PartChoiceProps = {
  value: Array<{ id: number; answer: RecruitingPart }> | undefined
  onChange?: (selectedOptions: Array<{ id: number; answer: RecruitingPart }>) => void
  mode: QuestionMode
  preferredPartOptions: Array<{
    recruitmentPartId: number
    label: string
    value: RecruitingPart
  }>
  maxSelectCount: number | null
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
    typeof maxSelectCount === 'number' ? Math.max(maxSelectCount, 0) : 0
  const ranks = Array.from({ length: normalizedMaxSelectCount }, (_, index) => index + 1)

  const handleOptionSelect = (targetId: number, option: RecruitingPart) => {
    const updatedSelection = selectedOptions.some((item) => item.id === targetId)
      ? selectedOptions.map((item) => (item.id === targetId ? { ...item, answer: option } : item))
      : [...selectedOptions, { id: targetId, answer: option }]

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
            <Flex height={60} css={{ overflowX: 'auto' }}>
              <Flex gap={20} height={37} width={'fit-content'}>
                {renderedOptions.map((option) => (
                  <Button
                    variant="outline"
                    tone={selectedOption === option.value ? 'lime' : 'gray'}
                    key={`${option.recruitmentPartId}-${targetId}`}
                    label={option.label}
                    type="button"
                    onClick={
                      mode === 'edit' ? () => handleOptionSelect(targetId, option.value) : undefined
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
