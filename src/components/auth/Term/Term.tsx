import { forwardRef } from 'react'
import * as S from './Term.style'
import CheckIcon from '@/assets/icons/check.svg?react'
import Flex from '@/components/common/Flex/Flex'

type TermProps = {
  toggleCheck: () => void
  onClick?: () => void
  termTitle?: string
  title: string
  necessary?: boolean
  value: boolean
}

export const Term = forwardRef<HTMLInputElement, TermProps>(
  (
    {
      toggleCheck,
      onClick,
      termTitle,
      title,
      necessary,
      value,
      ...props
    }: TermProps,
    ref,
  ) => {
    return (
      <Flex
        justifyContent="flex-start"
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
          {...props}
        />
        <S.Box>{value && <CheckIcon />}</S.Box>
        {termTitle && <S.TermTitle onClick={onClick}>{termTitle}</S.TermTitle>}
        <S.Title>
          {title}{' '}
          {necessary !== undefined && `(${necessary ? '필수' : '선택'})`}
        </S.Title>
      </Flex>
    )
  },
)
