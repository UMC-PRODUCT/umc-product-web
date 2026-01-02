import * as S from './SectionTab.style'

export default function SectionTab({
  tabNames,
  currentTab,
  setCurrentTab,
  children,
}: {
  children?: React.ReactNode
  tabNames?: Array<string>
  currentTab?: string
  setCurrentTab?: (tab: string) => void
}) {
  return (
    <S.SectionWrapper>
      <S.TabList>
        {tabNames?.map((tabName) => (
          <S.TabButton
            key={tabName}
            $active={currentTab === tabName}
            onClick={() => setCurrentTab && setCurrentTab(tabName)}
          >
            {tabName}
          </S.TabButton>
        ))}
      </S.TabList>
      <S.Content>{children}</S.Content>
    </S.SectionWrapper>
  )
}
