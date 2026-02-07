import { Flex } from '@/shared/ui/common/Flex'

import PageSubTitle from '../PageTitle/PageSubTitle'
import PageTitle from '../PageTitle/PageTitle'
import * as S from './PageLayout.style'

const PageLayout = ({
  children,
  title,
  subTitle,
}: {
  children: React.ReactNode
  title?: string
  subTitle?: string
}) => {
  return (
    <Flex justifyContent="center">
      <S.PageLayout>
        <S.Header>
          {title && <PageTitle title={title} />}
          {subTitle && <PageSubTitle subTitle={subTitle} />}
        </S.Header>
        {children}
      </S.PageLayout>
    </Flex>
  )
}

export default PageLayout
