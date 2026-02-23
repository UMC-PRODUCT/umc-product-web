import type { Meta, StoryObj } from '@storybook/react-vite'

import SuspenseFallback from './SuspenseFallback'

const meta = {
  title: 'Common/SuspenseFallback',
  component: SuspenseFallback,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: '데이터를 불러오는 중입니다',
  },
} satisfies Meta<typeof SuspenseFallback>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320, height: 260 }}>
      <SuspenseFallback {...args} />
    </div>
  ),
}
