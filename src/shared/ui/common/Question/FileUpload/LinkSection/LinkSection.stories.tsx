import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import LinkSection from './LinkSection'

const meta = {
  title: 'Common/Question/LinkSection',
  component: LinkSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkSection>

export default meta
type Story = StoryObj

export const Editable: Story = {
  render: () => {
    const [links, setLinks] = useState<Array<string>>([
      'https://github.com/umc',
      'https://umc.makeus.in',
    ])

    return (
      <div style={{ width: 760, maxWidth: '100%' }}>
        <LinkSection links={links} onLinksChange={setLinks} mode="edit" />
      </div>
    )
  },
}
