import { createFileRoute } from '@tanstack/react-router'

import { DashboardPage } from '@features/dashboard/pages/DashboardPage'

import { MOCK_APPLY_DATA } from '@/features/dashboard/mocks/apply'
import { DASHBOARD_PROGRESS_MOCK, DASHBOARD_USER_MOCK } from '@/features/dashboard/mocks/dashboard'

const RouteComponent = () => {
  const { user, progress, applyData } = Route.useLoaderData()
  return <DashboardPage user={user} progress={progress} applyData={applyData} />
}

export const Route = createFileRoute('/(app)/dashboard/')({
  loader: () => ({
    user: DASHBOARD_USER_MOCK,
    progress: DASHBOARD_PROGRESS_MOCK,
    applyData: MOCK_APPLY_DATA,
  }),
  component: RouteComponent,
})
