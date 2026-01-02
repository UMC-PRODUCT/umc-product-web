import Flex from '@/components/common/Flex/Flex'
import Arrow from '@/assets/icons/arrow.svg?react'
import { theme } from '@/styles/theme'

export default function Navigation({
  currentPage,
  totalPages,
  onChangePage,
}: {
  currentPage: number
  totalPages: number
  onChangePage: (page: number) => void
}) {
  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1)
  const start = Math.floor((currentPage - 1) / 5) * 5
  const visiblePages = pageNumbers.slice(start, start + 5)

  const goToPage = (page: number) => {
    onChangePage(Math.min(Math.max(page, 1), totalPages))
  }

  return (
    <Flex gap="8px" alignItems="center" width="fit-content">
      <button
        css={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: `${currentPage == 1 ? 'not-allowed' : 'pointer'}`,
        }}
        onClick={() => onChangePage(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
      >
        <Arrow
          width={16}
          css={{ transform: 'rotate(90deg)' }}
          onClick={() => onChangePage(Math.max(1, currentPage - 1))}
        />
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          css={{
            background: 'transparent',
            border: 'none',
            color: page === currentPage ? theme.colors.lime : 'inherit',
            fontWeight: page === currentPage ? 700 : 400,
            cursor: 'pointer',
          }}
        >
          {page}
        </button>
      ))}
      <button
        css={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: `${currentPage === totalPages ? 'not-allowed' : 'pointer'}`,
        }}
        onClick={() => onChangePage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        <Arrow
          width={16}
          css={{ transform: 'rotate(-90deg)' }}
          onClick={() => onChangePage(Math.min(totalPages, currentPage + 1))}
        />
      </button>
    </Flex>
  )
}
