'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import authService from '@/services/auth'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      router.push('/login')
      return
    }

    // Redirect to the appropriate dashboard based on user role
    const dashboardRoute = authService.getDashboardRoute()
    router.push(dashboardRoute)
  }, [router])

  // Show loading spinner while redirecting
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-blue"></div>
    </div>
  )
} 