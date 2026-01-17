import type { MouseEvent } from 'react'
import { forwardRef } from 'react'

import { Checkbox } from '@shared/ui/common/Checkbox/Checkbox'
import Flex from '@shared/ui/common/Flex/Flex'

import * as S from './Term.style'

type TermProps = {
  onChange: () => void
  onClick?: () => void
  termTitle?: string
  label: string
  necessary?: boolean
  checked: boolean
}

export const Term = forwardRef<HTMLButtonElement, TermProps>(
  ({ onChange, onClick, termTitle, label, necessary, checked, ...props }: TermProps, ref) => {
    const handleTermTitleClick = (event: MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation()
      onClick?.()
    }

    return (
      <Flex
        justifyContent="flex-start"
        alignItems="center"
        gap="2px"
        width="fit-content"
        css={{ cursor: 'pointer' }}
      >
        <Checkbox onCheckedChange={() => onChange()} checked={checked} ref={ref} {...props} />
        {termTitle && <S.TermTitle onClick={handleTermTitleClick}>{termTitle}</S.TermTitle>}
        <S.Title>
          {label}
          {necessary !== undefined && ` (${necessary ? '필수' : '선택'})`}
        </S.Title>
      </Flex>
    )
  },
)

Term.displayName = 'Term'
