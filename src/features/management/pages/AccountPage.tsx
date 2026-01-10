import type { ManageAccountTabName } from '@features/management/constants/tabNames'
import { manageAccountTabs } from '@features/management/constants/tabNames'

import Tab from '@shared/ui/common/Tab/Tab'

import EditAccount from '@/features/management/components/account/EditAccountTab/EditAccountTab'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'

import AddAccount from '../components/account/AddAccountTab/AddAccountTab'

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
