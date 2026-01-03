import * as yup from 'yup'

const schoolName = yup.string().required('학교명을 입력하지 않았습니다.')
const affiliated = yup.string().optional()
const note = yup.string().optional()

export type SchoolRegisterForm = {
  schoolName: string
  affiliated?: string
  note?: string
}

export const schoolRegisterSchema: yup.ObjectSchema<SchoolRegisterForm> = yup.object({
  schoolName,
  affiliated,
  note,
})
