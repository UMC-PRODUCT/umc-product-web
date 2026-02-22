import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { TimeTableSlots } from '@/shared/types/apply'

import { MiniTimeTable } from './MiniTimeTable'

const meta = {
  title: 'Common/Question/MiniTimeTable',
  component: MiniTimeTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MiniTimeTable>

export default meta
type Story = StoryObj

export const Editable: Story = {
  render: () => {
    const [value, setValue] = useState<TimeTableSlots>({
      '2026-02-25': ['10:00', '10:30'],
    })

    return (
      <div style={{ width: '100%', maxWidth: 920 }}>
        <MiniTimeTable
          dateRange={{ start: '2026-02-25', end: '2026-02-27' }}
          timeRange={{ start: '10:00', end: '15:00' }}
          disabledSlots={[{ date: '2026-02-26', times: ['11:00', '11:30'] }]}
          value={value}
          onChange={setValue}
          mode="edit"
        />
      </div>
    )
  },
}
