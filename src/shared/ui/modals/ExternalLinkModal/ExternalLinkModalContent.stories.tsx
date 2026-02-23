import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import ExternalLinkModalContent from './ExternalLinkModalContent'

const meta = {
  title: 'Modal/ExternalLinkModalContent',
  component: ExternalLinkModalContent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof ExternalLinkModalContent>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: 820, maxWidth: '100%' }}>
      <ExternalLinkModalContent onClose={fn()} />
    </div>
  ),
}
