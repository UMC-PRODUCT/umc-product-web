import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { Tab } from '@/shared/ui/common/Tab'

import AddBranch from '../components/branch/AddBranch'
import MatchingBranch from '../components/branch/MatchingBranch'
import { MANAGE_BRANCH_TABS } from '../domain/constants'

const BranchPage = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string
  onTabChange: (tab: string) => void
}) => {
  return (
    <PageLayout title="지부 관리">
      <Tab tabs={MANAGE_BRANCH_TABS} value={activeTab} onValueChange={onTabChange}>
        {activeTab === 'add' && <AddBranch />}
        {activeTab === 'match' && <MatchingBranch />}
      </Tab>
    </PageLayout>
  )
}
export default BranchPage
