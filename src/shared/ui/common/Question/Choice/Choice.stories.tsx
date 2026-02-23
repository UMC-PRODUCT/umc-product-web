import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { OptionAnswerValue } from '@/shared/types/form'

import { Choice } from './Choice'

const options = [
  { optionId: 'plan', content: '기획' },
  { optionId: 'design', content: '디자인' },
  { optionId: 'other', content: '기타', isOther: true },
]

const meta = {
  title: 'Common/Question/Choice',
  component: Choice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    options,
    mode: 'edit',
  },
} satisfies Meta<typeof Choice>

export default meta
type Story = StoryObj

export const Editable: Story = {
  render: () => {
    const [value, setValue] = useState<OptionAnswerValue>({ selectedOptionIds: ['plan'] })

    return (
      <div style={{ width: 420 }}>
        <Choice options={options} mode="edit" value={value} onChange={setValue} />
      </div>
    )
  },
}

export const ViewMode: Story = {
  args: {
    mode: 'view',
    value: { selectedOptionIds: ['design'] },
  },
}
