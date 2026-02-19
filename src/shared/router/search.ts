export type RouteSearch = Record<string, unknown>

export const parsePositiveNumberSearch = (
  search: RouteSearch,
  key: string,
  fallback: number,
): number => {
  const value = search[key]
  const parsed = typeof value === 'string' || typeof value === 'number' ? Number(value) : Number.NaN
  if (Number.isFinite(parsed) && parsed > 0) return parsed
  return fallback
}

export const parseOptionalStringSearch = (search: RouteSearch, key: string): string | undefined => {
  const value = search[key]
  return typeof value === 'string' ? value : undefined
}

export const parseTabSearch = <T extends string>(
  search: RouteSearch,
  validTabs: ReadonlyArray<T>,
): { tab?: T } => {
  const tabValue = parseOptionalStringSearch(search, 'tab')
  const tab = tabValue && validTabs.includes(tabValue as T) ? (tabValue as T) : undefined
  return { tab }
}
