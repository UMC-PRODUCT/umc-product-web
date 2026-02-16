/**
 * 응답 인터셉터
 * 401 에러 시 토큰 갱신 및 재시도를 처리합니다.
 */

import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import { postRefreshToken } from '@/features/auth/domain/api'
import type { PostRefreshTokenResponseDTO } from '@/features/auth/domain/types'

import { clearTokens, getRefreshToken, setAccessToken, setRefreshToken } from '../tokenManager'

let refreshPromise: Promise<void> | null = null

function shouldSkipAuthRedirect(config?: AxiosRequestConfig): boolean {
  if (!config) {
    return false
  }

  const headers = config.headers
  const headerValue =
    typeof headers?.get === 'function'
      ? headers.get('x-skip-auth-redirect')
      : headers?.['x-skip-auth-redirect']

  return headerValue === 'true'
}

async function refreshTokens(): Promise<void> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('refreshToken이 없습니다.')
  }

  const refreshResponse = await postRefreshToken({ refreshToken })
  if (!refreshResponse.success) {
    throw new Error('토큰 재발급 실패')
  }

  const newAccessToken = refreshResponse.result.accessToken
  const newRefreshToken = refreshResponse.result.refreshToken
  if (!newAccessToken || !newRefreshToken) {
    throw new Error('accessToken이 없습니다. 로그인 페이지로 이동합니다.')
  }

  setAccessToken(newAccessToken)
  setRefreshToken(newRefreshToken)
}

function handleRefreshError(errors: unknown): void {
  if (axios.isAxiosError(errors)) {
    const refreshError = errors as AxiosError<PostRefreshTokenResponseDTO>
    const refreshStatus = refreshError.response?.status
    if (refreshStatus === 401) {
      console.error('refreshToken이 없습니다. 로그인 페이지로 이동합니다.')
    } else if (refreshStatus === 404) {
      console.error('사용자 정보를 찾지 못했습니다. 로그인 페이지로 이동합니다.')
    } else {
      console.error('알 수 없는 오류가 발생했습니다', errors)
    }
  } else {
    console.error('알 수 없는 오류가 발생했습니다', errors)
  }
}

export function setupResponseInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (shouldSkipAuthRedirect(error.config)) {
        return Promise.reject(error)
      }

      const status = error.response?.status
      if (status === 401) {
        const currentUrl = window.location.pathname
        if (currentUrl === '/' || currentUrl === '/auth/signup') {
          return Promise.reject(error)
        }

        let runningRefreshPromise: Promise<void> | null = null
        try {
          runningRefreshPromise = refreshPromise ?? (refreshPromise = refreshTokens())
          await runningRefreshPromise

          if (error.config) {
            return instance(error.config)
          }

          return Promise.reject(error)
        } catch (errors) {
          handleRefreshError(errors)
          clearTokens()
          window.location.href = '/auth/login'
          return Promise.reject(errors)
        } finally {
          if (runningRefreshPromise && refreshPromise === runningRefreshPromise) {
            refreshPromise = null
          }
        }
      }

      return Promise.reject(error)
    },
  )
}
