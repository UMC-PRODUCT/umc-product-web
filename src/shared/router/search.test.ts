import { describe, expect, it } from 'vitest'

import {
  parseOptionalStringSearch,
  parsePositiveNumberSearch,
  parseTabSearch,
} from '@/shared/router/search'

describe('search parser smoke tests', () => {
  it('parses positive number from string/number and falls back on invalid values', () => {
    expect(parsePositiveNumberSearch({ page: '3' }, 'page', 1)).toBe(3)
    expect(parsePositiveNumberSearch({ page: 2 }, 'page', 1)).toBe(2)
    expect(parsePositiveNumberSearch({ page: '0' }, 'page', 1)).toBe(1)
    expect(parsePositiveNumberSearch({ page: '-1' }, 'page', 1)).toBe(1)
    expect(parsePositiveNumberSearch({ page: 'abc' }, 'page', 1)).toBe(1)
  })

  it('returns optional string only when value is string', () => {
    expect(parseOptionalStringSearch({ q: 'keyword' }, 'q')).toBe('keyword')
    expect(parseOptionalStringSearch({ q: 123 }, 'q')).toBeUndefined()
    expect(parseOptionalStringSearch({}, 'q')).toBeUndefined()
  })

  it('parses valid tab and drops invalid tab', () => {
    const validTabs = ['all', 'active', 'archived'] as const
    expect(parseTabSearch({ tab: 'active' }, validTabs)).toEqual({ tab: 'active' })
    expect(parseTabSearch({ tab: 'invalid' }, validTabs)).toEqual({ tab: undefined })
  })
})
