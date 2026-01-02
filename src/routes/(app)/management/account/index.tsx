import { createFileRoute, useNavigate } from '@tanstack/react-router'
import * as yup from 'yup'
import * as S from './Account.style'
import EditAccount from './-components/EditAccount'
import type { ManageAccountTabName } from '@/constants/tabNames'
import SectionTab from '@/components/common/SectionTab/SectionTab'
import PageTitle from '@/components/common/PageTitle/PageTitle'
import { manageAccountTabValues, manageAccountTabs } from '@/constants/tabNames'

const tabSchema = yup.object({
  tab: yup
    .mixed<ManageAccountTabName>()
    .oneOf(manageAccountTabValues)
    .optional(),
})

export const Route = createFileRoute('/(app)/management/account/')({
  validateSearch: (search) =>
    tabSchema.validateSync(search, {
      stripUnknown: true,
    }),
  component: RouteComponent,
})

function RouteComponent() {
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

  return (
    <S.PageLayout>
      <PageTitle title="계정 관리" />
      <SectionTab
        tabs={manageAccountTabs}
        currentTab={activeTab}
        setCurrentTab={setTab}
      >
        {activeTab === 'edit' && <EditAccount />}
      </SectionTab>
    </S.PageLayout>
  )
}
