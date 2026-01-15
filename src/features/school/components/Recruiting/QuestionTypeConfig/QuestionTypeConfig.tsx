import { useId } from 'react'
import type { Control, FieldPath } from 'react-hook-form'
import { useController, useWatch } from 'react-hook-form'

import { theme } from '@/shared/styles/theme'
import type { RecruitingForms } from '@/shared/types/form'
import type { QuestionType } from '@/shared/types/question'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label'

import QuestionOptionsEditor from '../QuestionOptionsEditor/QuestionOptionsEditor'

type QuestionTypeConfigProps = {
  control: Control<RecruitingForms>
  namePrefix: string
}

const QuestionTypeConfig = ({ control, namePrefix }: QuestionTypeConfigProps) => {
  const checkboxId = useId()
  const type = useWatch({
    control,
    name: `${namePrefix}.type` as FieldPath<RecruitingForms>,
  }) as QuestionType | undefined
  const { field: partSinglePickField } = useController({
    control,
    name: `${namePrefix}.partSinglePick` as FieldPath<RecruitingForms>,
  })

  if (type === 'PART') {
    return (
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
    )
  }

  if (type === 'RADIO' || type === 'CHECKBOX') {
    return (
      <QuestionOptionsEditor
        control={control}
        name={`${namePrefix}.options`}
        variant={type === 'RADIO' ? 'RADIO' : 'CHECKBOX'}
      />
    )
  }

  return null
}

export default QuestionTypeConfig
