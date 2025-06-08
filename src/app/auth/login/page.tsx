'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

type UserRole = 'customer' | 'restaurant' | 'rider' | 'admin'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password, selectedRole)
      // Redirect based on role
      switch (selectedRole) {
        case 'customer':
          router.push('/customer/dashboard')
          break
        case 'restaurant':
          router.push('/restaurant/dashboard')
          break
        case 'rider':
          router.push('/rider/dashboard')
          break
        case 'admin':
          router.push('/admin/dashboard')
          break
      }
    } catch (error) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary-blue mb-3">Avaan Express</h1>
          <p className="text-xl text-gray-400">Your Trusted Delivery Partner</p>
        </div>

        <div className="bg-card-background rounded-lg p-8 w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setSelectedRole('customer')}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                selectedRole === 'customer'
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setSelectedRole('restaurant')}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                selectedRole === 'restaurant'
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Restaurant
            </button>
            <button
              onClick={() => setSelectedRole('rider')}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                selectedRole === 'rider'
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Delivery Rider
            </button>
            <button
              onClick={() => setSelectedRole('admin')}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                selectedRole === 'admin'
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-primary-blue focus:ring-primary-blue focus:ring-offset-gray-900"
                />
                <span className="ml-2 text-gray-400">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-primary-blue hover:text-secondary-blue"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-blue hover:bg-secondary-blue text-white py-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-primary-blue hover:text-secondary-blue"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 