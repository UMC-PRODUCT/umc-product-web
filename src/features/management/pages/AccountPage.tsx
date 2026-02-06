import PageLayout from '@/shared/layout/PageLayout/PageLayout'

import EditAccount from '../components/account/EditAccountTab/EditAccountTab'

export const AccountPage = () => {
  return (
    <PageLayout
      title="계정 관리"
      subTitle="모든 UMC 소속원들의 계정을 조회하고 수정할 수 있습니다."
    >
      <EditAccount />
    </PageLayout>
  )
}
