import { useState } from 'react'

import { DATA_CHANGE_MOCK } from '@/features/management/mocks/data'
import { TabSubtitle, TabTitle } from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import Navigation from '@/shared/ui/common/Navigation/Navigation'

import * as S from './DataChange.style'

const DataChange = () => {
  const [page, setPage] = useState(1)
  return (
    <Flex flexDirection="column" gap={16} alignItems="flex-start">
      <Flex flexDirection="column" gap={3} alignItems="flex-start">
        <TabTitle>데이터 변경 이력 조회</TabTitle>
        <TabSubtitle>시간순으로 데이터 변경 이력을 조회할 수 있습니다.</TabSubtitle>
      </Flex>
      {DATA_CHANGE_MOCK.map((data) => (
        <Data key={data.id} {...data} />
      ))}
      <Flex justifyContent="center">
        <Navigation currentPage={page} totalPages={5} onChangePage={setPage} />
      </Flex>
    </Flex>
  )
}

export default DataChange

const Data = ({
  id,
  title,
  school,
  date,
  message,
}: {
  id: string
  title: string
  school: string
  date: string
  message: string
}) => {
  return (
    <Flex
      flexDirection="column"
      gap={0}
      alignItems="flex-start"
      key={id}
      css={{ borderBottom: `1px solid ${theme.colors.gray[700]}`, paddingBottom: '16px' }}
    >
      <S.Title>
        <span className="title">{title}</span> <span>•</span> <span>{school}</span>
      </S.Title>
      <S.Date>{date}</S.Date>
      <S.Message>{message}</S.Message>
    </Flex>
  )
}
