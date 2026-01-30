import { createFileRoute } from '@tanstack/react-router'

import { RegisterPage } from '@features/auth/pages/RegisterPage'

type RegisterRouteSearch = {
  oAuthVerificationToken?: string
  email?: string
}

const RouteComponent = () => {
  const { oAuthVerificationToken, email } = Route.useSearch()
  return <RegisterPage oAuthVerificationToken={oAuthVerificationToken} email={email} />
}

export const Route = createFileRoute('/(auth)/auth/register/')({
  validateSearch: (search: Record<string, unknown>): RegisterRouteSearch => {
    return {
      oAuthVerificationToken:
        typeof search.oAuthVerificationToken === 'string'
          ? search.oAuthVerificationToken
          : undefined,
      email: typeof search.email === 'string' ? search.email : undefined,
    }
  },
  component: RouteComponent,
})
