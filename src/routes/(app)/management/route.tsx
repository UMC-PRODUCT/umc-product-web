import { createFileRoute, Outlet } from '@tanstack/react-router'

import { NotFoundPage } from '@/shared/ui/feedback'

/**
 * 관리자(Management) 라우트 그룹
 * - 헤더는 상위 (app) 레이아웃에서 경로 기반으로 결정
 */
const RouteComponent = () => {
  return <Outlet />
}

export const Route = createFileRoute('/(app)/management')({
  component: RouteComponent,
  notFoundComponent: () => <NotFoundPage />,
})
