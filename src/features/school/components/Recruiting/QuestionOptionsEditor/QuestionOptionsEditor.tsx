import { useEffect } from 'react'
import type { Control, FieldErrors, FieldPath } from 'react-hook-form'
import { useController, useFormState } from 'react-hook-form'

import CloseIcon from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './QuestionOptionsEditor.style'

type QuestionOptionsEditorProps = {
  control: Control<RecruitingForms>
  name: string
  variant: 'RADIO' | 'CHECKBOX'
}

const getErrorByPath = (errors: FieldErrors<RecruitingForms>, path: string) => {
  return path.split('.').reduce<unknown>((current, key) => {
    if (!current || typeof current !== 'object') return undefined
    return (current as Record<string, unknown>)[key]
  }, errors)
}

const QuestionOptionsEditor = ({ control, name, variant }: QuestionOptionsEditorProps) => {
  const { field } = useController({
    control,
    name: name as FieldPath<RecruitingForms>,
  })
  const { errors } = useFormState({ control })
  const options = Array.isArray(field.value) ? field.value : []
  const optionErrors = getErrorByPath(errors, name)
  const optionErrorMessage =
    typeof optionErrors?.message === 'string'
      ? optionErrors.message
      : Array.isArray(optionErrors)
        ? optionErrors.find((err) => typeof err?.message === 'string')?.message
        : undefined

  useEffect(() => {
    if (options.length === 0) {
      field.onChange([''])
    }
  }, [field, options.length])

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = [...options]
    next[index] = event.target.value
    field.onChange(next)
  }

  const handleRemove = (index: number) => {
    const next = options.filter((_, i) => i !== index)
    field.onChange(next)
  }

  const handleAppend = () => {
    field.onChange([...options, ''])
  }

  return (
    <Flex flexDirection="column" gap={12} alignItems="flex-start">
      {options.map((value, index) => (
        <Flex key={`${name}-${index}`} gap={10} maxWidth={550} alignItems="center">
          <S.OptionMarker $variant={variant} />
          <S.OptionField>
            <S.OptionInput
              type="text"
              autoComplete="off"
              placeholder={`선택지 입력`}
              value={value}
              onChange={handleChange(index)}
            />
          </S.OptionField>
          <button
            type="button"
            onClick={() => handleRemove(index)}
            aria-label="선택지 삭제"
            css={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              height: 36,
            }}
          >
            <CloseIcon width={14} height={14} color={theme.colors.gray[400]} />
          </button>
        </Flex>
      ))}
      <Flex gap={14}>
        <Badge
          typo="B4.Md"
          tone="darkGray"
          variant="outline"
          css={{ width: 'fit-content' }}
          onClick={handleAppend}
        >
          항목 추가
        </Badge>
        <Badge
          typo="B4.Md"
          tone="darkGray"
          variant="outline"
          css={{ width: 'fit-content' }}
          onClick={handleAppend}
        >
          기타 추가
        </Badge>
      </Flex>
      {optionErrorMessage ? (
        <ErrorMessage
          typo="B4.Md"
          responsiveTypo={{ tablet: 'B4.Md' }}
          errorMessage={optionErrorMessage}
        />
      ) : null}
    </Flex>
  )
}

export default QuestionOptionsEditor
