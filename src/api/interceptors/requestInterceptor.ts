/**
 * 요청 인터셉터
 * Authorization 헤더에 액세스 토큰을 자동으로 추가합니다.
 */

import type { AxiosInstance } from 'axios'
import { AxiosHeaders } from 'axios'

import { getAccessToken } from '../tokenManager'

export function setupRequestInterceptor(instance: AxiosInstance): void {
  instance.interceptors.request.use((config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      const headers = new AxiosHeaders(config.headers)
      headers.set('Authorization', `Bearer ${accessToken}`)
      config.headers = headers
    }
    return config
  })
}
