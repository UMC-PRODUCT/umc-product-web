import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { NotFoundPage } from '@/shared/ui/feedback'

/**
 * 관리자(Management) 라우트 그룹
 * - 헤더는 상위 (app) 레이아웃에서 경로 기반으로 결정
 */
const RouteComponent = () => {
  return <Outlet />
}

export const Route = createFileRoute('/(app)/management')({
  beforeLoad: () => {
    const { role, gisu } = useUserProfileStore.getState()
    const activeRole = role && (!gisu || role.gisuId === gisu) ? role : null

    if (
      activeRole?.roleType !== 'CENTRAL_PRESIDENT' &&
      activeRole?.roleType !== 'CENTRAL_VICE_PRESIDENT' &&
      activeRole?.roleType !== 'CENTRAL_OPERATING_TEAM_MEMBER' &&
      activeRole?.roleType !== 'CENTRAL_EDUCATION_TEAM_MEMBER' &&
      activeRole?.roleType !== 'SUPER_ADMIN'
    ) {
      throw redirect({ to: '/school/dashboard' })
    }
  },
  component: RouteComponent,
  notFoundComponent: () => <NotFoundPage />,
})
