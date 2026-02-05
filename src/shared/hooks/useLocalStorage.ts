export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage 접근 오류 무시
    }
  }

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  }

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // localStorage 접근 오류 무시
    }
  }

  return { setItem, getItem, removeItem }
}
