import { TabSubtitle, TabTitle } from '@/shared/styles/shared'
import { Flex } from '@/shared/ui/common/Flex'

const Curriculum = () => {
  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <TabTitle>커리큘럼 관리</TabTitle>
      <TabSubtitle>파트별 커리큘럼을 수정할 수 있습니다.</TabSubtitle>
    </Flex>
  )
}
export default Curriculum
