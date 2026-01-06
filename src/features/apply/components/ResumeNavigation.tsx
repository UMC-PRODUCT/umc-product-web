import ArrowDefault from '@/shared/assets/icons/arrow_default.svg?react'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './shared'

export default function ResumeNavigation({
  page,
  totalPages,
  setPage,
}: {
  page: number
  totalPages: number
  setPage: (page: number) => void
}) {
  const isPrevDisabled = page == 1
  const isNextDisabled = page >= totalPages

  return (
    <Flex justifyContent="space-between">
      <S.NavigationButtonWrapper
        aria-disabled={isPrevDisabled}
        css={{
          opacity: isPrevDisabled ? 0.5 : 1,
          cursor: isPrevDisabled ? 'not-allowed' : 'pointer',
        }}
        onClick={() => {
          if (isPrevDisabled) return
          setPage(page - 1)
        }}
      >
        <ArrowDefault css={{ transform: 'rotate(180deg)' }} />
        이전
      </S.NavigationButtonWrapper>
      <S.PageWrapper>{`${totalPages}페이지 중 ${page}페이지`}</S.PageWrapper>
      <S.NavigationButtonWrapper
        aria-disabled={isNextDisabled}
        css={{
          opacity: isNextDisabled ? 0.5 : 1,
          cursor: isNextDisabled ? 'not-allowed' : 'pointer',
        }}
        onClick={() => {
          if (isNextDisabled) return
          setPage(page + 1)
        }}
      >
        다음
        <ArrowDefault />
      </S.NavigationButtonWrapper>
    </Flex>
  )
}
