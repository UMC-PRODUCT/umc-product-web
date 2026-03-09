import { renderToString } from 'react-dom/server'

import { App } from './App'
import { createAppRouter } from './router'

export const renderRootPage = async () => {
  const { router, queryClient } = createAppRouter({ path: '/' })

  await router.load()

  return renderToString(<App router={router} queryClient={queryClient} strict={false} />)
}
