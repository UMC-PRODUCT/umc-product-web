import Tab from '@shared/ui/common/Tab/Tab'

import PageLayout from '@/shared/layout/PageLayout/PageLayout'

import AddAccount from '../components/account/AddAccountTab/AddAccountTab'
import EditAccount from '../components/account/EditAccountTab/EditAccountTab'
import type { ManageAccountTabName } from '../constants/tabNames'
import { manageAccountTabs } from '../constants/tabNames'

type AccountPageProps = {
  activeTab: ManageAccountTabName
  onTabChange: (next: ManageAccountTabName) => void
}

export const AccountPage = ({ activeTab, onTabChange }: AccountPageProps) => {
  return (
    <PageLayout title="계정 관리">
      <Tab tabs={manageAccountTabs} value={activeTab} onValueChange={onTabChange}>
        {/* TODO: 'add' 탭 - CreateAccount 컴포넌트 구현 예정 */}
        {activeTab === 'add' && <AddAccount />}
        {/* TODO: 'level' 탭 - ManageLevelAccount 컴포넌트 구현 예정 */}
        {activeTab === 'edit' && <EditAccount />}
      </Tab>
    </PageLayout>
  )
}
