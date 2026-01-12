export interface NavigationBlockerResult {
  isOpen: boolean
  allowNextNavigationOnce: () => void
  stay: () => void
  leave: () => void
}
