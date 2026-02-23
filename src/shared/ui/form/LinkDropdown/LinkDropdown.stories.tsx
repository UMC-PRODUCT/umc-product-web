import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { Option } from '@/shared/types/form'

import LinkDropdown from './LinkDropdown'

const options: Array<Option<string>> = [
  { id: 'KAKAO', label: '카카오' },
  { id: 'INSTAGRAM', label: '인스타그램' },
  { id: 'YOUTUBE', label: '유튜브' },
]

const meta = {
  title: 'Shared/Form/LinkDropdown',
  component: LinkDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkDropdown>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Option<string> | null>(options[0])

    return (
      <div style={{ width: 220 }}>
        <LinkDropdown options={options} value={value} onChange={setValue} />
      </div>
    )
  },
}
