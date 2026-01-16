import { useEffect } from 'react'
import type { Control, FieldErrors, FieldPath } from 'react-hook-form'
import { useController, useFormState } from 'react-hook-form'

import CloseIcon from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms, RecruitingItemOption } from '@/shared/types/form'
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

const getDuplicateOptionMessage = (options: Array<RecruitingItemOption>) => {
  const counts = new Map<string, number>()
  options.forEach((option) => {
    const normalized = typeof option.content === 'string' ? option.content.trim() : ''
    if (!normalized) return
    counts.set(normalized, (counts.get(normalized) ?? 0) + 1)
  })
  const hasDuplicate = Array.from(counts.values()).some((count) => count > 1)
  return hasDuplicate ? '동일한 선택지는 입력할 수 없습니다.' : undefined
}

const OTHER_OPTION_LABEL = '기타 (사용자 입력)'

const normalizeOptions = (rawOptions: Array<RecruitingItemOption>) => {
  const normalized = rawOptions.map((option, index) => ({
    ...option,
    orderNo: index + 1,
  }))
  const otherOptions = normalized.filter((option) => option.content === OTHER_OPTION_LABEL)
  const regularOptions = normalized.filter((option) => option.content !== OTHER_OPTION_LABEL)
  const next = [...regularOptions, ...otherOptions].map((option, index) => ({
    ...option,
    orderNo: index + 1,
  }))
  return next
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
  const rawOptions = Array.isArray(field.value) ? field.value : []
  const options = rawOptions.map((option, index) => {
    if (typeof option === 'string') {
      return { content: option, orderNo: index + 1 }
    }
    return option as RecruitingItemOption
  })
  const normalizedOptions = normalizeOptions(options)
  const optionErrors = getErrorByPath(errors, name)
  const optionErrorMessage = getErrorMessage(optionErrors)
  const duplicateOptionMessage = getDuplicateOptionMessage(normalizedOptions)
  const inlineErrorMessage = duplicateOptionMessage ?? optionErrorMessage

  useEffect(() => {
    if (isLocked) return
    if (normalizedOptions.length === 0) {
      field.onChange([{ content: '', orderNo: 1 }])
      return
    }
    if (JSON.stringify(normalizedOptions) !== JSON.stringify(options)) {
      field.onChange(normalizedOptions)
    }
  }, [field, isLocked, normalizedOptions, options])

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) return
    const next = normalizedOptions.map((option, optionIndex) =>
      optionIndex === index
        ? { ...option, content: event.target.value, orderNo: optionIndex + 1 }
        : { ...option, orderNo: optionIndex + 1 },
    )
    field.onChange(normalizeOptions(next))
  }

  const handleRemove = (index: number) => {
    if (isLocked) return
    const next = normalizedOptions
      .filter((_, i) => i !== index)
      .map((option, optionIndex) => ({ ...option, orderNo: optionIndex + 1 }))
    field.onChange(normalizeOptions(next))
  }

  const handleAppend = () => {
    if (isLocked) return
    field.onChange(
      normalizeOptions([
        ...normalizedOptions,
        { content: '', orderNo: normalizedOptions.length + 1 },
      ]),
    )
  }

  const handleAppendOther = () => {
    if (isLocked) return
    const hasOther = normalizedOptions.some((option) => option.content === OTHER_OPTION_LABEL)
    if (hasOther) return
    field.onChange(
      normalizeOptions([
        ...normalizedOptions,
        { content: OTHER_OPTION_LABEL, orderNo: normalizedOptions.length + 1 },
      ]),
    )
  }

  return (
    <Flex flexDirection="column" gap={12} alignItems="flex-start">
      {normalizedOptions.map((option, index) => {
        const optionValue = typeof option.content === 'string' ? option.content : ''
        const isOtherOption = optionValue === OTHER_OPTION_LABEL
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
                $isOther={isOtherOption}
                disabled={isLocked || isOtherOption}
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
          onClick={isLocked ? undefined : handleAppendOther}
        >
          기타 추가
        </Badge>
      </Flex>
      {inlineErrorMessage ? (
        <ErrorMessage
          typo="B4.Md"
          responsiveTypo={{ tablet: 'B4.Md' }}
          errorMessage={inlineErrorMessage}
        />
      ) : null}
    </Flex>
  )
}

export default QuestionOptionsEditor
