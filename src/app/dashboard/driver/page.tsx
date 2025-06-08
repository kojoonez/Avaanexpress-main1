'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import authService from '@/services/auth'

interface DriverProfile {
  name: string
  phone: string
  vehicleType: 'motorcycle' | 'bicycle' | 'car'
  licensePlate: string
}

interface Earnings {
  today: number
  week: number
  month: number
}

export default function DriverDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('deliveries')
  const [isOnline, setIsOnline] = useState(false)
  const [profile, setProfile] = useState<DriverProfile>({
    name: '',
    phone: '',
    vehicleType: 'motorcycle',
    licensePlate: ''
  })
  const [earnings, setEarnings] = useState<Earnings>({
    today: 0,
    week: 0,
    month: 0
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load driver data
    const user = authService.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setProfile({
      name: user.name || '',
      phone: user.phone || '',
      vehicleType: 'motorcycle',
      licensePlate: ''
    })
    // Here you would typically fetch earnings data from API
    // For now, we'll use dummy data
    setEarnings({
      today: 0,
      week: 0,
      month: 0
    })
  }, [router])

  const handleLogout = async () => {
    try {
      await authService.logout()
      // Redirect to explore page after logout
      router.push('/discovery')
    } catch (error) {
      console.error('Logout failed:', error)
      // Still try to redirect even if there's an error
      router.push('/discovery')
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      // Here you would make an API call to update the profile
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      // Update local storage
      const user = authService.getUser()
      if (user) {
        const updatedUser = { ...user, name: profile.name, phone: profile.phone }
        await authService.loginWithData(updatedUser)
      }
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const toggleOnlineStatus = async () => {
    try {
      // Here you would make an API call to update online status
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      setIsOnline(!isOnline)
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update status. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Driver Dashboard</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('deliveries')}
                  className={`${
                    activeTab === 'deliveries'
                      ? 'border-primary-blue text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Deliveries
                </button>
                <button
                  onClick={() => setActiveTab('earnings')}
                  className={`${
                    activeTab === 'earnings'
                      ? 'border-primary-blue text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Earnings
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`${
                    activeTab === 'profile'
                      ? 'border-primary-blue text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Profile
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleOnlineStatus}
                className={`px-4 py-2 rounded-md ${
                  isOnline
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                {isOnline ? 'Online' : 'Offline'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'deliveries' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Current Delivery</h2>
              <div className="text-gray-500 text-center py-4">
                {isOnline ? 'Waiting for orders...' : 'Go online to start receiving orders!'}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery History</h2>
              <div className="text-gray-500 text-center py-4">
                No completed deliveries yet.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Earnings Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Today's Earnings</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  ${earnings.today.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">This Week</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  ${earnings.week.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">This Month</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  ${earnings.month.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Driver Profile</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                <select
                  value={profile.vehicleType}
                  onChange={(e) => setProfile({ ...profile, vehicleType: e.target.value as 'motorcycle' | 'bicycle' | 'car' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                >
                  <option value="motorcycle">Motorcycle</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="car">Car</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">License Plate</label>
                <input
                  type="text"
                  value={profile.licensePlate}
                  onChange={(e) => setProfile({ ...profile, licensePlate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
} 