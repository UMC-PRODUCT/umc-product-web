import type { DragEvent } from 'react'

import Close from '@/shared/assets/icons/close.svg?react'
import Drag from '@/shared/assets/icons/drag.svg?react'
import { theme } from '@/shared/styles/theme'

import * as S from './ApplicantCard.style'

interface ApplicantCardProps {
  id: string
  name: string
  tags: Array<string>
  score: string
  i: number
  draggable?: boolean
  onDragStart?: (e: DragEvent<HTMLDivElement>) => void
  time?: string
  nickname: string
  mode?: 'default' | 'assigned'
  onRemove?: (id: string) => void
}
const ApplicantCard = ({
  id,
  name,
  tags,
  score,
  nickname,
  i,
  draggable,
  mode,
  onDragStart,
  time,
  onRemove,
}: ApplicantCardProps) => {
  return (
    <S.ApplicantCard
      variant="both"
      mode={mode}
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

        <div className="tags">{tags.map((tag) => tag && <S.Tag key={tag}>{tag}</S.Tag>)}</div>
        <span className="score">서류 {score}</span>
      </div>
      {time && <span className="time">{time}</span>}
      {mode === 'default' && <Drag color={theme.colors.gray[400]} />}
      {mode === 'assigned' && !time && (
        <S.CloseButton type="button" aria-label="지원자 제거" onClick={() => onRemove?.(id)}>
          <Close width={22} color={theme.colors.gray[400]} />
        </S.CloseButton>
      )}
    </S.ApplicantCard>
  )
}

export default ApplicantCard
