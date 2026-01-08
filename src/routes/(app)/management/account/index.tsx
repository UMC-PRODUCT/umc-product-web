import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod/v3'

import type { ManageAccountTabName } from '@features/management/constants/tabNames'
import { AccountPage } from '@features/management/pages/AccountPage'

const tabSchema = z.object({
  tab: z.enum(['add', 'edit', 'level'] as const).optional(),
})

const RouteComponent = () => {
  const { tab } = Route.useSearch()
  const navigate = useNavigate()
  const activeTab: ManageAccountTabName = tab ?? 'add'

  const setTab = (next: ManageAccountTabName) => {
    navigate({
      to: Route.to,
      search: (prev) => ({ ...prev, tab: next }),
      replace: true, // 히스토리 쌓기 싫으면
    })
  }

  return <AccountPage activeTab={activeTab} onTabChange={setTab} />
}

export const Route = createFileRoute('/(app)/management/account/')({
  validateSearch: (search) => tabSchema.parse(search),
  component: RouteComponent,
})
