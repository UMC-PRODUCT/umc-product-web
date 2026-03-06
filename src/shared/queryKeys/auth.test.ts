import { describe, expect, it } from 'vitest'

import { authKeys } from '@/shared/queryKeys'

const expectAuthPrefix = (queryKey: ReadonlyArray<unknown>) => {
  expect(Array.isArray(queryKey)).toBe(true)
  expect(queryKey[0]).toBe('auth')
}

describe('auth query key smoke tests', () => {
  it('builds terms key by type with auth prefix and type segment', () => {
    const key = authKeys.getTermsByType('SERVICE')
    expectAuthPrefix(key)
    expect(key).toContain('SERVICE')
  })

  it('builds member me key with auth prefix', () => {
    const key = authKeys.getMemberMe
    expectAuthPrefix(key)
    expect(key).toContain('member')
  })

  it('builds oauth me key with auth prefix', () => {
    const key = authKeys.getMemberOAuthMe
    expectAuthPrefix(key)
    expect(key).toContain('oauth')
  })
})
