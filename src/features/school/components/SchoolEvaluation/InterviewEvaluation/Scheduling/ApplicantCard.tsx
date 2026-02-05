import type { DragEvent } from 'react'

import Close from '@/shared/assets/icons/close.svg?react'
import Drag from '@/shared/assets/icons/drag.svg?react'
import { theme } from '@/shared/styles/theme'

import * as S from './ApplicantCard.style'

interface ApplicantCardProps {
  name: string
  tags: Array<string>
  score: string
  i: number
  draggable?: boolean
  onDragStart?: (e: DragEvent<HTMLDivElement>) => void
  time?: string
  nickname: string
  mode?: 'default' | 'assigned'
}
const ApplicantCard = ({
  name,
  tags,
  score,
  nickname,
  i,
  draggable,
  mode,
  onDragStart,
  time,
}: ApplicantCardProps) => {
  return (
    <S.ApplicantCard
      variant="both"
      width={'100%'}
      key={i}
      draggable={draggable}
      onDragStart={onDragStart}
      css={{ backgroundColor: theme.colors.gray[700] }}
    >
      <div className="info">
        <span className="name">
          {name}/{nickname}
        </span>

        <div className="tags">
          {tags.map((tag) => (
            <S.Tag key={tag}>{tag}</S.Tag>
          ))}
        </div>
        <span className="score">{score}</span>
      </div>
      {time && <span className="time">{time}</span>}
      {mode === 'default' && <Drag />}
      {mode === 'assigned' && !time && <Close width={22} color={theme.colors.gray[400]} />}
    </S.ApplicantCard>
  )
}

export default ApplicantCard
