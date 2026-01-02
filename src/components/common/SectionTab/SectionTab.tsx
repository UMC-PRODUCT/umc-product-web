import * as S from './SectionTab.style'

type SectionTabProps<T extends string> = {
  children?: React.ReactNode
  tabs?: ReadonlyArray<{ label: string; value: T }>
  currentTab?: T
  setCurrentTab?: (tab: T) => void
}

export default function SectionTab<T extends string>({
  tabs,
  currentTab,
  setCurrentTab,
  children,
}: SectionTabProps<T>) {
  return (
    <S.SectionWrapper>
      <S.TabList>
        {tabs?.map(({ value, label }) => (
          <S.TabButton
            key={value}
            $active={currentTab === value}
            onClick={() => setCurrentTab && setCurrentTab(value)}
          >
            {label}
          </S.TabButton>
        ))}
      </S.TabList>
      <S.Content>{children}</S.Content>
    </S.SectionWrapper>
  )
}
