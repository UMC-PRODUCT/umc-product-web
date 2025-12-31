import { useState } from 'react'
import * as S from './Term.style'
import CheckIcon from '@/assets/icons/check.svg?react'
import Flex from '@/components/common/Flex/Flex'
type TermProps = {
  onClick: () => void
  termTitle: string
  title: string
  necessary: boolean
}

export function Term({ onClick, termTitle, title, necessary }: TermProps) {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = () => {
    setChecked(!checked)
  }
  return (
    <Flex
      justifyContent="flex-start"
      gap="2px"
      width="fit-content"
      onClick={handleCheckboxChange}
      css={{ cursor: 'pointer' }}
    >
      <S.HiddenCheckbox
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <S.Box>{checked && <CheckIcon />}</S.Box>
      <S.TermTitle onClick={onClick}>{termTitle}</S.TermTitle>
      <S.Title>
        {title} ({necessary ? '필수' : '선택'})
      </S.Title>
    </Flex>
  )
}
