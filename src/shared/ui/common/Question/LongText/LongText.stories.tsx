import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { LongText } from './LongText'

const meta = {
  title: 'Common/Question/LongText',
  component: LongText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    mode: 'edit',
    placeholder: '자유롭게 작성해주세요.',
  },
} satisfies Meta<typeof LongText>

export default meta
type Story = StoryObj

export const Editable: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ width: 480 }}>
        <LongText
          mode="edit"
          placeholder="자유롭게 작성해주세요."
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const ViewMode: Story = {
  args: {
    mode: 'view',
    value: '이미 작성된 긴 답변입니다.\n줄바꿈도 포함됩니다.',
  },
}
