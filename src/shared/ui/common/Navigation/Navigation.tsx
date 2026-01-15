import Arrow from '@shared/assets/icons/arrow.svg?react'
import { theme } from '@shared/styles/theme'
import Flex from '@shared/ui/common/Flex/Flex'

const Navigation = ({
  currentPage,
  totalPages,
  onChangePage,
}: {
  currentPage: number
  totalPages: number
  onChangePage: (page: number) => void
}) => {
  const windowSize = 6
  const blockStart = Math.floor((currentPage - 1) / windowSize) * windowSize + 1
  const blockEnd = Math.min(blockStart + windowSize - 1, totalPages)
  const visiblePages = Array.from(
    { length: blockEnd - blockStart + 1 },
    (_, idx) => blockStart + idx,
  )

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages)
    const prevY = window.scrollY
    onChangePage(clamped)
    window.scrollTo({ top: prevY })
  }

  return (
    <Flex gap="8px" alignItems="center" width="fit-content">
      <button
        type="button"
        css={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: `${currentPage === 1 ? 'not-allowed' : 'pointer'}`,
        }}
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
      >
        <Arrow width={16} css={{ transform: 'rotate(90deg)' }} />
      </button>
      {visiblePages.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => goToPage(page)}
          css={{
            background: 'transparent',
            border: 'none',
            color: page === currentPage ? theme.colors.lime : theme.colors.gray[300],
            fontWeight: page === currentPage ? 700 : 400,
            cursor: 'pointer',
          }}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        css={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: `${currentPage === totalPages ? 'not-allowed' : 'pointer'}`,
        }}
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        <Arrow width={16} css={{ transform: 'rotate(-90deg)' }} />
      </button>
    </Flex>
  )
}

export default Navigation
