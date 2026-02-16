import type { DragEvent } from 'react'

import { Button } from '@/shared/ui/common/Button'
import GrabButton from '@/shared/ui/common/GrabButton/GrabButton'

import * as S from './QuestionCard.style'

const QuestionCard = ({
  question,
  index,
  placeholderIndex,
  draggingIndex,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  handleRemoveQuestion,
  isEditing,
  editingText,
  onChangeEditText,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
}: {
  question: { id: string; text: string }
  index: number
  placeholderIndex: number | null
  draggingIndex: number | null
  handleDragOver: (index: number) => (event: DragEvent<HTMLDivElement>) => void
  handleDrop: (index: number) => (event: DragEvent<HTMLDivElement>) => void
  handleDragStart: (index: number) => (event: DragEvent<HTMLDivElement>) => void
  handleDragEnd: () => void
  handleRemoveQuestion: (id: string) => void
  isEditing: boolean
  editingText: string
  onChangeEditText: (value: string) => void
  onStartEdit: () => void
  onCancelEdit: () => void
  onSaveEdit: () => void
}) => {
  return (
    <div key={question.id} onDragOver={handleDragOver(index)} onDrop={handleDrop(index)}>
      {placeholderIndex === index && draggingIndex !== null ? <S.DragPlaceholder /> : null}
      <S.QuestionItem data-dragging={draggingIndex === index}>
        <S.QuestionHeader>
          <GrabButton
            typo="B5.Md"
            index={index}
            dragHandleProps={{
              draggable: !isEditing,
              onDragStart: handleDragStart(index),
              onDragEnd: handleDragEnd,
            }}
          />

          <S.ButtonWrapper>
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  typo="B5.Md"
                  label="취소"
                  tone="gray"
                  onClick={onCancelEdit}
                />
                <Button
                  tone="lime"
                  label="저장"
                  type="button"
                  typo="B5.Md"
                  variant="outline"
                  onClick={onSaveEdit}
                  disabled={!editingText.trim()}
                />
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  typo="B5.Md"
                  label="수정"
                  tone="caution"
                  onClick={onStartEdit}
                />
                <Button
                  tone="necessary"
                  label="삭제"
                  type="button"
                  typo="B5.Md"
                  variant="outline"
                  onClick={() => handleRemoveQuestion(question.id)}
                />
              </>
            )}
          </S.ButtonWrapper>
        </S.QuestionHeader>
        {isEditing ? (
          <S.EditArea
            value={editingText}
            onChange={(event) => onChangeEditText(event.target.value)}
            placeholder="질문 내용을 입력하세요"
          />
        ) : (
          <S.QuestionMeta>
            <S.QuestionText>{question.text}</S.QuestionText>
          </S.QuestionMeta>
        )}
      </S.QuestionItem>
    </div>
  )
}

export default QuestionCard
