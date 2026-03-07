import { TabSubtitle, TabTitle } from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

const DataChange = () => {
  return (
    <Flex flexDirection="column" gap={16} alignItems="flex-start">
      <Flex flexDirection="column" gap={3} alignItems="flex-start">
        <TabTitle>데이터 변경 이력 조회</TabTitle>
        <TabSubtitle>시간순으로 데이터 변경 이력을 조회할 수 있습니다.</TabSubtitle>
      </Flex>
      <Flex
        height={'300px'}
        justifyContent="center"
        css={{ color: theme.colors.white, ...theme.typography.C2.Md }}
      >
        현재 지원하지 않는 기능입니다.
      </Flex>
    </Flex>
  )
}

export default DataChange
