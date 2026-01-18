'use client';

import { useEffect, useState } from 'react';

// Component to render children only on the client side 
// This is used to prevent ssr hydration errors

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return children
}