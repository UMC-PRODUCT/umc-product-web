import type { ComponentProps, HTMLAttributes } from 'react'
import type { Control, FieldPath } from 'react-hook-form'
import { useController } from 'react-hook-form'

import { QUESTION_INFO, RESPONSE_INFO } from '@/features/school/constants/QuestionInfo'
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
  containerProps,
  dragHandleProps,
}: StandardQuestionCardProps) => {
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
  const questionValue =
    typeof questionField.value === 'string' || typeof questionField.value === 'number'
      ? questionField.value
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
      <Flex gap={13}>
        <S.Body>답변 유형 : </S.Body>
        <Flex width={'fit-content'} gap={12}>
          {QUESTION_INFO.map((info) => (
            <Badge
              typo="B4.Md"
              key={info.label}
              tone={info.id === questionTypeField.value ? 'lime' : 'gray'}
              variant="outline"
              onClick={isLocked ? undefined : () => questionTypeField.onChange(info.id)}
              css={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
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
