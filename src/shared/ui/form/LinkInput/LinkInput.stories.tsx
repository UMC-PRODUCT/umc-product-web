import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import LinkInput from './LinkInput'

const meta = {
  title: 'Shared/Form/LinkInput',
  component: LinkInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <div style={{ width: 520 }}>
        <LinkInput
          label="URL"
          name="url"
          placeholder="https://example.com"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    )
  },
}
