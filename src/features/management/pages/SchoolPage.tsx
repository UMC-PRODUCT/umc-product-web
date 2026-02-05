import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import Tab from '@/shared/ui/common/Tab/Tab'

import AddSchool from '../components/school/AddSchool'
import DeleteSchool from '../components/school/DeleteSchool'
import EditSchool from '../components/school/EditSchool'
import { MANAGE_SCHOOL_TABS } from '../domain/constants'
import type { ManageSchoolTabName } from '../domain/model'

type SchoolPageProps = {
  activeTab: ManageSchoolTabName
  onTabChange: (next: ManageSchoolTabName) => void
}

export const SchoolPage = ({ activeTab, onTabChange }: SchoolPageProps) => {
  return (
    <PageLayout title="학교 관리">
      <Tab tabs={MANAGE_SCHOOL_TABS} value={activeTab} onValueChange={onTabChange}>
        {activeTab === 'add' && <AddSchool />}
        {activeTab === 'delete' && <DeleteSchool />}
        {activeTab === 'edit' && <EditSchool />}
      </Tab>
    </PageLayout>
  )
}
