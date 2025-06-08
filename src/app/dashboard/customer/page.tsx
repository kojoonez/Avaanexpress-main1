'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import authService from '@/services/auth'

interface Address {
  id: number
  type: string
  address: string
  details: string
}

interface Profile {
  name: string
  email: string
  phone: string
}

export default function CustomerDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState<Profile>({ name: '', email: '', phone: '' })
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState({ type: 'home', address: '', details: '' })
  const [isSaving, setIsSaving] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(false)

  useEffect(() => {
    // Load user profile
    const user = authService.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    // Set initial profile data
    setProfile({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    })

    // Check if profile is complete
    const isComplete = Boolean(user.name && user.phone)
    setIsProfileComplete(isComplete)

    // If profile is not complete, force profile tab
    if (!isComplete) {
      setActiveTab('profile')
    }
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
      const user = authService.getUser()
      if (!user) {
        throw new Error('No user found')
      }

      // First update the profile in the API
      const response = await fetch('/api/customer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...profile,
          id: user.id,
          role: user.role
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      // Update local user data
      const updatedUser = { 
        ...user, 
        ...profile,
        isProfileComplete: true 
      }
      
      // Update auth service with new user data
      await authService.loginWithData(updatedUser)
      
      // Set local state
      setIsProfileComplete(true)
      
      // Small delay to ensure state updates are processed
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Redirect to discovery page
      router.push('/discovery')
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      // Here you would make an API call to add the address
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      const newAddressWithId: Address = {
        id: Date.now(),
        ...newAddress
      }
      setAddresses([...addresses, newAddressWithId])
      setShowAddressForm(false)
      setNewAddress({ type: 'home', address: '', details: '' })
    } catch (error) {
      console.error('Failed to add address:', error)
      alert('Failed to add address. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  // If profile is not complete, show only the profile setup form
  if (!isProfileComplete) {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Welcome to Avaan Express</h1>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
              <p className="mt-2 text-gray-600">Please provide your information to continue using Avaan Express</p>
            </div>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                />
                <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Complete Profile'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    )
  }

  // Regular dashboard view for users with complete profiles
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Customer Dashboard</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`${
                    activeTab === 'orders'
                      ? 'border-primary-blue text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  My Orders
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
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`${
                    activeTab === 'addresses'
                      ? 'border-primary-blue text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Addresses
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'orders' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
            <div className="text-gray-500 text-center py-4">
              No orders yet. Start ordering from our restaurants!
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
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

        {activeTab === 'addresses' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Delivery Addresses</h2>
              <button
                onClick={() => setShowAddressForm(true)}
                className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600"
              >
                Add New Address
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-gray-500 text-center py-4">
                No addresses saved yet. Add your first delivery address!
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-2">
                          {address.type}
                        </span>
                        <p className="text-gray-900">{address.address}</p>
                        <p className="text-gray-500 text-sm">{address.details}</p>
                      </div>
                      <button
                        onClick={() => {
                          setAddresses(addresses.filter(a => a.id !== address.id))
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showAddressForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Address</h3>
                  <form onSubmit={handleAddAddress} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address Type</label>
                      <select
                        value={newAddress.type}
                        onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                        placeholder="Enter your address"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Additional Details</label>
                      <input
                        type="text"
                        value={newAddress.details}
                        onChange={(e) => setNewAddress({ ...newAddress, details: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                        placeholder="Apartment number, floor, landmark, etc."
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                      >
                        {isSaving ? 'Adding...' : 'Add Address'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
} 