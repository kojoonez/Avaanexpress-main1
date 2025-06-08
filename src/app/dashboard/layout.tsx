'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import authService from '@/services/auth'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      router.push('/login')
      return
    }

    // Check if user can access this route
    const canAccess = authService.canAccessRoute(pathname)
    
    if (!canAccess) {
      // Redirect to appropriate dashboard based on role
      router.push(authService.getDashboardRoute())
      return
    }
    
    setIsAuthorized(true)
  }, [pathname, router])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  return children
} 