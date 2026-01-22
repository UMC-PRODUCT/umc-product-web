import { useMemo } from 'react'

import { useRegisterFormSetup } from './register'

export interface RegistrationFieldValues {
  name: string
  nickname: string
  email: string
  emailVerificationCode: string
}

function useRegisterFieldValues(watch: ReturnType<typeof useRegisterFormSetup>['watch']) {
  const [name = '', nickname = '', email = '', emailVerificationCode = ''] = watch([
    'name',
    'nickname',
    'email',
    'emailVerificationCode',
  ])

  const formFieldValues = useMemo(
    () => ({
      name,
      nickname,
      email,
      emailVerificationCode,
    }),
    [name, nickname, email, emailVerificationCode],
  )

  return {
    formFieldValues,
    watchedEmail: email,
  }
}

export function useRegisterForm() {
  const form = useRegisterFormSetup()
  const { formFieldValues, watchedEmail } = useRegisterFieldValues(form.watch)

  return {
    ...form,
    formFieldValues,
    watchedEmail,
  }
}

export type UseRegisterFormReturn = ReturnType<typeof useRegisterForm>
