import type { Meta, StoryObj } from '@storybook/react-vite'

import ProgressCircle from './ProgressCircle'

const meta = {
  title: 'Common/ProgressCircle',
  component: ProgressCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: {
    progress: 65,
  },
} satisfies Meta<typeof ProgressCircle>

export default meta
type Story = StoryObj

export const Default: Story = {}

export const Complete: Story = {
  args: {
    progress: 100,
  },
}
