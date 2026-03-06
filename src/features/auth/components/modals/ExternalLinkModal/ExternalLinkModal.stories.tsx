import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Button } from '@/shared/ui/common/Button'

import ExternalLinkModal from './ExternalLinkModal'

const meta = {
  title: 'Modal/ExternalLinkModal',
  component: ExternalLinkModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof ExternalLinkModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)

    return !isOpen ? (
      <Button
        label="외부 링크 모달 다시 열기"
        tone="lime"
        css={{ width: 220, padding: 10 }}
        onClick={() => setIsOpen(true)}
      />
    ) : (
      <ExternalLinkModal
        {...args}
        onClose={() => {
          args.onClose()
          setIsOpen(false)
        }}
      />
    )
  },
}
