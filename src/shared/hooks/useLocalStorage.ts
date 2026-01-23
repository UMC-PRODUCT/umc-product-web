export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (e) {
      console.log(e)
    }
  }

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key)
    } catch (e) {
      console.log(e)
    }
  }

  return { setItem, getItem, removeItem }
}
