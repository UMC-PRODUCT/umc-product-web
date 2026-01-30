import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { SchoolPage } from '@features/management/pages/SchoolPage'

import { MANAGE_SCHOOL_TAB_VALUES } from '@/features/management/domain/constants'
import type { ManageSchoolTabName } from '@/features/management/domain/model'

type SchoolTab = (typeof MANAGE_SCHOOL_TAB_VALUES)[number]

const isSchoolTab = (value: string): value is SchoolTab =>
  MANAGE_SCHOOL_TAB_VALUES.includes(value as SchoolTab)

const parseTabSearch = (search: Record<string, unknown>) => {
  const tabValue = typeof search.tab === 'string' ? search.tab : undefined
  const tab = tabValue && isSchoolTab(tabValue) ? tabValue : undefined
  return { tab }
}

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
  validateSearch: (search) => parseTabSearch(search),
  component: RouteComponent,
})
