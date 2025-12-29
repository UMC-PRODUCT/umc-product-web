import { Link } from '@tanstack/react-router'

import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg"></header>
    </>
  )
}
