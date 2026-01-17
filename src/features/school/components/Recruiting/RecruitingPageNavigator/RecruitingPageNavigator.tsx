import { PAGE_INFO } from '@/features/school/constants/PageInfo'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './RecruitingPageNavigator.style'

const RecuritingPageNavigator = ({
  page,
  setPage,
  currentPage,
}: {
  page: number
  setPage: (page: number) => void
  currentPage: number
}) => {
  return (
    <Section
      variant="both"
      onClick={() => setPage(page)}
      width={192}
      padding={'15px 18px'}
      gap={6}
      css={{
        cursor: 'pointer',
        backgroundColor: theme.colors.gray[700],
        height: 'fit-content',
        alignItems: 'flex-start',
        border:
          currentPage === page
            ? `2px solid ${theme.colors.lime}`
            : `1px solid ${theme.colors.gray[600]}`,
        [media.down(theme.breakPoints.tablet)]: {
          height: '115px',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <S.Page>Page {page}</S.Page>
      <S.PageInfo>{PAGE_INFO[page - 1].title}</S.PageInfo>
    </Section>
  )
}

export default RecuritingPageNavigator
