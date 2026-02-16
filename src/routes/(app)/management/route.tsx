import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { ensureActiveRolePool } from '@/features/auth/utils/roleGuard'
import { NotFoundPage } from '@/shared/ui/feedback'
import { canAccessManagementByRoles } from '@/shared/utils/role'

/**
 * 관리자(Management) 라우트 그룹
 * - 헤더는 상위 (app) 레이아웃에서 경로 기반으로 결정
 */
const RouteComponent = () => {
  return <Outlet />
}

export const Route = createFileRoute('/(app)/management')({
  beforeLoad: async () => {
    const rolePool = await ensureActiveRolePool()
    const canAccessManagement = canAccessManagementByRoles(rolePool)

    if (!canAccessManagement) {
      throw redirect({ to: '/school/dashboard' })
    }
  },
  component: RouteComponent,
  notFoundComponent: () => <NotFoundPage />,
})
