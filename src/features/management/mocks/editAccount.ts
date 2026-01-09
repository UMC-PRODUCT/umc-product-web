import type { TResponse } from '../components/account/EditModeView/EditModeView'

export const EDIT_ACCOUNT_MOCKS: TResponse = {
  school: {
    id: '1',
    label: '학교 A',
  },
  level: {
    id: 1,
    label: 'ADMIN',
  },
  name: '홍길동',
  nickname: '길동이',
  email: 'test@example.com',
  createAccountDate: '2024-01-01',
  lastModifiedDate: '2024-01-01',
  status: {
    id: 1,
    label: 'ACTIVE',
  },
}
