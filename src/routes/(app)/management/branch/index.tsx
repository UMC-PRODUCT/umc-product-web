import { createFileRoute } from '@tanstack/react-router'

import BranchPage from '@/features/management/pages/BranchPage'

export const Route = createFileRoute('/(app)/management/branch/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BranchPage />
}
