import { Flex } from '@/shared/ui/common/Flex'

import * as S from '../choice/shared'

const RadioChoice = ({
  content,
  onClick,
  value,
  mode,
}: {
  content: string
  onClick?: () => void
  value?: string
  mode: 'view' | 'edit'
}) => {
  const isChecked = value === content // 체크 여부 판단
  const isEditable = mode === 'edit'

  return (
    <Flex
      alignItems="center"
      gap={14}
      onClick={onClick}
      css={{ cursor: isEditable ? 'pointer' : 'default' }}
      aria-disabled={!isEditable}
    >
      <S.RadioChoiceInput
        type="radio"
        readOnly // onChange 대신 부모 클릭을 쓰므로 경고 방지
        checked={isChecked}
        $isChecked={isChecked} // 스타일용 props
        $isInteractive={isEditable}
      />
      <S.RadioChoiceText>{content}</S.RadioChoiceText>
    </Flex>
  )
}

export default RadioChoice
