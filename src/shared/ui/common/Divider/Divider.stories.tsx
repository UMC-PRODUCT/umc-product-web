import type { Meta, StoryObj } from '@storybook/react-vite'

import Divider from './Divider'

const meta = {
  title: 'Common/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: '또는',
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj

export const Default: Story = {}

export const SocialLogin: Story = {
  args: {
    label: '소셜 로그인',
  },
}
