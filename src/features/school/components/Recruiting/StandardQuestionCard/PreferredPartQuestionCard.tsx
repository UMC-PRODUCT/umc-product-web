import type { ComponentProps, HTMLAttributes } from 'react'
import { useEffect } from 'react'
import type { Control, FieldPath } from 'react-hook-form'
import { useController } from 'react-hook-form'

import Hamburger from '@/shared/assets/icons/hamburger.svg?react'
import type { RecruitingForms } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from './StandardQuestionCard.style'

type PreferredPartQuestionCardProps = {
  index: number
  control: Control<RecruitingForms>
  namePrefix: string
  onDelete?: () => void
  canDelete?: boolean
  isLocked?: boolean
  containerProps?: ComponentProps<typeof Section>
  dragHandleProps?: HTMLAttributes<HTMLDivElement>
}

const PreferredPartQuestionCard = ({
  index,
  control,
  namePrefix,
  onDelete,
  canDelete = true,
  isLocked = false,
  containerProps,
  dragHandleProps,
}: PreferredPartQuestionCardProps) => {
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
  const { field: maxPreferredField } = useController({
    control,
    name: 'maxPreferredPartCount' as FieldPath<RecruitingForms>,
  })

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
        placeholder="예: 희망하는 파트를 선택해 주세요."
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
            희망 파트
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
      <Flex alignItems="center" gap={8}>
        <Checkbox
          checked={maxPreferredField.value === 1}
          disabled={isLocked}
          onCheckedChange={(checked) => {
            if (isLocked) return
            maxPreferredField.onChange(checked ? 1 : 2)
          }}
        />
        <S.Body>1지망만 입력받기</S.Body>
      </Flex>
    </Section>
  )
}

export default PreferredPartQuestionCard
