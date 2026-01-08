import { z } from 'zod/v3'

const email = z.string().email('유효한 이메일 주소를 입력해 주세요.')

export const registerSchema = z.object({
  school: z.string().min(1, '학교를 선택해 주세요.'),
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .regex(/^[가-힣]{2,5}$/, '이름은 한글로만 입력해 주세요.'),
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요.')
    .regex(/^[가-힣]{1,5}$/, '닉네임은 한글로만 입력해 주세요.'),

  email,
  serviceTerm: z.boolean().refine((val) => val === true, {
    message: '모든 필수 항목에 동의하지 않을 경우 회원가입이 불가능합니다.',
  }),
  privacyTerm: z.boolean().refine((val) => val === true, {
    message: '모든 필수 항목에 동의하지 않을 경우 회원가입이 불가능합니다.',
  }),
  marketingTerm: z.boolean(),
})

export type RegisterForm = z.infer<typeof registerSchema>
