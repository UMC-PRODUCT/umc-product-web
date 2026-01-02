import type { MouseEvent } from 'react'
import { forwardRef } from 'react'

import Checkbox from '@/components/common/Checkbox/Checkbox'
import Flex from '@/components/common/Flex/Flex'

import * as S from './Term.style'

type TermProps = {
  toggleCheck: () => void
  onClick?: () => void
  termTitle?: string
  label: string
  necessary?: boolean
  value: boolean
}

export const Term = forwardRef<HTMLInputElement, TermProps>(
  (
    {
      toggleCheck,
      onClick,
      termTitle,
      label,
      necessary,
      value,
      ...props
    }: TermProps,
    ref,
  ) => {
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
        onClick={toggleCheck}
        css={{ cursor: 'pointer' }}
      >
        <Checkbox
          toggleCheck={toggleCheck}
          value={value}
          innerRef={ref}
          {...props}
        />
        {termTitle && (
          <S.TermTitle onClick={handleTermTitleClick}>{termTitle}</S.TermTitle>
        )}
        <S.Title>
          {label}
          {necessary !== undefined && ` (${necessary ? '필수' : '선택'})`}
        </S.Title>
      </Flex>
    )
  },
)
