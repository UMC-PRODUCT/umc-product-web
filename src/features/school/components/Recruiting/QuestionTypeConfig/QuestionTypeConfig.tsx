import { useEffect } from 'react'
import type { Control, FieldPath } from 'react-hook-form'
import { useFormContext, useWatch } from 'react-hook-form'

import type { RecruitingForms, RecruitingItemQuestionType } from '@/shared/types/form'

import QuestionOptionsEditor from '../QuestionOptionsEditor/QuestionOptionsEditor'

type QuestionTypeConfigProps = {
  control: Control<RecruitingForms>
  namePrefix: string
  isLocked?: boolean
}

const QuestionTypeConfig = ({ control, namePrefix, isLocked = false }: QuestionTypeConfigProps) => {
  const type = useWatch({
    control,
    name: `${namePrefix}.question.type` as FieldPath<RecruitingForms>,
  }) as RecruitingItemQuestionType | undefined
  const { setValue } = useFormContext<RecruitingForms>()
  const optionsFieldPath = `${namePrefix}.question.options` as FieldPath<RecruitingForms>

  useEffect(() => {
    if (!type || type === 'RADIO' || type === 'CHECKBOX') return
    setValue(optionsFieldPath, [])
  }, [optionsFieldPath, setValue, type])
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
      />
    )
  }

  return null
}

export default QuestionTypeConfig
