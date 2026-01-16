import type { ComponentProps, HTMLAttributes } from 'react'
import { useEffect } from 'react'
import type { Control, FieldPath } from 'react-hook-form'
import { useController } from 'react-hook-form'

import Hamburger from '@/shared/assets/icons/hamburger.svg?react'
import type { RecruitingForms } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from './StandardQuestionCard.style'

type ScheduleQuestionCardProps = {
  index: number
  control: Control<RecruitingForms>
  namePrefix: string
  onDelete?: () => void
  canDelete?: boolean
  isLocked?: boolean
  containerProps?: ComponentProps<typeof Section>
  dragHandleProps?: HTMLAttributes<HTMLDivElement>
}

const ScheduleQuestionCard = ({
  index,
  control,
  namePrefix,
  onDelete,
  canDelete = true,
  isLocked = false,
  containerProps,
  dragHandleProps,
}: ScheduleQuestionCardProps) => {
  const { field: necessaryField } = useController({
    control,
    name: `${namePrefix}.question.required` as FieldPath<RecruitingForms>,
  })
  const { field: questionTextField } = useController({
    control,
    name: `${namePrefix}.question.questionText` as FieldPath<RecruitingForms>,
  })
  const questionTextValue =
    typeof questionTextField.value === 'string' || typeof questionTextField.value === 'number'
      ? questionTextField.value
      : ''
  const questionErrorMessage =
    typeof questionTextValue === 'string' && questionTextValue.trim().length === 0
      ? '질문 내용을 입력해 주세요.'
      : ''

  useEffect(() => {
    if (necessaryField.value !== true) {
      necessaryField.onChange(true)
    }
  }, [necessaryField])

  return (
    <Section variant="solid" gap={22} {...containerProps}>
      <S.Header>
        <S.QuestionInfo data-drag-handle="true" {...dragHandleProps}>
          <Hamburger />
          문항 {index + 1}
        </S.QuestionInfo>
        {canDelete ? (
          <Button
            tone="necessary"
            variant="outline"
            label="삭제"
            css={{ width: 'fit-content', height: '28px', padding: '4px 10px' }}
            onClick={onDelete}
            disabled={isLocked}
          />
        ) : null}
      </S.Header>
      <LabelTextField
        type="text"
        label="질문 내용"
        autoComplete="none"
        necessary={true}
        placeholder="예: 면접 가능한 시간을 선택해 주세요."
        name={questionTextField.name}
        value={questionTextValue}
        onChange={questionTextField.onChange}
        onBlur={questionTextField.onBlur}
        disabled={isLocked}
        error={{
          error: Boolean(questionErrorMessage),
          errorMessage: questionErrorMessage,
        }}
      />
      <Flex gap={13}>
        <S.Body>답변 유형 : </S.Body>
        <Flex width={'fit-content'} gap={12}>
          <Badge typo="B4.Md" tone="lime" variant="outline">
            면접 시간
          </Badge>
        </Flex>
      </Flex>
      <Flex gap={13}>
        <S.Body>응답 설정 : </S.Body>
        <Flex width={'fit-content'} gap={12}>
          <Badge typo="B4.Md" tone="lime" variant="outline">
            필수 문항
          </Badge>
        </Flex>
      </Flex>
    </Section>
  )
}

export default ScheduleQuestionCard
