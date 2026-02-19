import { createFileRoute } from '@tanstack/react-router'

import { AccountPage } from '@features/management/pages/AccountPage'

import type { RouteSearch } from '@/shared/router/search'
import { parseOptionalStringSearch } from '@/shared/router/search'

const parseAccountSearch = (search: RouteSearch) => {
  const accountId = parseOptionalStringSearch(search, 'accountId')
  return { accountId }
}

const RouteComponent = () => {
  return <AccountPage />
}

export const Route = createFileRoute('/(app)/management/account/')({
  validateSearch: (search) => parseAccountSearch(search),
  component: RouteComponent,
})
