import ArrowDefaultIcon from '@/shared/assets/icons/arrow_default.svg?react'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './ResumeNavigation.style'

interface ResumeNavigationProps {
  currentPage: number
  totalPages: number
  onPageChange: (nextPage: number) => void
}

const ResumeNavigation = ({ currentPage, totalPages, onPageChange }: ResumeNavigationProps) => {
  const isPreviousButtonDisabled = currentPage === 1
  const isNextButtonDisabled = currentPage >= totalPages

  const handlePreviousClick = () => {
    if (isPreviousButtonDisabled) return
    onPageChange(currentPage - 1)
  }

  const handleNextClick = () => {
    if (isNextButtonDisabled) return
    onPageChange(currentPage + 1)
  }

  const getButtonStyle = (isDisabled: boolean) => ({
    opacity: isDisabled ? 0 : 1,
  })

  const pageIndicatorText = `${totalPages}페이지 중 ${currentPage}페이지`

  return (
    <Flex justifyContent="space-between">
      <S.NavigationContainer
        aria-disabled={isPreviousButtonDisabled}
        css={getButtonStyle(isPreviousButtonDisabled)}
        onClick={handlePreviousClick}
      >
        <ArrowDefaultIcon css={{ transform: 'rotate(180deg)' }} />
        이전
      </S.NavigationContainer>

      <S.PageIndicator>{pageIndicatorText}</S.PageIndicator>

      <S.NavigationContainer
        aria-disabled={isNextButtonDisabled}
        css={getButtonStyle(isNextButtonDisabled)}
        onClick={handleNextClick}
      >
        다음
        <ArrowDefaultIcon />
      </S.NavigationContainer>
    </Flex>
  )
}

export default ResumeNavigation
