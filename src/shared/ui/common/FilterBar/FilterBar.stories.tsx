import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Label } from '../Label'
import FilterBar from './FilterBar'

const meta = {
  title: 'Common/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: 900, maxWidth: '100%' }}>
      <FilterBar
        leftChild={
          <>
            <Label label="모집 기수" />
            <Button label="9기" tone="gray" variant="outline" css={{ width: 90, padding: 10 }} />
            <Button label="10기" tone="lime" css={{ width: 90, padding: 10 }} />
          </>
        }
        rightChild={
          <Button label="초기화" tone="gray" variant="outline" css={{ width: 110, padding: 10 }} />
        }
      />
    </div>
  ),
}
