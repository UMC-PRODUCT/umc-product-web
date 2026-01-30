import type { ReactNode } from 'react'
import { Component, Suspense } from 'react'

import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'

type AsyncBoundaryProps = {
  children: ReactNode
  fallback: ReactNode
  errorFallback?: (error: Error, reset: () => void) => ReactNode
}

type AsyncBoundaryState = {
  error?: Error
}

class ErrorBoundary extends Component<
  {
    children: ReactNode
    fallback?: (error: Error, reset: () => void) => ReactNode
  },
  AsyncBoundaryState
> {
  state: AsyncBoundaryState = {}

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error) {
    console.error(error)
  }

  resetErrorBoundary = () => {
    this.setState({ error: undefined })
  }

  render() {
    const { error } = this.state
    if (error) {
      const { fallback } = this.props
      if (fallback) {
        return fallback(error, this.resetErrorBoundary)
      }
      return (
        <ErrorPage
          title="데이터를 불러오는 중 오류가 발생했습니다."
          description={error.message}
          hint="필요하다면 로그를 확인하거나 고객센터에 문의해 주세요."
          onRetry={this.resetErrorBoundary}
        />
      )
    }
    return this.props.children
  }
}

const AsyncBoundary = ({ children, fallback, errorFallback }: AsyncBoundaryProps) => (
  <ErrorBoundary fallback={errorFallback}>
    <Suspense fallback={fallback}>{children}</Suspense>
  </ErrorBoundary>
)

export default AsyncBoundary
