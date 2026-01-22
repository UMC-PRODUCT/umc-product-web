import { z } from 'zod/v3'

import { nameSchema, nicknameSchema, schoolNameSchema } from '@/shared/schemas/common'

const email = z.string().email('유효한 이메일 주소를 입력해 주세요.')

export const registerSchema = z.object({
  school: schoolNameSchema,
  name: nameSchema,
  nickname: nicknameSchema,
  email: email,
  serviceTerm: z.boolean().refine((val) => val === true, {
    message: '모든 필수 항목에 동의하지 않을 경우 회원가입이 불가능합니다.',
  }),
  privacyTerm: z.boolean().refine((val) => val === true, {
    message: '모든 필수 항목에 동의하지 않을 경우 회원가입이 불가능합니다.',
  }),
  marketingTerm: z.boolean(),
  emailVerificationToken: z.string().optional(),
  oAuthVerificationToken: z.string(),
  emailVerificationCode: z.string().length(6, '인증번호는 6자리여야 합니다.'),
})

export type RegisterForm = z.infer<typeof registerSchema>
