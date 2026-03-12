import { createFileRoute } from '@tanstack/react-router'

import { LoginPage } from '@features/auth/pages/LoginPage'

type LoginRouteSearch = {
  oauthError?: string
}

const RouteComponent = () => {
  const { oauthError } = Route.useSearch()
  return <LoginPage oauthError={oauthError} />
}

export const Route = createFileRoute('/(auth)/auth/login/')({
  validateSearch: (search: Record<string, unknown>): LoginRouteSearch => ({
    oauthError: typeof search.oauthError === 'string' ? search.oauthError : undefined,
  }),
  component: RouteComponent,
})
