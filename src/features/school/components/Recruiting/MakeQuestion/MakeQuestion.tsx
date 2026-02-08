import type { ComponentProps, HTMLAttributes } from 'react'
import type { Control, FieldPath } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

import type { RecruitingForms } from '@/shared/types/form'
import type Section from '@/shared/ui/common/Section/Section'

import PreferredPartQuestionCard from '../StandardQuestionCard/PreferredPartQuestionCard'
import ScheduleQuestionCard from '../StandardQuestionCard/ScheduleQuestionCard'
import StandardQuestionCard from '../StandardQuestionCard/StandardQuestionCard'

type MakeQuestionProps = {
  index: number
  control: Control<RecruitingForms>
  namePrefix: string
  recruitingId?: string
  onDelete?: () => void
  canDelete?: boolean
  isLocked?: boolean
  isTypeLocked?: boolean
  containerProps?: ComponentProps<typeof Section>
  dragHandleProps?: HTMLAttributes<HTMLDivElement>
}

const MakeQuestion = (props: MakeQuestionProps) => {
  const type = useWatch({
    control: props.control,
    name: `${props.namePrefix}.question.type` as FieldPath<RecruitingForms>,
  }) as RecruitingForms['items'][number]['question']['type'] | undefined

  if (type === 'PREFERRED_PART') {
    return <PreferredPartQuestionCard {...props} />
  }
  if (type === 'SCHEDULE') {
    return <ScheduleQuestionCard {...props} />
  }
  return <StandardQuestionCard {...props} />
}

export default MakeQuestion
