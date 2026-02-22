import type { Meta, StoryObj } from '@storybook/react-vite'

import Section from './Section'

const meta = {
  title: 'Common/Section',
  component: Section,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outline', 'none', 'both', 'dashed'],
    },
  },
  args: {
    variant: 'solid',
    children: '섹션 내용',
  },
  render: (args) => (
    <div style={{ width: 520 }}>
      <Section {...args} />
    </div>
  ),
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj

export const Solid: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Dashed: Story = {
  args: {
    variant: 'dashed',
  },
}
