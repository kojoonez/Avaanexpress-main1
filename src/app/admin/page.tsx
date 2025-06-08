'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard
    router.push('/admin/dashboard')
  }, [router])

  return null
} 