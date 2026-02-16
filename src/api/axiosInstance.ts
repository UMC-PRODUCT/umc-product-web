/**
 * Axios 인스턴스 설정
 */

import axios from 'axios'

import { setupRequestInterceptor, setupResponseInterceptor } from './interceptors'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

setupRequestInterceptor(axiosInstance)
setupResponseInterceptor(axiosInstance)
