import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { ensureActiveRolePool } from '@/features/auth/utils/roleGuard'
import { NotFoundPage } from '@/shared/ui/feedback'
import { canAccessSchoolByRoles } from '@/shared/utils/role'

/**
 * 학교(School) 라우트 그룹
 * - 헤더는 상위 (app) 레이아웃에서 경로 기반으로 결정
 */
const RouteComponent = () => {
  return <Outlet />
}

export const Route = createFileRoute('/(app)/school')({
  beforeLoad: async () => {
    const rolePool = await ensureActiveRolePool()
    const canAccessSchool = canAccessSchoolByRoles(rolePool)

    if (!canAccessSchool) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
  notFoundComponent: () => <NotFoundPage />,
})
