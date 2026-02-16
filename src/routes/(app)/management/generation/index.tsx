import { createFileRoute } from '@tanstack/react-router'

import GenerationPage from '@/features/management/pages/GenerationPage'

export const Route = createFileRoute('/(app)/management/generation/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <GenerationPage />
}
