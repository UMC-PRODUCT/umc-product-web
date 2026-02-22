import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'

import NotFoundPage from './NotFoundPage'

const meta = {
  title: 'Shared/Feedback/NotFoundPage',
  component: NotFoundPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotFoundPage>

export default meta
type Story = StoryObj<typeof meta>

const buildStoryRouter = (props?: React.ComponentProps<typeof NotFoundPage>) => {
  const rootRoute = createRootRoute({ component: Outlet })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <NotFoundPage {...props} />,
  })

  const routeTree = rootRoute.addChildren([indexRoute])
  return createRouter({ routeTree })
}

export const Default: Story = {
  render: () => <RouterProvider router={buildStoryRouter()} />,
}

export const CustomMessage: Story = {
  render: () => (
    <RouterProvider
      router={buildStoryRouter({
        title: '접근 권한이 없습니다',
        message: '요청하신 페이지는 관리자 권한이 필요합니다.\n접근 권한을 확인해 주세요.',
      })}
    />
  ),
}
