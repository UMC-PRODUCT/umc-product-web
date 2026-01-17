import Tab from '@shared/ui/common/Tab/Tab'

import PageLayout from '@/shared/layout/PageLayout/PageLayout'

import AddSchool from '../components/school/AddSchool'
import DeleteSchool from '../components/school/DeleteSchool'
import EditSchool from '../components/school/EditSchool'
import type { ManageSchoolTabName } from '../constants/tabNames'
import { manageSchoolTabs } from '../constants/tabNames'

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
