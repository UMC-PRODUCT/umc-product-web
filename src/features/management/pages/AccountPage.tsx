import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import Tab from '@/shared/ui/common/Tab/Tab'

import AddAccount from '../components/account/AddAccountTab/AddAccountTab'
import EditAccount from '../components/account/EditAccountTab/EditAccountTab'
import { MANAGE_ACCOUNT_TABS } from '../domain/constants'
import type { ManageAccountTabName } from '../domain/model'

type AccountPageProps = {
  activeTab: ManageAccountTabName
  onTabChange: (next: ManageAccountTabName) => void
}

export const AccountPage = ({ activeTab, onTabChange }: AccountPageProps) => {
  return (
    <PageLayout title="계정 관리">
      <Tab tabs={MANAGE_ACCOUNT_TABS} value={activeTab} onValueChange={onTabChange}>
        {activeTab === 'add' && <AddAccount />}
        {activeTab === 'edit' && <EditAccount />}
      </Tab>
    </PageLayout>
  )
}
