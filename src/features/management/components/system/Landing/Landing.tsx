import { TabSubtitle, TabTitle } from '@/shared/styles/shared'
import { Flex } from '@/shared/ui/common/Flex'

const Landing = () => {
  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <TabTitle>렌딩 페이지 관리</TabTitle>
      <TabSubtitle>랜딩 페이지 구성 요소를 수정할 수 있습니다.</TabSubtitle>
    </Flex>
  )
}
export default Landing
