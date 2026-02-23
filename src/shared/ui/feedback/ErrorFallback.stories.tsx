import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import ErrorFallback from './ErrorFallback'

const meta = {
  title: 'Shared/Feedback/ErrorFallback',
  component: ErrorFallback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    error: new Error('네트워크 연결 상태를 확인해 주세요.'),
    resetErrorBoundary: fn(),
  },
} satisfies Meta<typeof ErrorFallback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 720 }}>
      <ErrorFallback {...args} />
    </div>
  ),
}
