import type { ComponentProps, HTMLAttributes } from 'react'
import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

import type { RecruitingForms } from '@/shared/types/form'
import type { QuestionType } from '@/shared/types/question'
import type Section from '@/shared/ui/common/Section/Section'

import PartQuestionCard from './PartQuestionCard'
import StandardQuestionCard from './StandardQuestionCard'

type MakeQuestionProps = {
  index: number
  control: Control<RecruitingForms>
  namePrefix: `questionPages.${number}.questions.${number}`
  onDelete?: () => void
  canDelete?: boolean
  containerProps?: ComponentProps<typeof Section>
  dragHandleProps?: HTMLAttributes<HTMLDivElement>
}

type QuestionTypeFieldName = `${MakeQuestionProps['namePrefix']}.type`
type IsPartFieldName = `${MakeQuestionProps['namePrefix']}.isPartQuestion`

const MakeQuestion = (props: MakeQuestionProps) => {
  const type = useWatch({
    control: props.control,
    name: `${props.namePrefix}.type`,
  }) as QuestionType | undefined
  const isPartQuestion = useWatch({
    control: props.control,
    name: `${props.namePrefix}.isPartQuestion`,
  }) as boolean | undefined

  if (isPartQuestion || type === 'PART') {
    return <PartQuestionCard {...props} />
  }

  return <StandardQuestionCard {...props} />
}

export default MakeQuestion
