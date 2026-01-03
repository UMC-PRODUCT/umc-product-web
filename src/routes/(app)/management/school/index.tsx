import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod/v3'

import Flex from '@/components/common/Flex/Flex'
import Tab from '@/components/common/Tab/Tab'
import PageTitle from '@/components/layout/PageTitle/PageTitle'
import type { ManageSchoolTabName } from '@/constants/tabNames'
import { manageSchoolTabs } from '@/constants/tabNames'

import AddSchool from './-components/AddSchool'
import DeleteSchool from './-components/DeleteSchool'
import EditSchool from './-components/EditSchool'
import * as S from './School.style'

const tabSchema = z.object({
  tab: z.enum(['add', 'delete', 'edit'] as const).optional(),
})

export const Route = createFileRoute('/(app)/management/school/')({
  validateSearch: (search) => tabSchema.parse(search),
  component: RouteComponent,
})

function RouteComponent() {
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

  return (
    <S.PageLayout>
      <Flex flexDirection="column" gap="32px" maxWidth="1170px">
        <PageTitle title="학교 관리" />
        <Tab tabs={manageSchoolTabs} value={activeTab} onValueChange={setTab}>
          {activeTab === 'add' && <AddSchool />}
          {activeTab === 'delete' && <DeleteSchool />}
          {activeTab === 'edit' && <EditSchool />}
        </Tab>
      </Flex>
    </S.PageLayout>
  )
}
