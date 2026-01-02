import Arrow from '@/assets/icons/arrow.svg?react'
import Flex from '@/components/common/Flex/Flex'
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
          cursor: `${currentPage == 1 ? 'not-allowed' : 'pointer'}`,
        }}
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
      >
        <Arrow
          width={16}
          css={{ transform: 'rotate(90deg)' }}
          onClick={() => goToPage(Math.max(1, currentPage - 1))}
        />
      </button>
      {visiblePages.map((page) => (
        <button
          type="button"
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
        type="button"
        css={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: `${currentPage === totalPages ? 'not-allowed' : 'pointer'}`,
        }}
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        <Arrow
          width={16}
          css={{ transform: 'rotate(-90deg)' }}
          onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        />
      </button>
    </Flex>
  )
}
