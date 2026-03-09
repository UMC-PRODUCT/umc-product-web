import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { Tab } from '@/shared/ui/common/Tab'

import AccountCode from '../components/account/AccountCode/AccountCode'
import EditAccount from '../components/account/EditAccount/EditAccount'
import type { AccountTab } from '../domain/constants'
import { ACCOUNT_TABS } from '../domain/constants'

export const AccountPage = ({
  activeTab,
  onTabChange,
}: {
  activeTab: AccountTab
  onTabChange: (tab: AccountTab) => void
}) => {
  return (
    <PageLayout
      title="계정 관리"
      subTitle="모든 UMC 소속원들의 계정을 조회하고 수정할 수 있습니다."
    >
      <Tab tabs={ACCOUNT_TABS} value={activeTab} onValueChange={onTabChange}>
        {activeTab === 'code' && <AccountCode />}
        {activeTab === 'view' && <EditAccount />}
      </Tab>
    </PageLayout>
  )
}
