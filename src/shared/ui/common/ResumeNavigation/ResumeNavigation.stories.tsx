import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import ResumeNavigation from './ResumeNavigation'

const meta = {
  title: 'Common/ResumeNavigation',
  component: ResumeNavigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResumeNavigation>

export default meta
type Story = StoryObj

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(2)
    return (
      <div style={{ width: 520 }}>
        <ResumeNavigation currentPage={page} totalPages={5} onPageChange={setPage} />
      </div>
    )
  },
}
