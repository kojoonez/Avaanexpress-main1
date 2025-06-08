'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Building2, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

type UserRole = 'customer' | 'restaurant' | 'rider' | 'admin'

interface FormData {
  email: string
  password: string
  confirmPassword: string
  name: string
  phone: string
  address?: string
  // Restaurant specific
  businessName?: string
  businessType?: string
  // Rider specific
  vehicleType?: string
  licenseNumber?: string
}

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear any previous errors when user starts typing
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    try {
      // Sign up the user
      const userData = await signup({ ...formData, role: selectedRole })
      
      // For customers, create their profile immediately
      if (selectedRole === 'customer') {
        try {
          // Create customer profile
          const response = await fetch('/api/customer/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address
            }),
          })

          if (!response.ok) {
            throw new Error('Failed to create customer profile')
          }

          // Redirect to discovery page
          router.push('/discovery')
        } catch (profileError) {
          console.error('Profile creation error:', profileError)
          setError('Account created but failed to set up profile. Please try again.')
          return
        }
      } else {
        // For other roles, redirect to their respective dashboards
        switch (selectedRole) {
          case 'restaurant':
            router.push('/dashboard/store')
            break
          case 'rider':
            router.push('/dashboard/driver')
            break
          case 'admin':
            router.push('/dashboard/admin')
            break
        }
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('Failed to create account. Please try again.')
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
            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join our delivery platform</p>
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
            {/* Common Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            {/* Role-specific Fields */}
            {(selectedRole === 'customer' || selectedRole === 'restaurant') && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                    placeholder="123 Main St, City"
                  />
                </div>
              </div>
            )}

            {selectedRole === 'restaurant' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Business Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                      placeholder="Restaurant Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Business Type
                  </label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                      placeholder="e.g. Italian Restaurant"
                    />
                  </div>
                </div>
              </>
            )}

            {selectedRole === 'rider' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Vehicle Type
                  </label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                      placeholder="e.g. Motorcycle, Car"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    License Number
                  </label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                      placeholder="License Number"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-12 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-blue hover:bg-secondary-blue text-white py-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-primary-blue hover:text-secondary-blue"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 