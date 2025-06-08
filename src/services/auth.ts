'use client'

export type UserRole = 'admin' | 'store' | 'driver' | 'customer'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  storeId?: number
  avatar?: string
  phone?: string
  isProfileComplete?: boolean
}

class AuthService {
  private user: User | null = null
  private listeners: ((user: User | null) => void)[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      // Try to load user from localStorage on initialization
      const savedUser = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      if (savedUser && token) {
        try {
          this.user = JSON.parse(savedUser)
          this.notifyListeners()
        } catch (error) {
          console.error('Error parsing saved user:', error)
          this.clearAuth()
        }
      }
    }
  }

  subscribe(listener: (user: User | null) => void) {
    this.listeners.push(listener)
    // Immediately notify the new listener of the current state
    listener(this.user)
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.user))
  }

  private clearAuth() {
    this.user = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      // Clear any other auth-related data
      localStorage.removeItem('isProfileComplete')
    }
    this.notifyListeners()
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const userData = await response.json()
      this.setUser(userData)
      // Set a dummy token for demo purposes
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', 'dummy-token')
      }
      return userData
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async loginWithData(userData: User): Promise<void> {
    // If user has name and phone, mark profile as complete
    const isProfileComplete = Boolean(userData.name && userData.phone)
    this.setUser({ ...userData, isProfileComplete })
    // Set a dummy token for demo purposes
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', 'dummy-token')
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout API endpoint if needed
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      }).catch(() => {
        // Ignore API errors during logout
        console.log('Logout API call failed, continuing with local logout')
      })
    } finally {
      // Always clear local auth state
      this.clearAuth()
    }
  }

  getUser(): User | null {
    return this.user
  }

  private setUser(user: User) {
    this.user = user
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user))
    }
    this.notifyListeners()
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return Boolean(this.user && localStorage.getItem('token'))
    }
    return false
  }

  hasRole(role: UserRole): boolean {
    return this.user?.role === role
  }

  // Get the appropriate dashboard route based on user role
  getDashboardRoute(): string {
    if (!this.user) return '/login'

    switch (this.user.role) {
      case 'admin':
        return '/dashboard/admin'
      case 'store':
        return '/dashboard/store'
      case 'driver':
        return '/dashboard/driver'
      case 'customer':
        return '/dashboard/customer'
      default:
        return '/login'
    }
  }

  // Check if user has access to a specific route
  canAccessRoute(route: string): boolean {
    if (!this.user) return false

    const roleRoutes: Record<UserRole, string[]> = {
      admin: ['/dashboard/admin', '/dashboard/admin/stores', '/dashboard/admin/drivers', '/dashboard/admin/customers'],
      store: ['/dashboard/store'],
      driver: ['/dashboard/driver'],
      customer: ['/dashboard/customer', '/discovery'],
    }

    return roleRoutes[this.user.role]?.includes(route) || false
  }

  // Get the appropriate route based on user role and profile completion
  getInitialRoute(): string {
    if (!this.user) return '/login'

    // For customers, check profile completion
    if (this.user.role === 'customer') {
      return this.user.isProfileComplete ? '/discovery' : '/dashboard/customer'
    }

    // For other roles, use their respective dashboards
    return this.getDashboardRoute()
  }
}

// Create a singleton instance
const authService = new AuthService()

export default authService 