import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import { refresh } from '@/features/auth/domain/api'

interface IRefreshResponse {
  isSuccess: boolean
  code: string
  message: string
}
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
})

let isRedirecting = false

const readLocalStorage = <T>(key: string): T | null => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error('localStorage read failed', error)
    return null
  }
}

const writeLocalStorage = <T>(key: string, value: T) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('localStorage write failed', error)
  }
}

const removeLocalStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error('localStorage remove failed', error)
  }
}

const getRefreshToken = () => readLocalStorage<string>('refreshToken') ?? undefined
const removeRefreshToken = () => removeLocalStorage('refreshToken')
const getAccessToken = () => readLocalStorage<string>('accessToken')
const removeAccessToken = () => removeLocalStorage('accessToken')
const setAccessToken = (token: string) => writeLocalStorage('accessToken', token)

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    const headers = config.headers
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
  async (error) => {
    if (shouldSkipAuthRedirect(error.config)) {
      return Promise.reject(error)
    }

    if (error.status === 401) {
      if (isRedirecting) {
        window.location.href = '/auth/login'
        return Promise.reject(error)
      }

      isRedirecting = true
      try {
        const currentUrl = window.location.pathname
        if (currentUrl === '/' || currentUrl === '/auth/signup') {
          isRedirecting = false
          return
        }
        const refreshToken = getRefreshToken()
        const refreshResponse = await refresh({ refreshToken })

        if (refreshResponse.code === '200') {
          isRedirecting = false
          const token = refreshResponse.result.accessToken
          if (token) {
            setAccessToken(token)
          }
          return axiosInstance(error.config)
        }
      } catch (errors) {
        if (axios.isAxiosError(errors)) {
          const refreshError = errors as AxiosError<IRefreshResponse>
          if (refreshError.status === 401) {
            console.error('refreshToken이 없습니다. 로그인 페이지로 이동합니다.')
            removeAccessToken()
            removeRefreshToken()
            window.location.href = '/auth/login'
          } else if (refreshError.status === 404) {
            console.error('사용자 정보를 찾지 못했습니다. 로그인 페이지로 이동합니다.')
            removeAccessToken()
            removeRefreshToken()
            window.location.href = '/auth/login'
          } else {
            console.error('알 수 없는 오류가 발생했습니다', errors)
            removeAccessToken()
            removeRefreshToken()
            window.location.href = '/auth/login'
          }
        } else {
          console.error('알 수 없는 오류가 발생했습니다', errors)
          removeAccessToken()
          removeRefreshToken()
          window.location.href = '/auth/login'
        }

        return Promise.reject(errors)
      }
    }

    return Promise.reject(error)
  },
)
