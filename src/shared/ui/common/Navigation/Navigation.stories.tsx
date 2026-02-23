import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import Navigation from './Navigation'

const meta = {
  title: 'Common/Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(4)
    return <Navigation currentPage={page} totalPages={17} onChangePage={setPage} />
  },
}
