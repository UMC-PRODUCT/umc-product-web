import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod/v3'

import type { ManageSchoolTabName } from '@features/management/constants/tabNames'
import { SchoolPage } from '@features/management/pages/SchoolPage'

const tabSchema = z.object({
  tab: z.enum(['add', 'delete', 'edit'] as const).optional(),
})

const RouteComponent = () => {
  const { tab } = Route.useSearch()
  const navigate = useNavigate()
  const activeTab: ManageSchoolTabName = tab ?? 'add'

  const setTab = (next: ManageSchoolTabName) => {
    navigate({
      to: Route.to,
      search: (prev) => ({ ...prev, tab: next }),
      replace: true, // 히스토리 쌓기 싫으면
    })
  }

  return <SchoolPage activeTab={activeTab} onTabChange={setTab} />
}

export const Route = createFileRoute('/(app)/management/school/')({
  validateSearch: (search) => tabSchema.parse(search),
  component: RouteComponent,
})
