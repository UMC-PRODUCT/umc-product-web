import { createFileRoute, useNavigate } from '@tanstack/react-router'
import * as yup from 'yup'

import PageTitle from '@/components/common/PageTitle/PageTitle'
import SectionTab from '@/components/common/SectionTab/SectionTab'
import type { ManageSchoolTabName } from '@/constants/tabNames'
import { manageSchoolTabs, manageSchoolTabValues } from '@/constants/tabNames'

import AddSchool from './-components/AddSchool'
import DeleteSchool from './-components/DeleteSchool'
import EditSchool from './-components/EditSchool'
import * as S from './School.style'

const tabSchema = yup.object({
  tab: yup.mixed<ManageSchoolTabName>().oneOf(manageSchoolTabValues).optional(),
})

export const Route = createFileRoute('/(app)/management/school/')({
  validateSearch: (search) =>
    tabSchema.validateSync(search, {
      stripUnknown: true,
    }),
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
      <PageTitle title="학교 관리" />
      <SectionTab
        tabs={manageSchoolTabs}
        currentTab={activeTab}
        setCurrentTab={setTab}
      >
        {activeTab === 'add' && <AddSchool />}
        {activeTab === 'delete' && <DeleteSchool />}
        {activeTab === 'edit' && <EditSchool />}
      </SectionTab>
    </S.PageLayout>
  )
}
