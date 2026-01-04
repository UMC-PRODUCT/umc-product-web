import EditAccount from '@features/management/components/account/EditAccount'
import * as S from '@features/management/components/account/shared'
import type { ManageAccountTabName } from '@features/management/constants/tabNames'
import { manageAccountTabs } from '@features/management/constants/tabNames'

import PageTitle from '@shared/layout/PageTitle/PageTitle'
import Flex from '@shared/ui/common/Flex/Flex'
import Tab from '@shared/ui/common/Tab/Tab'

type AccountPageProps = {
  activeTab: ManageAccountTabName
  onTabChange: (next: ManageAccountTabName) => void
}

export function AccountPage({ activeTab, onTabChange }: AccountPageProps) {
  return (
    <S.PageLayout>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxWidth="1170px"
        gap="32px"
      >
        <PageTitle title="계정 관리" />
        <Tab tabs={manageAccountTabs} value={activeTab} onValueChange={onTabChange}>
          {/* TODO: 'add' 탭 - CreateAccount 컴포넌트 구현 예정 */}
          {/* TODO: 'level' 탭 - ManageLevelAccount 컴포넌트 구현 예정 */}
          {activeTab === 'edit' && <EditAccount />}
        </Tab>
      </Flex>
    </S.PageLayout>
  )
}
