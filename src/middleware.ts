import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip middleware for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const token = request.cookies.get('token') || request.headers.get('Authorization')
  const user = request.cookies.get('user')

  // Public paths that don't require authentication
  const publicPaths = [
    '/login', 
    '/signup', 
    '/auth/login', 
    '/auth/signup',
    '/',              // Landing page
    '/discovery',     // Explore/discovery page
    '/explore'        // Alternative route for explore
  ]
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith(path)
  )

  // If the path is public, allow access
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!token || !user) {
    // Store the attempted URL to redirect back after login
    const returnUrl = request.nextUrl.pathname
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('returnUrl', returnUrl)
    return NextResponse.redirect(loginUrl)
  }

  // Allow access to authenticated user
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next (Next.js internals)
     * 2. /static (static files)
     * 3. /favicon.ico, /robots.txt (static files)
     */
    '/((?!_next|static|favicon.ico|robots.txt).*)',
  ],
} 