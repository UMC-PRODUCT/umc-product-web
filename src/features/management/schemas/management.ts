import { z } from 'zod/v3'

import {
  emailSchema,
  levelSchema,
  nameSchema,
  nicknameSchema,
  schoolNameSchema,
} from '@/shared/schemas/common'

export const schoolRegisterSchema = z.object({
  schoolName: schoolNameSchema,
  schoolProfile: z.string().url().optional(),
  remark: z.string().optional(),
})

export type SchoolRegisterForm = z.infer<typeof schoolRegisterSchema>

export const addSchoolSchema = schoolRegisterSchema.extend({
  linkTitle: z.string(),
  linkUrl: z.string(),
  linkType: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .nullable(),
})

export type AddSchoolForm = z.output<typeof addSchoolSchema>

export const accountRegisterSchema = z.object({
  schoolName: schoolNameSchema,
  name: nameSchema,
  nickname: nicknameSchema,
  email: emailSchema,
  level: levelSchema,
})

export const accountEditSchema = z.object({
  schoolName: schoolNameSchema,
  name: nameSchema,
  nickname: nicknameSchema,
  email: emailSchema,
  level: levelSchema,
})

export type AccountRegisterForm = z.infer<typeof accountRegisterSchema>

export type AccountEditForm = z.infer<typeof accountEditSchema>
