import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import MailIcon from '@/shared/assets/icons/mail.svg?react'

import { TextField } from './TextField'

const meta = {
  title: 'Shared/Form/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <div style={{ width: 420 }}>
        <TextField
          type="email"
          autoComplete="email"
          placeholder="이메일을 입력해 주세요"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          Icon={MailIcon}
        />
      </div>
    )
  },
}

export const WithButton: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <div style={{ width: 520 }}>
        <TextField
          type="email"
          autoComplete="email"
          placeholder="이메일을 입력해 주세요"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          button={{
            buttonMessage: '인증 요청',
            buttonClick: () => {},
            validation: false,
          }}
        />
      </div>
    )
  },
}
