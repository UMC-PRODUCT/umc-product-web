import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios, { AxiosHeaders } from 'axios'

import { refresh } from '@/features/auth/domain/api'

interface IRefreshResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    accessToken?: string
  }
}

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
}

const getStoredToken = (key: string) => {
  const value = localStorage.getItem(key)
  if (!value) {
    return undefined
  }

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

const setToken = (key: string, value: string) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

const removeToken = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

const setAccessToken = (token: string) => setToken(STORAGE_KEYS.ACCESS_TOKEN, token)
const removeAccessToken = () => removeToken(STORAGE_KEYS.ACCESS_TOKEN)
const removeRefreshToken = () => removeToken(STORAGE_KEYS.REFRESH_TOKEN)

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
})

let isRedirecting = false

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getStoredToken(STORAGE_KEYS.ACCESS_TOKEN)
  if (accessToken) {
    const headers = new AxiosHeaders(config.headers)
    headers.set('Authorization', `Bearer ${accessToken}`)
    config.headers = headers
  }

  return config
})

const shouldSkipAuthRedirect = (config?: AxiosRequestConfig | undefined) => {
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (shouldSkipAuthRedirect(error.config)) {
      return Promise.reject(error)
    }

    const status = error.response?.status
    if (status === 401) {
      if (isRedirecting) {
        window.location.href = '/auth/login'
        return Promise.reject(error)
      }

      isRedirecting = true
      try {
        const currentUrl = window.location.pathname
        if (currentUrl === '/' || currentUrl === '/auth/signup') {
          return Promise.reject(error)
        }

        const refreshToken = getStoredToken(STORAGE_KEYS.REFRESH_TOKEN)
        if (!refreshToken) {
          throw new Error('refreshToken이 없습니다.')
        }

        const refreshResponse = await refresh({ refreshToken })
        console.log(refreshResponse)
        if (refreshResponse.code === '200') {
          const token = refreshResponse.result.accessToken
          if (token) {
            setAccessToken(token)
          }
          isRedirecting = false
          if (error.config) {
            return axiosInstance(error.config)
          }

          return Promise.reject(error)
        }

        throw new Error('토큰 재발급 실패')
      } catch (errors) {
        isRedirecting = false
        if (axios.isAxiosError(errors)) {
          const refreshError = errors as AxiosError<IRefreshResponse>
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

        removeAccessToken()
        removeRefreshToken()
        window.location.href = '/auth/login'
        return Promise.reject(errors)
      }
    }

    return Promise.reject(error)
  },
)
