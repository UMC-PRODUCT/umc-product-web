import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import LabelCalendar from './LabelCalendar'

const meta = {
  title: 'Shared/Form/LabelCalendar',
  component: LabelCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LabelCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null)

    return (
      <div style={{ width: 500 }}>
        <LabelCalendar
          label="인터뷰 일자"
          placeholder="날짜를 선택해주세요"
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}
