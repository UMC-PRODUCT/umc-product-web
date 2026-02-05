import { createFileRoute } from '@tanstack/react-router'

import { LoginRedirectPage } from '@/features/auth/pages/LoginRedirectPage'

export const Route = createFileRoute('/(oauth)/oauth/callback/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginRedirectPage />
}
