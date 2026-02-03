import { Button } from '@/shared/ui/common/Button'

import * as S from './RealTimeEvaluation.style'

type QuestionItemProps = {
  index: number
  question: string
  ownerName?: string
  onStartEdit: () => void
  onRemove: () => void
  type: 'common' | 'firstChoice' | 'secondChoice' | 'additional'
  editable: boolean
}

const QuestionItem = ({
  index,
  question,
  ownerName,
  onStartEdit,
  onRemove,
  type,
  editable,
}: QuestionItemProps) => {
  return (
    <S.QuestionCard>
      <S.QuestionCardHeader>
        <S.QuestionHeaderLeft>
          <label>질문 {index}</label>
          {type === 'additional' && (
            <S.QuestionUserBadge tone="gray" typo="C5.Md" variant="outline">
              {ownerName}
            </S.QuestionUserBadge>
          )}
        </S.QuestionHeaderLeft>
        <S.ButtonWrapper isHidden={type !== 'additional' || !editable}>
          <Button
            variant="outline"
            typo="C5.Md"
            label="수정"
            tone="caution"
            onClick={onStartEdit}
            css={{ width: 'fit-content', padding: '4px 11px' }}
          />
          <Button
            tone="necessary"
            label="삭제"
            type="button"
            typo="C5.Md"
            variant="outline"
            onClick={onRemove}
            css={{ width: 'fit-content', padding: '4px 11px' }}
          />
        </S.ButtonWrapper>
      </S.QuestionCardHeader>
      <p>{question}</p>
    </S.QuestionCard>
  )
}

export default QuestionItem
