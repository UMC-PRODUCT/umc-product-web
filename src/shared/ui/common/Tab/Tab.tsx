import type { Interpolation, Theme } from '@emotion/react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

import * as S from './Tab.style'

type TabProps<T extends string> = {
  tabs: ReadonlyArray<{ label: string; value: T }>
  value?: T
  defaultValue?: T
  onValueChange?: (tab: T) => void
  children?: React.ReactNode
  contentCss?: Interpolation<Theme>
}

const Tab = <T extends string>({
  tabs,
  value,
  defaultValue,
  onValueChange,
  children,
  contentCss,
}: TabProps<T>) => {
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
        <div
          css={[
            {
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 30,
              border: `1px solid ${theme.colors.gray[700]}`,
              borderRadius: '0 0 10px 10px',
              padding: '40px 46px',
              [media.down(theme.breakPoints.desktop)]: {
                padding: '20px 20px',
              },
              [media.down(theme.breakPoints.tablet)]: {
                padding: '12px 12px',
              },
            },
            contentCss,
          ]}
        >
          {children}
        </div>
      </S.SectionWrapper>
    </TabsPrimitive.Root>
  )
}

export { TabsPrimitive as Tabs }

export default Tab
