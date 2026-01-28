import type { DashboardProgress, DashboardUser } from '@features/dashboard/domain'

export const DASHBOARD_USER_MOCK: DashboardUser = {
  nickname: '코튼',
  fullName: '김연진',
}

export const DASHBOARD_PROGRESS_MOCK: DashboardProgress = {
  parts: ['SPRINGBOOT', 'WEB'],
  document: '미정',
  final: '미정',
}
