import { createFileRoute } from '@tanstack/react-router'

import { RegisterPage } from '@features/auth/pages/RegisterPage'

export const Route = createFileRoute('/(auth)/auth/register/')({
  component: RegisterPage,
})
