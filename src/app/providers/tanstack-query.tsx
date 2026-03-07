import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

import { createQueryClient } from '@/api/queryClient'

export function getContext() {
  const queryClient = createQueryClient()
  return {
    queryClient,
  }
}

export const Provider = ({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
