import type { HTMLAttributes } from 'react'
import { useEffect, useId } from 'react'
import type { Control } from 'react-hook-form'
import { useController, useFormState } from 'react-hook-form'

import Hamburger from '@/shared/assets/icons/hamburger.svg?react'
import { PART } from '@/shared/constants/umc'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from './MakeQuestion.style'

type PartQuestionCardProps = {
  index: number
  control: Control<RecruitingForms>
  namePrefix: `questionPages.${number}.questions.${number}`
  containerProps?: HTMLAttributes<HTMLDivElement>
  dragHandleProps?: HTMLAttributes<HTMLDivElement>
}

const PartQuestionCard = ({
  index,
  control,
  namePrefix,
  containerProps,
  dragHandleProps,
}: PartQuestionCardProps) => {
  const { field: questionField, fieldState: questionFieldState } = useController({
    control,
    name: `${namePrefix}.question`,
  })
  const { field: questionTypeField } = useController({
    control,
    name: `${namePrefix}.type`,
  })
  const { field: necessaryField } = useController({
    control,
    name: `${namePrefix}.necessary`,
  })
  const { field: isPartField } = useController({
    control,
    name: `${namePrefix}.isPartQuestion`,
  })
  const { field: partSinglePickField } = useController({
    control,
    name: `${namePrefix}.partSinglePick`,
  })
  const { field: partOptionsField } = useController({
    control,
    name: `${namePrefix}.options`,
  })
  const { errors } = useFormState({ control })
  const checkboxId = useId()
  const selectedParts = Array.isArray(partOptionsField.value) ? partOptionsField.value : []
  const nameMatch = namePrefix.match(/questionPages\.(\d+)\.questions\.(\d+)/)
  const pageIndex = nameMatch ? Number(nameMatch[1]) : -1
  const questionIndex = nameMatch ? Number(nameMatch[2]) : -1
  const optionErrors =
    pageIndex >= 0 && questionIndex >= 0
      ? errors.questionPages?.[pageIndex]?.questions?.[questionIndex]?.options
      : undefined
  const optionErrorMessage =
    typeof optionErrors?.message === 'string'
      ? optionErrors.message
      : Array.isArray(optionErrors)
        ? optionErrors.find((err) => typeof err?.message === 'string')?.message
        : undefined

  const handleTogglePart = (part: string) => {
    const next = selectedParts.includes(part)
      ? selectedParts.filter((item) => item !== part)
      : [...selectedParts, part]
    partOptionsField.onChange(next)
  }

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
        necessary={false}
        placeholder="예: 희망 파트를 선택해 주세요."
        name={questionField.name}
        value={questionField.value}
        onChange={questionField.onChange}
        onBlur={questionField.onBlur}
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
          />
          <Label
            label="1지망만 입력받기"
            necessary={false}
            htmlFor={checkboxId}
            css={{ color: theme.colors.gray[300], ...theme.typography.B3.Rg }}
          />
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap={10} alignItems="flex-start">
        <S.Body>모집 할 파트 :</S.Body>
        <Flex gap={12} flexWrap="wrap">
          {PART.map((part) => {
            const isChecked = selectedParts.includes(part)
            const partId = `${checkboxId}-${part}`
            return (
              <Badge
                key={part}
                id={partId}
                tone={isChecked ? 'lime' : 'gray'}
                typo="B4.Md"
                variant={'outline'}
                onClick={() => handleTogglePart(part)}
                css={{ cursor: 'pointer' }}
              >
                {part}
              </Badge>
            )
          })}
        </Flex>
        {optionErrorMessage ? (
          <ErrorMessage
            typo="B4.Md"
            responsiveTypo={{ tablet: 'B4.Md' }}
            errorMessage={optionErrorMessage}
          />
        ) : null}
      </Flex>
    </Section>
  )
}

export default PartQuestionCard
