import CheckIcon from '@/assets/icons/check.svg?react'

import Flex from '../Flex/Flex'
import * as S from './Checkbox.style'

export default function Checkbox({
  toggleCheck,
  value,
  innerRef,
  disabled = false,
}: {
  toggleCheck: () => void
  value: boolean
  innerRef?: React.Ref<HTMLInputElement>
  disabled?: boolean
}) {
  const handleToggle = () => {
    if (disabled) return
    toggleCheck()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <Flex
      width="fit-content"
      aria-checked={value}
      role="checkbox"
      tabIndex={disabled ? -1 : 0}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      css={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <S.HiddenCheckbox
        type="checkbox"
        onChange={toggleCheck}
        checked={value}
        ref={innerRef}
        disabled={disabled}
      />
      <S.Box aria-hidden $checked={value} $disabled={disabled}>
        {value && <CheckIcon color="black" />}
      </S.Box>
    </Flex>
  )
}
