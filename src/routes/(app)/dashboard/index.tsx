import { createFileRoute } from '@tanstack/react-router'

import { DashboardPage } from '@features/dashboard/pages/DashboardPage'

const RouteComponent = () => <DashboardPage />

export const Route = createFileRoute('/(app)/dashboard/')({
  component: RouteComponent,
})
