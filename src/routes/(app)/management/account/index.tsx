import { createFileRoute } from '@tanstack/react-router'

import { AccountPage } from '@features/management/pages/AccountPage'

const parseAccountSearch = (search: Record<string, unknown>) => {
  const accountId = typeof search.accountId === 'string' ? search.accountId : undefined
  return { accountId }
}

const RouteComponent = () => {
  return <AccountPage />
}

export const Route = createFileRoute('/(app)/management/account/')({
  validateSearch: (search) => parseAccountSearch(search),
  component: RouteComponent,
})
