import { createFileRoute, Outlet } from '@tanstack/react-router'

import Footer from '@/shared/layout/Footer/Footer'
import ChallengerHeader from '@/shared/layout/Header/ChallengerHeader'
import SchoolHeader from '@/shared/layout/Header/SchoolHeader'
import SuperHeader from '@/shared/layout/Header/SuperHeader'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import type { RoleType } from '@/shared/types/umc'
import Flex from '@/shared/ui/common/Flex/Flex'
import {
  getActiveRolePool,
  getHighestPriorityRole,
  isManagementRole,
  isSchoolRole,
} from '@/shared/utils/role'

type HeaderType = 'challenger' | 'management' | 'school'

/**
 * 권한에 맞는 헤더 타입을 결정
 */
function getHeaderType(roleType?: RoleType | null): HeaderType {
  if (isSchoolRole(roleType)) return 'school'
  if (isManagementRole(roleType)) return 'management'

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
  const { role, roles, gisu } = useUserProfileStore()
  const rolePool = getActiveRolePool({ role, roles, gisu })
  const selectedRole = getHighestPriorityRole(rolePool)
  const headerType = getHeaderType(selectedRole?.roleType)
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
