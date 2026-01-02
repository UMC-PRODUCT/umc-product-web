import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import * as S from './School.style'
import AddSchool from './-components/AddSchool'
import EditSchool from './-components/EditSchool'
import SectionTab from '@/components/common/SectionTab/SectionTab'
import PageTitle from '@/components/common/PageTitle/PageTitle'

export const Route = createFileRoute('/(app)/management/school/')({
  component: RouteComponent,
})

const tabNames = ['신규 학교 추가', '학교 삭제', '학교 정보 수정']
function RouteComponent() {
  const [currentTab, setCurrentTab] = useState(tabNames[0])

  return (
    <S.PageLayout>
      <PageTitle title="학교 관리" />
      <SectionTab
        tabNames={tabNames}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      >
        {currentTab === '신규 학교 추가' && <AddSchool />}
        {currentTab === '학교 삭제' && <div>학교 삭제 페이지</div>}
        {currentTab === '학교 정보 수정' && <EditSchool />}
      </SectionTab>
    </S.PageLayout>
  )
}
