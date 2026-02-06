import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { Tab } from '@/shared/ui/common/Tab'

import DataChange from '../components/system/DataChange/DataChange'
import { MANAGE_SYSTEM_TABS } from '../domain/constants'

export const SystemPage = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string
  onTabChange: (tab: string) => void
}) => {
  return (
    <PageLayout title="시스템 관리">
      <Tab tabs={MANAGE_SYSTEM_TABS} value={activeTab} onValueChange={onTabChange}>
        {activeTab === 'data' && <DataChange />}
      </Tab>
    </PageLayout>
  )
}
