'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Camera, Save, CreditCard } from 'lucide-react'
import Image from 'next/image'

interface PaymentMethod {
  id: string
  type: 'card'
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
}

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: ''
  })
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])

  useEffect(() => {
    if (!user) {
      router.push('/discovery')
      return
    }

    // Fetch profile data
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/customer/profile?email=${user.email}`)
        if (response.ok) {
          const data = await response.json()
          setProfileData({
            name: data.profile.name || '',
            email: data.profile.email || '',
            phone: data.profile.phone || '',
            address: data.profile.address || '',
            profilePicture: data.profile.profilePicture || ''
          })
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        setMessage({ type: 'error', text: 'Failed to load profile data' })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsLoading(true)
      // In a real app, upload to cloud storage and get URL
      // For now, create a data URL
      const reader = new FileReader()
      reader.onloadend = async () => {
        const imageUrl = reader.result as string
        const updatedData = { ...profileData, profilePicture: imageUrl }
        setProfileData(updatedData)
        
        // Update profile with new image
        await handleSave(updatedData)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Failed to upload image:', error)
      setMessage({ type: 'error', text: 'Failed to upload image' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (dataToUpdate = profileData) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/customer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully' })
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      console.error('Update failed:', error)
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setIsLoading(false)
    }
  }

  const addPaymentMethod = () => {
    // In a real app, integrate with payment provider
    router.push('/settings/payment')
  }

  // Add early return for loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  // Add early return for no user
  if (!user) {
    return null // Router will handle redirect
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-primary-blue">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-800 bg-gray-700">
                  {profileData.profilePicture ? (
                    <Image
                      src={profileData.profilePicture}
                      alt={profileData.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <Camera size={40} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-gray-700 rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-600">
                  <Camera size={20} className="text-gray-300" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="pt-20 pb-8 px-8">
            {message.text && (
              <div
                className={`mb-4 p-4 rounded-md ${
                  message.type === 'error'
                    ? 'bg-red-900/50 text-red-200'
                    : 'bg-green-900/50 text-green-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-600 py-2 px-3 shadow-sm text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Delivery Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-white placeholder-gray-400"
                />
              </div>

              {/* Payment Methods */}
              <div className="pt-6">
                <h3 className="text-lg font-medium text-gray-200 mb-4">
                  Payment Methods
                </h3>
                <div className="space-y-4">
                  {paymentMethods.map(method => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 border border-gray-600 rounded-md bg-gray-700"
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCard className="text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-200">
                            {method.brand} •••• {method.last4}
                          </p>
                          <p className="text-sm text-gray-400">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addPaymentMethod}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-600"
                  >
                    <CreditCard size={20} className="mr-2" />
                    Add Payment Method
                  </button>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleSave()}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Save size={20} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 