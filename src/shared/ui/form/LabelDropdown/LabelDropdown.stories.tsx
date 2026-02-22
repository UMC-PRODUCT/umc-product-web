import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { Option } from '@/shared/types/form'

import LabelDropdown from './LabelDropdown'

const options: Array<Option<string>> = [
  { id: 'plan', label: '기획' },
  { id: 'design', label: '디자인' },
  { id: 'web', label: '웹' },
  { id: 'android', label: '안드로이드' },
]

const meta = {
  title: 'Shared/Form/LabelDropdown',
  component: LabelDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LabelDropdown>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Option<string> | undefined>(options[0])

    return (
      <div style={{ width: 460 }}>
        <LabelDropdown
          label="지원 파트"
          placeholder="파트를 선택해 주세요"
          options={options}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}
