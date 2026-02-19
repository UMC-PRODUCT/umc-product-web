// import { useState } from 'react'

// import { DATA_CHANGE_MOCK } from '@/features/management/mocks/data'
import { TabSubtitle, TabTitle } from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
// import Navigation from '@/shared/ui/common/Navigation/Navigation'

const DataChange = () => {
  // const [page, setPage] = useState(1)
  return (
    <Flex flexDirection="column" gap={16} alignItems="flex-start">
      <Flex flexDirection="column" gap={3} alignItems="flex-start">
        <TabTitle>데이터 변경 이력 조회</TabTitle>
        <TabSubtitle>시간순으로 데이터 변경 이력을 조회할 수 있습니다.</TabSubtitle>
      </Flex>
      {/* {DATA_CHANGE_MOCK.map((data) => (
        <Data key={data.id} {...data} />
      ))} */}
      <Flex
        height={'300px'}
        justifyContent="center"
        css={{ color: theme.colors.white, ...theme.typography.C2.Md }}
      >
        현재 지원하지 않는 기능입니다.
      </Flex>
      {/* <Flex justifyContent="center">
        <Navigation currentPage={page} totalPages={5} onChangePage={setPage} />
      </Flex> */}
    </Flex>
  )
}

export default DataChange
