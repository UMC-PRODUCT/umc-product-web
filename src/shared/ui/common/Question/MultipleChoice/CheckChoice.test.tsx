// @vitest-environment jsdom

import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CheckChoice } from './CheckChoice'

describe('CheckChoice', () => {
  it('does not render nested interactive buttons', () => {
    const { container } = render(
      <CheckChoice
        content="React"
        isChecked={true}
        onToggle={() => {}}
        mode="edit"
        isOtherOption={false}
      />,
    )

    expect(container.querySelectorAll('button button')).toHaveLength(0)
  })

  it('supports keyboard toggling in edit mode', () => {
    const onToggle = vi.fn()

    const { container } = render(
      <CheckChoice
        content="React"
        isChecked={false}
        onToggle={onToggle}
        mode="edit"
        isOtherOption={false}
      />,
    )

    const interactiveChoice = Array.from(container.querySelectorAll('[role="checkbox"]')).find(
      (element) => element.getAttribute('tabindex') === '0',
    )

    expect(interactiveChoice).not.toBeNull()
    fireEvent.keyDown(interactiveChoice!, { key: ' ' })

    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('updates other input text and auto-selects when typing', () => {
    const onToggle = vi.fn()
    const onOtherInputChange = vi.fn()

    const { getByLabelText } = render(
      <CheckChoice
        content="기타"
        isChecked={false}
        onToggle={onToggle}
        mode="edit"
        isOtherOption={true}
        otherInputValue=""
        onOtherInputChange={onOtherInputChange}
      />,
    )

    fireEvent.change(getByLabelText('기타 답변 입력'), { target: { value: '직접 입력' } })

    expect(onOtherInputChange).toHaveBeenCalledWith('직접 입력')
    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})
