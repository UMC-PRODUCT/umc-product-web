import { createFileRoute } from '@tanstack/react-router'

import { ApplyPage } from '@features/apply/pages/ApplyPage'

const RouteComponent = () => {
  return <ApplyPage />
}

export const Route = createFileRoute('/(app)/apply/')({
  component: RouteComponent,
})
