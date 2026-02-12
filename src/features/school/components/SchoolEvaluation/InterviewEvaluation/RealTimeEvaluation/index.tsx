import { useState } from 'react'

import DetailView from './DetailView'
import ListView from './ListView'

const QUERY_KEYS = {
  assignmentId: 'rtAssignmentId',
} as const

type SelectedUser = {
  id: string
}

const readSelectedUserFromQuery = (): SelectedUser | null => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const assignmentId = params.get(QUERY_KEYS.assignmentId)
  if (!assignmentId) return null
  return { id: assignmentId }
}

const writeSelectedUserToQuery = (user: SelectedUser) => {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  params.set(QUERY_KEYS.assignmentId, user.id)

  const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`
  window.history.replaceState(null, '', nextUrl)
}

const clearSelectedUserQuery = () => {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  params.delete(QUERY_KEYS.assignmentId)

  const query = params.toString()
  const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
  window.history.replaceState(null, '', nextUrl)
}
// --- 메인 컴포넌트 ---
const RealTimeEvaluation = () => {
  const initialSelectedUser = readSelectedUserFromQuery()

  // view: 'list' (목록), 'detail' (평가 화면)
  const [view, setView] = useState<'list' | 'detail'>(initialSelectedUser ? 'detail' : 'list')
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(initialSelectedUser)

  const handleStartEval = (user: SelectedUser) => {
    setSelectedUser(user)
    writeSelectedUserToQuery(user)
    setView('detail')
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    })
  }

  const handleBack = () => {
    setView('list')
    setSelectedUser(null)
    clearSelectedUserQuery()
  }

  // 1. 목록 화면
  if (view === 'list') {
    return <ListView onStartEval={handleStartEval} />
  }

  return <DetailView selectedUser={selectedUser!} onBack={handleBack} />
}

export default RealTimeEvaluation
