import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './Text'

const meta = {
  title: 'Common/Question/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    mode: 'edit',
    placeholder: '내용을 입력해 주세요.',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj

export const Editable: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ width: 360 }}>
        <Text mode="edit" placeholder="내용을 입력해 주세요." value={value} onChange={setValue} />
      </div>
    )
  },
}

export const ViewMode: Story = {
  args: {
    mode: 'view',
    value: '읽기 전용 값',
  },
}
