import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './Text/Text'
import QuestionLayout from './QuestionLayout'

const meta = {
  title: 'Common/Question/QuestionLayout',
  component: QuestionLayout,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionLayout>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <QuestionLayout questionText="자기소개를 입력해 주세요" questionNumber={1} isRequired>
      <Text mode="edit" value="" onChange={() => {}} />
    </QuestionLayout>
  ),
}

export const WithError: Story = {
  render: () => (
    <QuestionLayout
      questionText="지원 동기를 입력해 주세요"
      questionNumber={2}
      isRequired
      errorMessage="필수 입력 항목입니다"
    >
      <Text mode="edit" value="" onChange={() => {}} />
    </QuestionLayout>
  ),
}
