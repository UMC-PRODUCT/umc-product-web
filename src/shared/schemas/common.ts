import { z } from 'zod/v3'

export const schoolNameSchema = z.string().min(1, '학교명을 입력하지 않았습니다.')
export const nameSchema = z
  .string()
  .min(1, '이름을 입력해주세요.')
  .regex(/^[가-힣]{2,5}$/, '이름은 한글로만 입력해 주세요.')

export const nicknameSchema = z
  .string()
  .min(1, '닉네임을 입력해주세요.')
  .regex(/^[가-힣]{1,5}$/, '닉네임은 한글로만 입력해 주세요.')

export const emailSchema = z.string().email('유효한 이메일 주소를 입력하세요.')

export const affiliatedSchema = z.string().optional()

export const levelSchema = z.enum(['ADMIN', 'MANAGER', 'USER', 'CHALLENGER'], {
  errorMap: () => ({ message: '역할을 선택하지 않았습니다.' }),
})
