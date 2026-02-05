/**
 * 토큰 관리 모듈
 * localStorage에서 액세스/리프레시 토큰을 관리합니다.
 */

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const

export function getStoredToken(key: string): string | undefined {
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

export function setToken(key: string, value: string): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

export function removeToken(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

export function getAccessToken(): string | undefined {
  return getStoredToken(STORAGE_KEYS.ACCESS_TOKEN)
}

export function getRefreshToken(): string | undefined {
  return getStoredToken(STORAGE_KEYS.REFRESH_TOKEN)
}

export function setAccessToken(token: string): void {
  setToken(STORAGE_KEYS.ACCESS_TOKEN, token)
}

export function setRefreshToken(token: string): void {
  setToken(STORAGE_KEYS.REFRESH_TOKEN, token)
}

export function removeAccessToken(): void {
  removeToken(STORAGE_KEYS.ACCESS_TOKEN)
}

export function removeRefreshToken(): void {
  removeToken(STORAGE_KEYS.REFRESH_TOKEN)
}

export function clearTokens(): void {
  removeAccessToken()
  removeRefreshToken()
}
