import { z } from 'zod/v3'

const email = z.string().email('유효하지 않은 이메일 주소입니다.')

export const registerSchema = z.object({
  school: z.string().min(1, '학교를 선택하지 않았습니다.'),
  name: z.string().min(1, '양식이 올바르지 않습니다.'),
  nickname: z
    .string()
    .min(1, '양식이 올바르지 않습니다.')
    .regex(/^[가-힣]{1,5}$/, '닉네임은 1~5글자의 한글이어야 합니다.'),
  email,
  serviceTerm: z.boolean().refine((val) => val === true, {
    message: '서비스 이용 약관에 동의해 주세요.',
  }),
  privacyTerm: z.boolean().refine((val) => val === true, {
    message: '개인정보 처리 방침에 동의해 주세요.',
  }),
  marketingTerm: z.boolean(),
})

export type RegisterForm = z.infer<typeof registerSchema>
