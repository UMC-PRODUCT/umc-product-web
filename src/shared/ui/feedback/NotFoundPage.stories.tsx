import type { ComponentProps } from 'react'
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
    a11y: {
      config: {
        rules: [{ id: 'scrollable-region-focusable', enabled: false }],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotFoundPage>

export default meta
type Story = StoryObj<typeof meta>

const buildStoryRouter = (props?: ComponentProps<typeof NotFoundPage>) => {
  const rootRoute = createRootRoute({ component: Outlet })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <NotFoundPage {...props} />,
  })

  const iframeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/iframe.html',
    component: () => <NotFoundPage {...props} />,
  })

  const routeTree = rootRoute.addChildren([indexRoute, iframeRoute])
  return createRouter({ routeTree })
}

export const Default: Story = {
  render: () => <RouterProvider router={buildStoryRouter({ showHomeLink: false })} />,
}

export const CustomMessage: Story = {
  render: () => (
    <RouterProvider
      router={buildStoryRouter({
        title: '접근 권한이 없습니다',
        message: '요청하신 페이지는 관리자 권한이 필요합니다.\n접근 권한을 확인해 주세요.',
        showHomeLink: false,
      })}
    />
  ),
}
