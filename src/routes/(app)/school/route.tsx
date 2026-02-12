import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { NotFoundPage } from '@/shared/ui/feedback'

/**
 * 학교(School) 라우트 그룹
 * - 헤더는 상위 (app) 레이아웃에서 경로 기반으로 결정
 */
const RouteComponent = () => {
  return <Outlet />
}

export const Route = createFileRoute('/(app)/school')({
  beforeLoad: () => {
    const { role, gisu } = useUserProfileStore.getState()
    const activeRole = role && (!gisu || role.gisuId === gisu) ? role : null

    if (!activeRole?.roleType?.startsWith('SCHOOL_')) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
  notFoundComponent: () => <NotFoundPage />,
})
