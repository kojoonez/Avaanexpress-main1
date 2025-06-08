'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Heart, Clock, Utensils, Leaf, HandCoins, UserRound } from 'lucide-react'

interface OrderPreferences {
  defaultTip: number
  dietaryRestrictions: string[]
  favoriteRestaurants: string[]
  preferredDeliveryTimes: string[]
  contactlessDelivery: boolean
}

const DIETARY_RESTRICTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Halal',
  'Kosher'
]

const DELIVERY_TIMES = [
  'Morning (8:00 - 11:00)',
  'Lunch (11:00 - 14:00)',
  'Afternoon (14:00 - 17:00)',
  'Evening (17:00 - 20:00)',
  'Night (20:00 - 23:00)'
]

const TIP_OPTIONS = [
  { value: 0, label: 'No tip' },
  { value: 5, label: '5%' },
  { value: 10, label: '10%' },
  { value: 15, label: '15%' },
  { value: 20, label: '20%' }
]

export default function PreferencesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [preferences, setPreferences] = useState<OrderPreferences>({
    defaultTip: 10,
    dietaryRestrictions: [],
    favoriteRestaurants: [],
    preferredDeliveryTimes: [],
    contactlessDelivery: false
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    // Fetch user preferences
    const fetchPreferences = async () => {
      try {
        const response = await fetch(`/api/customer/preferences?email=${user.email}`)
        if (response.ok) {
          const data = await response.json()
          setPreferences(data.preferences)
        }
      } catch (error) {
        console.error('Failed to fetch preferences:', error)
        setMessage({ type: 'error', text: 'Failed to load preferences' })
      }
    }

    fetchPreferences()
  }, [user, router])

  const handleSave = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/customer/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          preferences
        }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Preferences updated successfully' })
      } else {
        throw new Error('Failed to update preferences')
      }
    } catch (error) {
      console.error('Update failed:', error)
      setMessage({ type: 'error', text: 'Failed to update preferences' })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleDietaryRestriction = (restriction: string) => {
    setPreferences(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }))
  }

  const toggleDeliveryTime = (time: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredDeliveryTimes: prev.preferredDeliveryTimes.includes(time)
        ? prev.preferredDeliveryTimes.filter(t => t !== time)
        : [...prev.preferredDeliveryTimes, time]
    }))
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Order Preferences</h1>
          <button
            onClick={() => router.push('/settings')}
            className="text-primary-blue hover:text-blue-700"
          >
            Back to Settings
          </button>
        </div>

        <div className="space-y-6">
          {/* Default Tip */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full">
                  <HandCoins className="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Default Tip</h2>
                  <p className="text-sm text-gray-500">
                    Set your preferred tip percentage for orders
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {TIP_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setPreferences(prev => ({ ...prev, defaultTip: option.value }))}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      preferences.defaultTip === option.value
                        ? 'bg-primary-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full">
                  <Leaf className="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Dietary Restrictions</h2>
                  <p className="text-sm text-gray-500">
                    Select any dietary restrictions you have
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {DIETARY_RESTRICTIONS.map(restriction => (
                  <button
                    key={restriction}
                    onClick={() => toggleDietaryRestriction(restriction)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      preferences.dietaryRestrictions.includes(restriction)
                        ? 'bg-primary-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {restriction}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preferred Delivery Times */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Preferred Delivery Times</h2>
                  <p className="text-sm text-gray-500">
                    Select your preferred delivery time slots
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DELIVERY_TIMES.map(time => (
                  <button
                    key={time}
                    onClick={() => toggleDeliveryTime(time)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      preferences.preferredDeliveryTimes.includes(time)
                        ? 'bg-primary-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contactless Delivery */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full">
                    <UserRound className="w-6 h-6 text-primary-blue" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Contactless Delivery</h2>
                    <p className="text-sm text-gray-500">
                      Enable contactless delivery by default
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.contactlessDelivery}
                    onChange={() => setPreferences(prev => ({
                      ...prev,
                      contactlessDelivery: !prev.contactlessDelivery
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>

          {message.text && (
            <div
              className={`p-4 rounded-md ${
                message.type === 'error'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 