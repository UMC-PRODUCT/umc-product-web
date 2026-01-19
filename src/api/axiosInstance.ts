import type { AxiosError } from 'axios'
import axios from 'axios'

import { refresh } from '@/features/auth/domain/api'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'

interface IRefreshResponse {
  isSuccess: boolean
  code: string
  message: string
}
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
})

let isRedirecting = false

const { getItem: getRefreshToken, removeItem: removeRefreshToken } = useLocalStorage('refreshToken')
const { getItem: getAccessToken, removeItem: removeAccessToken } = useLocalStorage('accessToken')

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    const headers = config.headers
    headers.set('Authorization', `Bearer ${accessToken}`)
    config.headers = headers
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
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
          return axiosInstance(error.config)
        }
      } catch (errors) {
        if (axios.isAxiosError(errors)) {
          const refreshError = errors as AxiosError<IRefreshResponse>
          if (refreshError.status === 401) {
            console.error('refreshToken이 없습니다. 로그인 페이지로 이동합니다.')
            // void logout()
            removeAccessToken()
            removeRefreshToken()
            window.location.href = '/auth/login'
          } else if (refreshError.status === 404) {
            console.error('사용자 정보를 찾지 못했습니다. 로그인 페이지로 이동합니다.')
            // void logout()
            removeAccessToken()
            removeRefreshToken()
            window.location.href = '/auth/login'
          } else {
            console.error('알 수 없는 오류가 발생했습니다', errors)
            // void logout()
            removeAccessToken()
            removeRefreshToken()
            window.location.href = '/auth/login'
          }
        } else {
          console.error('알 수 없는 오류가 발생했습니다', errors)
          // void logout()
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
