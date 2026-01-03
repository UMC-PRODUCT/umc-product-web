import { createFileRoute, useNavigate } from '@tanstack/react-router'
import * as yup from 'yup'

import Flex from '@/components/common/Flex/Flex'
import Tab from '@/components/common/Tab/Tab'
import PageTitle from '@/components/layout/PageTitle/PageTitle'
import type { ManageAccountTabName } from '@/constants/tabNames'
import { manageAccountTabs, manageAccountTabValues } from '@/constants/tabNames'
import * as S from '@/routes/(app)/management/account/-styles/shared'

import EditAccount from './-components/EditAccount'

const tabSchema = yup.object({
  tab: yup.mixed<ManageAccountTabName>().oneOf(manageAccountTabValues).optional(),
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
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxWidth="1170px"
        gap="32px"
      >
        <PageTitle title="계정 관리" />
        <Tab tabs={manageAccountTabs} value={activeTab} onValueChange={setTab}>
          {activeTab === 'edit' && <EditAccount />}
        </Tab>
      </Flex>
    </S.PageLayout>
  )
}
