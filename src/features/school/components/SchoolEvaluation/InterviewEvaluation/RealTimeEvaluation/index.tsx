import { useState } from 'react'

import DetailView from './DetailView'
import ListView from './ListView'
// --- 메인 컴포넌트 ---
const RealTimeEvaluation = () => {
  // view: 'list' (목록), 'detail' (평가 화면)
  const [view, setView] = useState<'list' | 'detail'>('list')
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null)

  const handleStartEval = (user: { id: string; name: string }) => {
    setSelectedUser(user)
    setView('detail')
  }

  const handleBack = () => {
    setView('list')
    setSelectedUser(null)
  }

  // 1. 목록 화면
  if (view === 'list') {
    return <ListView onStartEval={handleStartEval} />
  }

  return <DetailView selectedUser={selectedUser!} onBack={handleBack} />
}

export default RealTimeEvaluation
