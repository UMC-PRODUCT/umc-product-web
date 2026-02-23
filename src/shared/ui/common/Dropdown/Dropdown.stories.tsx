import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { Option } from '@/shared/types/form'

import { Dropdown } from './Dropdown'

const options: Array<Option<string>> = [
  { id: 'all', label: '전체' },
  { id: 'plan', label: '기획' },
  { id: 'design', label: '디자인' },
  { id: 'web', label: '웹' },
]

const meta = {
  title: 'Common/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj

export const Uncontrolled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Dropdown options={options} placeholder="파트를 선택해 주세요" defaultValue={options[0]} />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<Option<string> | undefined>(options[1])

    return (
      <div style={{ width: 320 }}>
        <Dropdown
          options={options}
          placeholder="파트를 선택해 주세요"
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Dropdown options={options} placeholder="선택 불가" disabled defaultValue={options[0]} />
    </div>
  ),
}
