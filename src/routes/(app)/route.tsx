import { createFileRoute, Outlet } from '@tanstack/react-router'

import Footer from '@/shared/layout/Footer/Footer'
import ChallengerHeader from '@/shared/layout/Header/ChallengerHeader'
import SchoolHeader from '@/shared/layout/Header/SchoolHeader'
import SuperHeader from '@/shared/layout/Header/SuperHeader'
// import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import type { RoleType } from '@/shared/types/umc'
import Flex from '@/shared/ui/common/Flex/Flex'

type HeaderType = 'challenger' | 'management' | 'school'

/**
 * 권한에 맞는 헤더 타입을 결정
 */
function getHeaderType(roleType?: RoleType): HeaderType {
  if (
    roleType === 'SCHOOL_ETC_ADMIN' ||
    roleType === 'SCHOOL_PART_LEADER' ||
    roleType === 'SCHOOL_PRESIDENT' ||
    roleType === 'SCHOOL_VICE_PRESIDENT'
  )
    return 'school'
  if (roleType === 'SUPER_ADMIN') return 'management'

  return 'challenger'
}

/**
 * 헤더 타입에 따른 헤더 컴포넌트 매핑
 */
const HEADER_COMPONENTS: Record<HeaderType, React.ComponentType> = {
  challenger: ChallengerHeader,
  management: SuperHeader,
  school: SchoolHeader,
}

/**
 * 앱 레이아웃
 * - 경로에 따라 적절한 헤더 렌더링
 * - 공통 Footer 렌더링
 */
const RouteComponent = () => {
  // const { role, gisu } = useUserProfileStore()
  // const activeRole = role && (!gisu || role.gisuId === gisu) ? role : null
  // const headerType = getHeaderType(activeRole?.roleType)
  const headerType: HeaderType = 'school' // TODO: 임시로 학교 헤더 고정
  const HeaderComponent = HEADER_COMPONENTS[headerType]

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <HeaderComponent />
      <Flex css={{ flex: 1 }}>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  )
}

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
})
