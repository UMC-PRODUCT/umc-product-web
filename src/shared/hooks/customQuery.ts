import type {
  InfiniteData,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

type DefaultQueryOptions = {
  staleTime?: number
  retry?: number | boolean
}

const STALE_TIME = 1000 * 60 * 3
const RETRY = 1

// 기본적인 쿼리 흐름을 정리한 커스텀 훅들:
// 1) useCustomQuery: 일반 `useQuery` 래퍼로, 스테일 시간·재시도 횟수·포커스 시 리패치 제한을 기본값으로 잡아줍니다.
//    최초 키/펑션 이외 값을 옵션에 넘겨도 기본 설정을 덮어쓰지 않고 안전하게 적용합니다.
// 2) useCustomInfiniteQuery: 페이지 단위 API를 위한 `useInfiniteQuery` 래퍼로, 위와 동일한 기본값에 더해 `keepPreviousData` 없이 연속 페이지를 유지합니다.

export const useCustomQuery = <
  TQueryFnData,
  TError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & DefaultQueryOptions,
) => {
  const safeOptions =
    options ?? ({} as UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & DefaultQueryOptions)
  const {
    staleTime,
    retry,
    refetchOnWindowFocus,
    queryKey: _,
    queryFn: __,
    ...restOptions
  } = safeOptions

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey: queryKey,
    queryFn: queryFn,
    staleTime: staleTime ?? STALE_TIME,
    retry: retry ?? RETRY,
    refetchOnWindowFocus: false,
    ...restOptions,
  })
}

export const useCustomInfiniteQuery = <
  TQueryFnData,
  TError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey, TPageParam>,
  infiniteOptions?: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> &
    DefaultQueryOptions,
) => {
  const safeOptions =
    infiniteOptions ??
    ({} as UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> &
      DefaultQueryOptions)
  const {
    staleTime,
    retry,
    refetchOnWindowFocus,
    queryKey: _,
    queryFn: __,
    ...restOptions
  } = safeOptions

  return useInfiniteQuery<TQueryFnData, TError, TData, TQueryKey, TPageParam>({
    queryKey,
    queryFn,
    staleTime: staleTime ?? STALE_TIME,
    retry: retry ?? RETRY,
    refetchOnWindowFocus: false,
    ...restOptions,
  })
}
