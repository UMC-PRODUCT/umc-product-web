import AddSchool from '@features/management/components/school/AddSchool'
import DeleteSchool from '@features/management/components/school/DeleteSchool'
import EditSchool from '@features/management/components/school/EditSchool'
import * as S from '@features/management/components/school/School.style'
import type { ManageSchoolTabName } from '@features/management/constants/tabNames'
import { manageSchoolTabs } from '@features/management/constants/tabNames'

import PageTitle from '@shared/layout/PageTitle/PageTitle'
import Flex from '@shared/ui/common/Flex/Flex'
import Tab from '@shared/ui/common/Tab/Tab'

type SchoolPageProps = {
  activeTab: ManageSchoolTabName
  onTabChange: (next: ManageSchoolTabName) => void
}

export function SchoolPage({ activeTab, onTabChange }: SchoolPageProps) {
  return (
    <S.PageLayout>
      <Flex flexDirection="column" gap="32px" maxWidth="1170px">
        <PageTitle title="학교 관리" />
        <Tab tabs={manageSchoolTabs} value={activeTab} onValueChange={onTabChange}>
          {activeTab === 'add' && <AddSchool />}
          {activeTab === 'delete' && <DeleteSchool />}
          {activeTab === 'edit' && <EditSchool />}
        </Tab>
      </Flex>
    </S.PageLayout>
  )
}
