import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import MailIcon from '@/shared/assets/icons/mail.svg?react'

import { LabelTextField } from './LabelTextField'

const meta = {
  title: 'Shared/Form/LabelTextField',
  component: LabelTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LabelTextField>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <div style={{ width: 520 }}>
        <LabelTextField
          label="이메일"
          type="email"
          autoComplete="email"
          placeholder="example@umc.com"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          Icon={MailIcon}
        />
      </div>
    )
  },
}

export const Error: Story = {
  render: () => (
    <div style={{ width: 520 }}>
      <LabelTextField
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        placeholder="비밀번호를 입력해 주세요"
        value="123"
        onChange={() => {}}
        error={{ error: true, errorMessage: '8자 이상 입력해 주세요.' }}
      />
    </div>
  ),
}
