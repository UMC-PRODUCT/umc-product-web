import type { PartType } from '@/shared/types/umc'

import { Button } from '../../Button'
import { Flex } from '../../Flex'
import * as S from './PartChoice.style'

type PartChoiceProps = {
  value: Array<{ id: number; answer: PartType }> | undefined
  onChange?: (selectedOptions: Array<{ id: number; answer: PartType }>) => void
  mode: 'view' | 'edit'
  options: Array<{ id: number; options: Array<PartType> }>
}
const PartChoice = ({ value, options, mode, onChange }: PartChoiceProps) => {
  const selectedOptions = Array.isArray(value) ? value : []

  const handleOptionSelect = (targetId: number, option: PartType) => {
    const updatedSelection = selectedOptions.some((item) => item.id === targetId)
      ? selectedOptions.map((item) => (item.id === targetId ? { ...item, answer: option } : item))
      : [...selectedOptions, { id: targetId, answer: option }]

    onChange?.(updatedSelection)
  }

  const getSelectedOption = (targetId: number) =>
    selectedOptions.find((item) => item.id === targetId)?.answer

  return (
    <Flex flexDirection="column" gap={22}>
      {options.map((partQuestion: { id: number; options: Array<PartType> }) => {
        const selectedOption = getSelectedOption(partQuestion.id)
        return (
          <Flex key={partQuestion.id} gap={13}>
            <S.StyledSpan key={partQuestion.id}>{partQuestion.id}지망:</S.StyledSpan>
            <Flex height={60} css={{ overflowX: 'auto' }}>
              <Flex gap={20} height={37} width={'fit-content'}>
                {partQuestion.options.map((option: PartType) => {
                  return (
                    <Button
                      variant="outline"
                      tone={selectedOption === option ? 'lime' : 'gray'}
                      key={option}
                      label={option}
                      type="button"
                      onClick={
                        mode === 'edit'
                          ? () => handleOptionSelect(partQuestion.id, option)
                          : undefined
                      }
                      css={{
                        width: 'fit-content',
                        cursor: mode === 'edit' ? 'pointer' : 'default',
                      }}
                    />
                  )
                })}
              </Flex>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default PartChoice
