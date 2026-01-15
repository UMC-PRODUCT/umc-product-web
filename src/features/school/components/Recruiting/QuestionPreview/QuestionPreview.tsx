import { Flex } from '@/shared/ui/common/Flex'

import * as S from './QuestionPreview.style'

const QuestionPreview = ({
  questionLabel,
  questionTitle,
}: {
  questionLabel: string | Array<string>
  questionTitle: string
}) => {
  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <S.Title>{questionTitle}</S.Title>
      <S.QuestionLabel>
        {Array.isArray(questionLabel) ? questionLabel.join(' / ') : questionLabel}
      </S.QuestionLabel>
    </Flex>
  )
}

export default QuestionPreview
