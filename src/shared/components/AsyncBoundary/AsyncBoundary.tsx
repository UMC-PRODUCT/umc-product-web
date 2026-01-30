import type { ReactNode } from 'react'
import { Component, Suspense } from 'react'

import { Button } from '@/shared/ui/common/Button'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

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
        <SuspenseFallback label="데이터를 불러오는 중 오류가 발생했습니다." gap={12}>
          <span>{error.message}</span>
          <Button label="다시 시도" tone="lime" onClick={this.resetErrorBoundary} />
        </SuspenseFallback>
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
