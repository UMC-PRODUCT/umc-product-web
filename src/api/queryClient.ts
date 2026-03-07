import { QueryClient } from '@tanstack/react-query'

export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
    },
  })

export const queryClient = createQueryClient()
