import type { ChangeEvent } from 'react'

import { theme } from '@/shared/styles/theme'
import type { QuestionMode } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from '../choice/shared'

const RadioChoice = ({
  content,
  optionId,
  onClick,
  value,
  mode,
  isOtherOption,
  otherInputValue,
  onOtherInputChange,
  placeholder,
}: {
  content: string
  optionId: string
  onClick?: () => void
  value?: string
  mode: QuestionMode
  isOtherOption: boolean
  otherInputValue?: string
  onOtherInputChange?: (text: string) => void
  placeholder?: string
}) => {
  const isChecked = value === optionId // 체크 여부 판단
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
      {!isOtherOption ? (
        <S.RadioChoiceText>{content}</S.RadioChoiceText>
      ) : (
        <S.RadioChoiceText css={{ color: `${theme.colors.gray[500]}` }}>
          기타:
          <S.Input
            isActive={isChecked}
            value={otherInputValue ?? ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onOtherInputChange?.(event.target.value)
            }
            placeholder={placeholder}
            disabled={mode !== 'edit'}
          />
        </S.RadioChoiceText>
      )}
    </Flex>
  )
}

export default RadioChoice
