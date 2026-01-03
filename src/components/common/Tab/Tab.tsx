import * as TabsPrimitive from '@radix-ui/react-tabs'

import * as S from './Tab.style'

type TabProps<T extends string> = {
  tabs: ReadonlyArray<{ label: string; value: T }>
  value?: T
  defaultValue?: T
  onValueChange?: (tab: T) => void
  children?: React.ReactNode
}

export default function Tab<T extends string>({
  tabs,
  value,
  defaultValue,
  onValueChange,
  children,
}: TabProps<T>) {
  return (
    <TabsPrimitive.Root
      value={value}
      defaultValue={defaultValue ?? tabs[0]?.value}
      onValueChange={onValueChange as (value: string) => void}
      asChild
    >
      <S.SectionWrapper>
        <S.StyledList>
          {tabs.map(({ value: tabValue, label }) => (
            <S.StyledTrigger key={tabValue} value={tabValue}>
              {label}
            </S.StyledTrigger>
          ))}
        </S.StyledList>
        <S.Content>{children}</S.Content>
      </S.SectionWrapper>
    </TabsPrimitive.Root>
  )
}

export { TabsPrimitive as Tabs }
