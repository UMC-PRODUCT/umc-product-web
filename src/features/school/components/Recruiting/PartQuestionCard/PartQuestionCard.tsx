import type { HTMLAttributes } from 'react'
import { useEffect, useId } from 'react'
import type { Control, FieldPath } from 'react-hook-form'
import { useController } from 'react-hook-form'

import Hamburger from '@/shared/assets/icons/hamburger.svg?react'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from './PartQuestionCard.style'

type PartQuestionCardProps = {
  index: number
  control: Control<RecruitingForms>
  namePrefix: string
  containerProps?: HTMLAttributes<HTMLDivElement>
  dragHandleProps?: HTMLAttributes<HTMLDivElement>
  isLocked?: boolean
}

const PartQuestionCard = ({
  index,
  control,
  namePrefix,
  containerProps,
  dragHandleProps,
  isLocked = false,
}: PartQuestionCardProps) => {
  const { field: questionField, fieldState: questionFieldState } = useController({
    control,
    name: `${namePrefix}.question` as FieldPath<RecruitingForms>,
  })
  const { field: questionTypeField } = useController({
    control,
    name: `${namePrefix}.type` as FieldPath<RecruitingForms>,
  })
  const { field: necessaryField } = useController({
    control,
    name: `${namePrefix}.necessary` as FieldPath<RecruitingForms>,
  })
  const { field: isPartField } = useController({
    control,
    name: `${namePrefix}.isPartQuestion` as FieldPath<RecruitingForms>,
  })
  const { field: partSinglePickField } = useController({
    control,
    name: `${namePrefix}.partSinglePick` as FieldPath<RecruitingForms>,
  })

  const checkboxId = useId()
  const questionValue =
    typeof questionField.value === 'string' || typeof questionField.value === 'number'
      ? questionField.value
      : ''

  useEffect(() => {
    if (questionTypeField.value !== 'PART') {
      questionTypeField.onChange('PART')
    }
    if (necessaryField.value !== true) {
      necessaryField.onChange(true)
    }
    if (isPartField.value !== true) {
      isPartField.onChange(true)
    }
  }, [isPartField, necessaryField, questionTypeField])

  return (
    <Section variant="solid" gap={22} {...containerProps}>
      <S.Header>
        <S.QuestionInfo data-drag-handle="true" {...dragHandleProps}>
          <Hamburger />
          문항 {index + 1}
        </S.QuestionInfo>
      </S.Header>
      <LabelTextField
        type="text"
        label="질문 내용"
        autoComplete="none"
        necessary={true}
        placeholder="예: 희망 파트를 선택해 주세요."
        name={questionField.name}
        value={questionValue}
        onChange={questionField.onChange}
        onBlur={questionField.onBlur}
        disabled={isLocked}
        error={{
          error: !!questionFieldState.error,
          errorMessage: questionFieldState.error?.message || '',
        }}
      />
      <Flex gap={13} alignItems="center">
        <S.Body>답변 유형 :</S.Body>
        <Badge typo="B4.Md" tone="lime" variant="outline">
          희망 파트
        </Badge>
      </Flex>

      <Flex gap={13} alignItems="center">
        <Flex alignItems="center" gap={8}>
          <Checkbox
            id={checkboxId}
            checked={Boolean(partSinglePickField.value)}
            onCheckedChange={(checked) => partSinglePickField.onChange(checked === true)}
            disabled={isLocked}
          />
          <Label
            label="1지망만 입력받기"
            necessary={false}
            htmlFor={checkboxId}
            css={{ color: theme.colors.gray[300], ...theme.typography.B3.Rg }}
          />
        </Flex>
      </Flex>
    </Section>
  )
}

export default PartQuestionCard
