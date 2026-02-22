import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import LabelLongTextField from './LabelLongTextField'

const meta = {
  title: 'Shared/Form/LabelLongTextField',
  component: LabelLongTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LabelLongTextField>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <div style={{ width: 580 }}>
        <LabelLongTextField
          label="지원 동기"
          placeholder="지원 동기를 입력해 주세요"
          value={value}
          onChange={setValue}
          necessary
        />
      </div>
    )
  },
}

export const Error: Story = {
  render: () => (
    <div style={{ width: 580 }}>
      <LabelLongTextField
        label="자기소개"
        placeholder="자기소개를 입력해 주세요"
        value=""
        onChange={() => {}}
        error={{ error: true, errorMessage: '필수 입력 항목입니다.' }}
      />
    </div>
  ),
}
