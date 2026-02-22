import type { Meta, StoryObj } from '@storybook/react-vite'

import Flex from './Flex'

const meta = {
  title: 'Common/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj

export const Row: Story = {
  render: () => (
    <Flex gap={12} width="fit-content">
      <div style={{ width: 60, height: 60, background: '#95EF4B' }} />
      <div style={{ width: 60, height: 60, background: '#737373' }} />
      <div style={{ width: 60, height: 60, background: '#D2D2D2' }} />
    </Flex>
  ),
}

export const Column: Story = {
  render: () => (
    <Flex flexDirection="column" gap={8} width={220}>
      <div style={{ width: '100%', height: 40, background: '#3E3E3E' }} />
      <div style={{ width: '100%', height: 40, background: '#272727' }} />
      <div style={{ width: '100%', height: 40, background: '#202020' }} />
    </Flex>
  ),
}
