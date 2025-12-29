import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: Register,
})

function Register() {
  return <div>Hello "/auth/register"!</div>
}
