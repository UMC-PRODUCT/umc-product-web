import * as yup from 'yup'

const email = yup
  .string()
  .email('유효한 이메일 주소를 입력해주세요.')
  .required('이메일은 필수 입력 사항입니다.')

export const registerSchema = yup.object().shape({
  school: yup.string().required('학교를 선택해주세요.'),
  name: yup.string().required('이름은 필수 입력 사항입니다.'),
  nickname: yup
    .string()
    .matches(/^[가-힣]{2,5}$/, '닉네임은 2~5글자의 한글이어야 합니다.')
    .required('닉네임은 필수 입력 사항입니다.'),
  email,
})

export type RegisterForm = yup.InferType<typeof registerSchema>
