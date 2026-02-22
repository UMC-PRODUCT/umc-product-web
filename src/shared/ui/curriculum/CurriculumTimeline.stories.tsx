import type { Meta, StoryObj } from '@storybook/react-vite'

import { CurriculumTimeline } from './CurriculumTimeline'

const workbooks = [
  { id: '1', weekNo: '1', title: 'OT 및 팀빌딩' },
  { id: '2', weekNo: '2', title: '문제 정의' },
  { id: '3', weekNo: '3', title: '가설 수립' },
  { id: '4', weekNo: '4', title: '프로토타이핑' },
  { id: '5', weekNo: '5', title: '유저 테스트' },
  { id: '6', weekNo: '6', title: '중간 발표' },
  { id: '7', weekNo: '7', title: '개선 작업' },
  { id: '8', weekNo: '8', title: '최종 발표 준비' },
]

const meta = {
  title: 'Shared/CurriculumTimeline',
  component: CurriculumTimeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    workbooks,
  },
} satisfies Meta<typeof CurriculumTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 900, maxWidth: '100%' }}>
      <CurriculumTimeline {...args} />
    </div>
  ),
}
