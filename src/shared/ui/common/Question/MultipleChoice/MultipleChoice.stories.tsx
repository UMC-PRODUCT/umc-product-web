import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { OptionAnswerValue } from '@/shared/types/form'

import { MultipleChoice } from './MultipleChoice'

const options = [
  { optionId: 'react', content: 'React' },
  { optionId: 'ts', content: 'TypeScript' },
  { optionId: 'other', content: '기타', isOther: true },
]

const meta = {
  title: 'Common/Question/MultipleChoice',
  component: MultipleChoice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    options,
    mode: 'edit',
  },
} satisfies Meta<typeof MultipleChoice>

export default meta
type Story = StoryObj

export const Editable: Story = {
  render: () => {
    const [value, setValue] = useState<OptionAnswerValue>({ selectedOptionIds: ['react'] })

    return (
      <div style={{ width: 420 }}>
        <MultipleChoice options={options} mode="edit" value={value} onChange={setValue} />
      </div>
    )
  },
}

export const ViewMode: Story = {
  args: {
    mode: 'view',
    value: { selectedOptionIds: ['ts'] },
  },
}
