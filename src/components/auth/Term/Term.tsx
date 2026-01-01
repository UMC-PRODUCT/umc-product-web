import { forwardRef } from 'react'
import * as S from './Term.style'
import type { MouseEvent } from 'react'
import CheckIcon from '@/assets/icons/check.svg?react'
import Flex from '@/components/common/Flex/Flex'

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
        <S.HiddenCheckbox
          type="checkbox"
          onChange={toggleCheck}
          checked={value}
          ref={ref}
          name={label}
          {...props}
        />
        <S.Box>{value && <CheckIcon />}</S.Box>
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
