import { useEffect, useRef, useState } from 'react'
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
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue ?? tabs[0]?.value)
  const activeValue = isControlled ? value : internalValue
  const listRef = useRef<HTMLDivElement | null>(null)

  const handleTabChange = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue as T)
    }
    onValueChange?.(nextValue as T)
  }

  useEffect(() => {
    if (!activeValue) return
    const activeTrigger = listRef.current?.querySelector<HTMLButtonElement>(
      'button[data-state="active"]',
    )
    if (!activeTrigger) return

    activeTrigger.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeValue])

  return (
    <TabsPrimitive.Root
      value={activeValue}
      defaultValue={defaultValue ?? tabs[0]?.value}
      onValueChange={handleTabChange}
      asChild
    >
      <S.SectionWrapper>
        <S.ListViewport>
          <S.StyledList ref={listRef}>
            {tabs.map(({ value: tabValue, label }) => (
              <S.StyledTrigger key={tabValue} value={tabValue}>
                {label}
              </S.StyledTrigger>
            ))}
          </S.StyledList>
        </S.ListViewport>
        <div
          css={[
            {
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 30,
              height: 'fit-content',
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
