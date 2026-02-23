import type { Meta, StoryObj } from '@storybook/react-vite'

import GrabButton from './GrabButton'

const meta = {
  title: 'Common/GrabButton',
  component: GrabButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    index: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    typo: {
      control: 'select',
      options: ['B5.Md', 'B4.Md', 'B3.Md'],
    },
  },
  args: {
    index: 0,
    typo: 'B5.Md',
  },
} satisfies Meta<typeof GrabButton>

export default meta
type Story = StoryObj

export const Default: Story = {}
