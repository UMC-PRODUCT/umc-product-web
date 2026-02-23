import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { PartType } from '@/shared/types/part'

import PartChoice from './PartChoice'

const preferredPartOptions: Array<{ recruitmentPartId: string; label: string; value: PartType }> = [
  { recruitmentPartId: '1', label: '기획', value: 'PLAN' },
  { recruitmentPartId: '2', label: '디자인', value: 'DESIGN' },
  { recruitmentPartId: '3', label: '웹', value: 'WEB' },
  { recruitmentPartId: '4', label: 'Node', value: 'NODEJS' },
]

const meta = {
  title: 'Common/Question/PartChoice',
  component: PartChoice,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    mode: 'edit',
    maxSelectCount: '2',
    preferredPartOptions,
  },
} satisfies Meta<typeof PartChoice>

export default meta
type Story = StoryObj

export const Editable: Story = {
  render: () => {
    const [value, setValue] = useState<Array<{ id: number; answer: PartType }>>([
      { id: 1, answer: 'WEB' },
      { id: 2, answer: 'PLAN' },
    ])

    return (
      <PartChoice
        mode="edit"
        maxSelectCount="2"
        preferredPartOptions={preferredPartOptions}
        value={value}
        onChange={setValue}
      />
    )
  },
}
