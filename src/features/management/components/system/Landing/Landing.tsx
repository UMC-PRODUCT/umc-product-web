import { TabSubtitle, TabTitle } from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

const Landing = () => {
  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <TabTitle>렌딩 페이지 관리</TabTitle>
      <TabSubtitle>랜딩 페이지 구성 요소를 수정할 수 있습니다.</TabSubtitle>
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
export default Landing
