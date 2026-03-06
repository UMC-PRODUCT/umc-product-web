import { describe, expect, it } from 'vitest'

import { authKeys } from '@/shared/queryKeys'

const expectAuthPrefix = (queryKey: ReadonlyArray<unknown>) => {
  expect(Array.isArray(queryKey)).toBe(true)
  expect(queryKey[0]).toBe('auth')
}

describe('auth 쿼리 키 스모크 테스트', () => {
  it('약관 타입별 키를 auth prefix와 함께 생성한다', () => {
    const key = authKeys.getTermsByType('SERVICE')
    expectAuthPrefix(key)
    expect(key).toContain('SERVICE')
  })

  it('member me 키를 auth prefix와 함께 생성한다', () => {
    const key = authKeys.getMemberMe
    expectAuthPrefix(key)
    expect(key).toContain('member')
  })

  it('oauth me 키를 auth prefix와 함께 생성한다', () => {
    const key = authKeys.getMemberOAuthMe
    expectAuthPrefix(key)
    expect(key).toContain('oauth')
  })
})
