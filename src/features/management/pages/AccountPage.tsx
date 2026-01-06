import EditAccount from '@features/management/components/account/EditAccount'
import type { ManageAccountTabName } from '@features/management/constants/tabNames'
import { manageAccountTabs } from '@features/management/constants/tabNames'

import Tab from '@shared/ui/common/Tab/Tab'

import PageLayout from '@/shared/layout/PageLayout/PageLayout'

type AccountPageProps = {
  activeTab: ManageAccountTabName
  onTabChange: (next: ManageAccountTabName) => void
}

export function AccountPage({ activeTab, onTabChange }: AccountPageProps) {
  return (
    <PageLayout title="계정 관리">
      <Tab tabs={manageAccountTabs} value={activeTab} onValueChange={onTabChange}>
        {/* TODO: 'add' 탭 - CreateAccount 컴포넌트 구현 예정 */}
        {/* TODO: 'level' 탭 - ManageLevelAccount 컴포넌트 구현 예정 */}
        {activeTab === 'edit' && <EditAccount />}
      </Tab>
    </PageLayout>
  )
}
