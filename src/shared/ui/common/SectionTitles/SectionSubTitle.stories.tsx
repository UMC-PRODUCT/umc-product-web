import type { Meta, StoryObj } from '@storybook/react-vite'

import SectionSubTitle from './SectionSubTitle'

const meta = {
  title: 'Common/SectionSubTitle',
  component: SectionSubTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    subtitle: { control: 'text' },
  },
  args: {
    subtitle: '필수 입력 항목을 확인해 주세요',
  },
} satisfies Meta<typeof SectionSubTitle>

export default meta
type Story = StoryObj

export const Default: Story = {}
