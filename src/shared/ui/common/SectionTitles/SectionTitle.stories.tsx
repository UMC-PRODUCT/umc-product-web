import type { Meta, StoryObj } from '@storybook/react-vite'

import SectionTitle from './SectionTitle'

const meta = {
  title: 'Common/SectionTitle',
  component: SectionTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
  args: {
    title: '지원자 정보',
  },
} satisfies Meta<typeof SectionTitle>

export default meta
type Story = StoryObj

export const Default: Story = {}
