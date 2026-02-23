import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import RecruitingFormCalendar from './RecruitingFormCalendar'

const meta = {
  title: 'Shared/Form/RecruitingFormCalendar',
  component: RecruitingFormCalendar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecruitingFormCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date())

    return (
      <div style={{ width: 420 }}>
        <RecruitingFormCalendar value={value} onChange={setValue} />
      </div>
    )
  },
}
