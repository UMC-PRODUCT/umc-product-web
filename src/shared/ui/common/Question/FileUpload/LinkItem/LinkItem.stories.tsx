import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import LinkItem from './LinkItem'

const meta = {
  title: 'Common/Question/LinkItem',
  component: LinkItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: 'https://github.com/umc/example',
    mode: 'edit',
    onRemove: fn(),
  },
} satisfies Meta<typeof LinkItem>

export default meta
type Story = StoryObj

export const Default: Story = {}

export const ViewMode: Story = {
  args: {
    mode: 'view',
  },
}
