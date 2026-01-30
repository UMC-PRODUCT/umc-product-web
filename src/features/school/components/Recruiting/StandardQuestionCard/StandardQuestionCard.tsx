import type { ComponentProps, HTMLAttributes } from 'react'
import { useEffect } from 'react'
import type { Control, FieldPath } from 'react-hook-form'
import { useController } from 'react-hook-form'

import { QUESTION_INFO, RESPONSE_INFO } from '@features/school/domain'

import Hamburger from '@/shared/assets/icons/hamburger.svg?react'
import type { RecruitingForms } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import QuestionTypeConfig from '../QuestionTypeConfig/QuestionTypeConfig'
import * as S from './StandardQuestionCard.style'

type StandardQuestionCardProps = {
  index: number
  control: Control<RecruitingForms>
  namePrefix: string
  onDelete?: () => void
  canDelete?: boolean
  isLocked?: boolean
  isTypeLocked?: boolean
  containerProps?: ComponentProps<typeof Section>
  dragHandleProps?: HTMLAttributes<HTMLDivElement>
}

const StandardQuestionCard = ({
  index,
  control,
  namePrefix,
  onDelete,
  canDelete = true,
  isLocked = false,
  isTypeLocked = false,
  containerProps,
  dragHandleProps,
}: StandardQuestionCardProps) => {
  const { field: questionTypeField } = useController({
    control,
    name: `${namePrefix}.question.type` as FieldPath<RecruitingForms>,
  })
  const { field: necessaryField } = useController({
    control,
    name: `${namePrefix}.question.required` as FieldPath<RecruitingForms>,
  })
  const { field: questionTextField } = useController({
    control,
    name: `${namePrefix}.question.questionText` as FieldPath<RecruitingForms>,
  })
  const {
    field: { value: questionOptionsValue, onChange: questionOptionsOnChange },
  } = useController({
    control,
    name: `${namePrefix}.question.options` as FieldPath<RecruitingForms>,
  })
  useEffect(() => {
    if (questionTypeField.value === 'RADIO' || questionTypeField.value === 'CHECKBOX') return
    const currentOptions = questionOptionsValue
    if (!Array.isArray(currentOptions) || currentOptions.length === 0) return
    questionOptionsOnChange([])
  }, [questionTypeField.value, questionOptionsOnChange, questionOptionsValue])
  const questionTextValue =
    typeof questionTextField.value === 'string' || typeof questionTextField.value === 'number'
      ? questionTextField.value
      : ''
  const questionErrorMessage =
    typeof questionTextValue === 'string' && questionTextValue.trim().length === 0
      ? '질문 내용을 입력해 주세요.'
      : ''
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
        placeholder="예: 지원 동기를 작성해 주세요."
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
        <Flex width={'fit-content'} gap={12} css={{ overflowX: 'auto' }}>
          {QUESTION_INFO.map((info) => (
            <Badge
              typo="B4.Md"
              key={info.label}
              tone={info.id === questionTypeField.value ? 'lime' : 'gray'}
              variant="outline"
              onClick={
                isLocked || isTypeLocked ? undefined : () => questionTypeField.onChange(info.id)
              }
              css={{ cursor: isLocked || isTypeLocked ? 'not-allowed' : 'pointer' }}
            >
              {info.label}
            </Badge>
          ))}
        </Flex>
      </Flex>
      <Flex gap={13}>
        <S.Body>응답 설정 : </S.Body>
        <Flex width={'fit-content'} gap={12}>
          {RESPONSE_INFO.map((info) => (
            <Badge
              typo="B4.Md"
              key={info.label}
              tone={info.value === Boolean(necessaryField.value) ? 'lime' : 'gray'}
              variant="outline"
              onClick={isLocked ? undefined : () => necessaryField.onChange(info.value)}
              css={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
            >
              {info.label}
            </Badge>
          ))}
        </Flex>
      </Flex>
      <QuestionTypeConfig control={control} namePrefix={namePrefix} isLocked={isLocked} />
    </Section>
  )
}

export default StandardQuestionCard
