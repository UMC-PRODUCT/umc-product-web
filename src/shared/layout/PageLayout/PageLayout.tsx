import { Flex } from '@/shared/ui/common/Flex'

import PageTitle from '../PageTitle/PageTitle'
import * as S from './PageLayout.style'

const PageLayout = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  return (
    <Flex justifyContent="center">
      <S.PageLayout>
        {title && <PageTitle title={title} />}
        {children}
      </S.PageLayout>
    </Flex>
  )
}

export default PageLayout
