import { Flex } from '@/shared/ui/common/Flex'

import * as S from './QuestionPreview.style'

const QuestionPreview = ({
  questionLabel,
  questionTitle,
  isNotice,
}: {
  questionLabel: string | Array<string>
  questionTitle: string
  isNotice?: boolean
}) => {
  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <S.Title>{questionTitle}</S.Title>
      <S.QuestionLabel isNotice={isNotice}>
        {Array.isArray(questionLabel) ? questionLabel.join(' / ') : questionLabel}
      </S.QuestionLabel>
    </Flex>
  )
}

export default QuestionPreview
