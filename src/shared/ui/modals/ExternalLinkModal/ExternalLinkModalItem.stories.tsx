import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import InstagramIcon from '@/shared/assets/social/instagram_color.svg?react'

import ExternalLinkModalItem from './ExternalLinkModalItem'

const initialLink = {
  id: 'insta-1',
  type: 'INSTAGRAM' as const,
  title: 'UMC 인스타그램',
  url: 'https://www.instagram.com/uni_makeus_challenge/',
}

const meta = {
  title: 'Modal/ExternalLinkModalItem',
  component: ExternalLinkModalItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExternalLinkModalItem>

export default meta
type Story = StoryObj

export const Editable: Story = {
  render: () => {
    const [link, setLink] = useState(initialLink)
    const [isEditing, setIsEditing] = useState(false)

    return (
      <div style={{ width: 760, maxWidth: '100%' }}>
        <ExternalLinkModalItem
          link={link}
          isEditing={isEditing}
          icon={<InstagramIcon width={48} height={48} />}
          onToggleEdit={() => setIsEditing((prev) => !prev)}
          onDelete={() => setLink((prev) => ({ ...prev, title: '[삭제됨] ' + prev.title }))}
          onChange={(id, key, value) => {
            setLink((prev) => (prev.id === id ? { ...prev, [key]: value } : prev))
          }}
        />
      </div>
    )
  },
}
