import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import Tab, { Tabs } from './Tab'

type TabValue = 'overview' | 'schedule' | 'notice'

const tabs = [
  { label: '개요', value: 'overview' },
  { label: '일정', value: 'schedule' },
  { label: '공지', value: 'notice' },
] as const satisfies ReadonlyArray<{ label: string; value: TabValue }>

const meta: Meta = {
  title: 'Common/Tab',
  component: Tab as never,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Uncontrolled: Story = {
  render: () => (
    <div style={{ width: 760, maxWidth: '100%' }}>
      <Tab<TabValue> tabs={tabs} defaultValue="overview">
        <Tabs.Content value="overview">개요 탭 콘텐츠</Tabs.Content>
        <Tabs.Content value="schedule">일정 탭 콘텐츠</Tabs.Content>
        <Tabs.Content value="notice">공지 탭 콘텐츠</Tabs.Content>
      </Tab>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<TabValue>('schedule')

    return (
      <div style={{ width: 760, maxWidth: '100%' }}>
        <Tab<TabValue> tabs={tabs} value={value} onValueChange={setValue}>
          <Tabs.Content value="overview">개요 탭 콘텐츠</Tabs.Content>
          <Tabs.Content value="schedule">일정 탭 콘텐츠</Tabs.Content>
          <Tabs.Content value="notice">공지 탭 콘텐츠</Tabs.Content>
        </Tab>
      </div>
    )
  },
}
