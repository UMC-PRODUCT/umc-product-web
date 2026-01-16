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
  isLocked?: boolean
}

const getErrorByPath = (errors: FieldErrors<RecruitingForms>, path: string) => {
  return path.split('.').reduce<unknown>((current, key) => {
    if (!current || typeof current !== 'object') return undefined
    return (current as Record<string, unknown>)[key]
  }, errors)
}

const getErrorMessage = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object') return undefined

  const maybeMessage = (error as { message?: unknown }).message
  if (typeof maybeMessage === 'string') return maybeMessage

  if (Array.isArray(error)) {
    const item = error.find((err) => {
      const message = (err as { message?: unknown }).message
      return typeof message === 'string'
    })
    if (!item) return undefined
    const message = (item as { message?: unknown }).message
    return typeof message === 'string' ? message : undefined
  }

  return undefined
}

const QuestionOptionsEditor = ({
  control,
  name,
  variant,
  isLocked = false,
}: QuestionOptionsEditorProps) => {
  const { field } = useController({
    control,
    name: name as FieldPath<RecruitingForms>,
  })
  const { errors } = useFormState({ control })
  const options = Array.isArray(field.value) ? field.value : []
  const optionErrors = getErrorByPath(errors, name)
  const optionErrorMessage = getErrorMessage(optionErrors)

  useEffect(() => {
    if (isLocked) return
    if (options.length === 0) {
      field.onChange([''])
    }
  }, [field, isLocked, options.length])

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) return
    const next = [...options]
    next[index] = event.target.value
    field.onChange(next)
  }

  const handleRemove = (index: number) => {
    if (isLocked) return
    const next = options.filter((_, i) => i !== index)
    field.onChange(next)
  }

  const handleAppend = () => {
    if (isLocked) return
    field.onChange([...options, ''])
  }

  return (
    <Flex flexDirection="column" gap={12} alignItems="flex-start">
      {options.map((value, index) => {
        const optionValue = typeof value === 'string' || typeof value === 'number' ? value : ''
        return (
          <Flex key={`${name}-${index}`} gap={10} maxWidth={550} alignItems="center">
            <S.OptionMarker $variant={variant} />
            <S.OptionField>
              <S.OptionInput
                type="text"
                autoComplete="off"
                placeholder={`Option ${index + 1}`}
                value={optionValue}
                onChange={handleChange(index)}
                disabled={isLocked}
              />
            </S.OptionField>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              aria-label="선택지 삭제"
              disabled={isLocked}
              css={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                height: 36,
                opacity: isLocked ? 0.4 : 1,
              }}
            >
              <CloseIcon width={14} height={14} color={theme.colors.gray[400]} />
            </button>
          </Flex>
        )
      })}
      <Flex gap={14}>
        <Badge
          typo="B4.Md"
          tone="darkGray"
          variant="outline"
          css={{ width: 'fit-content', cursor: isLocked ? 'not-allowed' : 'pointer' }}
          onClick={isLocked ? undefined : handleAppend}
        >
          항목 추가
        </Badge>
        <Badge
          typo="B4.Md"
          tone="darkGray"
          variant="outline"
          css={{ width: 'fit-content', cursor: isLocked ? 'not-allowed' : 'pointer' }}
          onClick={isLocked ? undefined : handleAppend}
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
