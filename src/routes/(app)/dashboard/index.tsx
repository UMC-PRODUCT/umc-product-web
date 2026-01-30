import { createFileRoute } from '@tanstack/react-router'

import { DashboardPage } from '@features/dashboard/pages/DashboardPage'

import { MOCK_APPLY_DATA } from '@/features/dashboard/mocks/apply'
import { DASHBOARD_PROGRESS_MOCK } from '@/features/dashboard/mocks/dashboard'

const RouteComponent = () => <DashboardPage />

export const Route = createFileRoute('/(app)/dashboard/')({
  loader: () => ({
    progress: DASHBOARD_PROGRESS_MOCK,
    applyData: MOCK_APPLY_DATA,
  }),
  component: RouteComponent,
})
