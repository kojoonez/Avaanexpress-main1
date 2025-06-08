'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import authService from '@/services/auth'

const TEST_CREDENTIALS = [
  {
    role: 'Admin',
    email: 'admin@avaan.com',
    password: 'admin123'
  },
  {
    role: 'Restaurant',
    email: 'store@avaan.com',
    password: 'store123'
  },
  {
    role: 'Delivery Rider',
    email: 'driver@avaan.com',
    password: 'driver123'
  },
  {
    role: 'Customer',
    email: 'customer@avaan.com',
    password: 'customer123'
  }
]

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string>('Customer')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      console.log('Login attempt:', { email, password }) // Debug log

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log('Login response:', { status: response.status, data }) // Debug log

      if (!response.ok) {
        throw new Error(data.error || `Login failed with status ${response.status}`)
      }

      // Store the user data
      localStorage.setItem('user', JSON.stringify(data))
      console.log('User data stored:', data) // Debug log
      
      // Update auth service
      await authService.loginWithData(data)
      console.log('Auth service updated') // Debug log
      
      // Check if there's a return URL
      const returnUrl = searchParams.get('returnUrl')
      if (returnUrl) {
        router.push(returnUrl)
      } else {
        // If no return URL, use the default route based on role and profile completion
        const initialRoute = authService.getInitialRoute()
        console.log('Redirecting to:', initialRoute) // Debug log
        router.push(initialRoute)
      }
    } catch (error) {
      console.error('Login error:', error) // Debug log
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fillTestCredentials = (testUser: typeof TEST_CREDENTIALS[0]) => {
    setEmail(testUser.email)
    setPassword(testUser.password)
    setSelectedRole(testUser.role)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card-background rounded-lg border border-gray-800 p-8">
          <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-center text-gray-400 mb-8">Sign in to your account</p>
          
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {TEST_CREDENTIALS.map((cred) => (
              <button
                key={cred.role}
                onClick={() => fillTestCredentials(cred)}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedRole === cred.role
                    ? 'bg-primary-blue text-white'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {cred.role}
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-blue hover:text-blue-400">
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="text-primary-blue hover:text-blue-400">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 