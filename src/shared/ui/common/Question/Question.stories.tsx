import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { QuestionAnswerValue } from '@/shared/types/apply'

import { Question } from './Question'

const baseOptions = [
  { optionId: 'plan', content: '기획' },
  { optionId: 'design', content: '디자인' },
  { optionId: 'web', content: '웹' },
  { optionId: 'other', content: '기타', isOther: true },
]

const meta = {
  title: 'Common/Question/Question',
  component: Question,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Question>

export default meta
type Story = StoryObj

export const RadioType: Story = {
  render: () => {
    const [value, setValue] = useState<QuestionAnswerValue>({ selectedOptionIds: ['plan'] })

    return (
      <Question
        questionId={101}
        type="RADIO"
        question="지원 파트를 선택해 주세요"
        questionNumber={1}
        required
        options={baseOptions}
        value={value}
        onChange={(_, next) => setValue(next)}
        mode="edit"
        maxSelectCount={null}
        preferredPartOptions={null}
      />
    )
  },
}

export const ShortTextType: Story = {
  render: () => {
    const [value, setValue] = useState<QuestionAnswerValue>('')

    return (
      <Question
        questionId={102}
        type="SHORT_TEXT"
        question="한 줄 소개를 작성해 주세요"
        questionNumber={2}
        required
        options={[]}
        value={value}
        onChange={(_, next) => setValue(next)}
        mode="edit"
        maxSelectCount={null}
        preferredPartOptions={null}
      />
    )
  },
}
