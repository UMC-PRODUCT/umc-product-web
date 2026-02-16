import { useEffect } from 'react'
import type { Control, FieldPath } from 'react-hook-form'
import { useController, useWatch } from 'react-hook-form'

import type { RecruitingForms, RecruitingItemQuestionType } from '@/shared/types/form'

import QuestionOptionsEditor from '../QuestionOptionsEditor/QuestionOptionsEditor'

type QuestionTypeConfigProps = {
  control: Control<RecruitingForms>
  namePrefix: string
  isLocked?: boolean
  onDeleteOption?: (optionId: string) => void
  onAppendOption?: () => void
}

const QuestionTypeConfig = ({
  control,
  namePrefix,
  isLocked = false,
  onDeleteOption,
  onAppendOption,
}: QuestionTypeConfigProps) => {
  const type = useWatch({
    control,
    name: `${namePrefix}.question.type` as FieldPath<RecruitingForms>,
  }) as RecruitingItemQuestionType | undefined
  const optionsFieldPath = `${namePrefix}.question.options` as FieldPath<RecruitingForms>
  const { field: optionsField } = useController({
    control,
    name: optionsFieldPath,
  })

  useEffect(() => {
    if (!type || type === 'RADIO' || type === 'CHECKBOX') return
    if (Array.isArray(optionsField.value) && optionsField.value.length === 0) return
    optionsField.onChange([])
  }, [optionsField, type])
  if (type === 'PREFERRED_PART') {
    return null
  }

  if (type === 'RADIO' || type === 'CHECKBOX') {
    return (
      <QuestionOptionsEditor
        control={control}
        name={`${namePrefix}.question.options`}
        variant={type === 'RADIO' ? 'RADIO' : 'CHECKBOX'}
        isLocked={isLocked}
        onDeleteOption={onDeleteOption}
        onAppendOption={onAppendOption}
      />
    )
  }

  return null
}

export default QuestionTypeConfig
