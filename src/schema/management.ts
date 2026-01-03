import { z } from 'zod/v3'

export const schoolRegisterSchema = z.object({
  schoolName: z.string().min(1, '학교명을 입력하지 않았습니다.'),
  affiliated: z.string().optional(),
  note: z.string().optional(),
})

export type SchoolRegisterForm = z.infer<typeof schoolRegisterSchema>
