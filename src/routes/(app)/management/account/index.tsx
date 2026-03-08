import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { AccountPage } from '@features/management/pages/AccountPage'

import { MANAGE_ACCOUNT_TAB_VALUES } from '@/features/management/domain/constants'
import type { RouteSearch } from '@/shared/router/search'
import { parseOptionalStringSearch, parseTabSearch } from '@/shared/router/search'

type AccountTab = (typeof MANAGE_ACCOUNT_TAB_VALUES)[number]

type AccountSearch = {
  accountId?: string
  tab?: AccountTab
}

const parseAccountSearch = (search: RouteSearch): AccountSearch => {
  const accountId = parseOptionalStringSearch(search, 'accountId')
  const tabSearch = parseTabSearch(search, MANAGE_ACCOUNT_TAB_VALUES)

  return accountId === undefined ? tabSearch : { ...tabSearch, accountId }
}

const RouteComponent = () => {
  const { tab } = Route.useSearch()
  const navigate = useNavigate()
  const activeTab: AccountTab = tab ?? 'code'

  const setTab = (next: AccountTab) => {
    navigate({
      to: Route.to,
      search: (prev) => ({ ...prev, tab: next }),
      replace: true, // 히스토리 쌓기 싫으면
    })
  }

  return <AccountPage activeTab={activeTab} onTabChange={setTab} />
}

export const Route = createFileRoute('/(app)/management/account/')({
  validateSearch: (search) => parseAccountSearch(search),
  component: RouteComponent,
})
