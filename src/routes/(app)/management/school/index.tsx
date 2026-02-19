import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { SchoolPage } from '@features/management/pages/SchoolPage'

import { MANAGE_SCHOOL_TAB_VALUES } from '@/features/management/domain/constants'
import type { ManageSchoolTabName } from '@/features/management/domain/model'
import { parseTabSearch } from '@/shared/router/search'

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
  validateSearch: (search) => parseTabSearch(search, MANAGE_SCHOOL_TAB_VALUES),
  component: RouteComponent,
})
