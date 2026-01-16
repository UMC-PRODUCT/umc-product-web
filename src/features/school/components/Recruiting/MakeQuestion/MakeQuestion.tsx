import type { ComponentProps, HTMLAttributes } from 'react'
import type { Control, FieldPath } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

import type { RecruitingForms } from '@/shared/types/form'
import type { QuestionType } from '@/shared/types/question'
import type Section from '@/shared/ui/common/Section/Section'

import PartQuestionCard from '../PartQuestionCard/PartQuestionCard'
import StandardQuestionCard from '../StandardQuestionCard/StandardQuestionCard'

type MakeQuestionProps = {
  index: number
  control: Control<RecruitingForms>
  namePrefix: string
  onDelete?: () => void
  canDelete?: boolean
  isLocked?: boolean
  containerProps?: ComponentProps<typeof Section>
  dragHandleProps?: HTMLAttributes<HTMLDivElement>
}

const MakeQuestion = (props: MakeQuestionProps) => {
  const type = useWatch({
    control: props.control,
    name: `${props.namePrefix}.type` as FieldPath<RecruitingForms>,
  }) as QuestionType | undefined
  const isPartQuestion = useWatch({
    control: props.control,
    name: `${props.namePrefix}.isPartQuestion` as FieldPath<RecruitingForms>,
  }) as boolean | undefined

  if (isPartQuestion || type === 'PART') {
    return <PartQuestionCard {...props} />
  }

  return <StandardQuestionCard {...props} />
}

export default MakeQuestion
