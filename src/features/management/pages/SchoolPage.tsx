import AddSchool from '@features/management/components/school/AddSchool'
import DeleteSchool from '@features/management/components/school/DeleteSchool'
import EditSchool from '@features/management/components/school/EditSchool'
import type { ManageSchoolTabName } from '@features/management/constants/tabNames'
import { manageSchoolTabs } from '@features/management/constants/tabNames'

import Tab from '@shared/ui/common/Tab/Tab'

import PageLayout from '@/shared/layout/PageLayout/PageLayout'

type SchoolPageProps = {
  activeTab: ManageSchoolTabName
  onTabChange: (next: ManageSchoolTabName) => void
}

export const SchoolPage = ({ activeTab, onTabChange }: SchoolPageProps) => {
  return (
    <PageLayout title="학교 관리">
      <Tab tabs={manageSchoolTabs} value={activeTab} onValueChange={onTabChange}>
        {activeTab === 'add' && <AddSchool />}
        {activeTab === 'delete' && <DeleteSchool />}
        {activeTab === 'edit' && <EditSchool />}
      </Tab>
    </PageLayout>
  )
}
