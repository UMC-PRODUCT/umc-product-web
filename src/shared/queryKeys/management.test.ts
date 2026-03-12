import { describe, expect, it } from 'vitest'

import { managementKeys } from '@/shared/queryKeys'

describe('management 쿼리 키 스모크 테스트', () => {
  it('광역 무효화용 management 베이스 키를 생성한다', () => {
    expect(managementKeys.base[0]).toBe('management')
    expect(managementKeys.getAuditLogsBase).toEqual(['management', 'auditLogs'])
    expect(managementKeys.getGisuListBase).toEqual(['management', 'gisuList'])
    expect(managementKeys.getSchoolsPagingBase).toEqual(['management', 'schoolsPaging'])
    expect(managementKeys.getChallengerBase).toEqual(['management', 'challenger'])
  })
})
