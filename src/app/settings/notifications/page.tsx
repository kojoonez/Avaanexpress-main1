'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Bell, Mail, MessageSquare, Gift } from 'lucide-react'

interface NotificationSettings {
  orderUpdates: boolean
  promotions: boolean
  newsletter: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  emailNotifications: boolean
}

export default function NotificationsSettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [settings, setSettings] = useState<NotificationSettings>({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    pushNotifications: true,
    smsNotifications: false,
    emailNotifications: true
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    // Fetch notification settings
    const fetchSettings = async () => {
      try {
        const response = await fetch(`/api/customer/notifications?email=${user.email}`)
        if (response.ok) {
          const data = await response.json()
          setSettings(data.settings)
        }
      } catch (error) {
        console.error('Failed to fetch notification settings:', error)
        setMessage({ type: 'error', text: 'Failed to load notification settings' })
      }
    }

    fetchSettings()
  }, [user, router])

  const handleToggle = async (setting: keyof NotificationSettings) => {
    try {
      setIsLoading(true)
      const updatedSettings = {
        ...settings,
        [setting]: !settings[setting]
      }

      const response = await fetch('/api/customer/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          settings: updatedSettings
        }),
      })

      if (response.ok) {
        setSettings(updatedSettings)
        setMessage({ type: 'success', text: 'Notification settings updated' })
      } else {
        throw new Error('Failed to update notification settings')
      }
    } catch (error) {
      console.error('Update failed:', error)
      setMessage({ type: 'error', text: 'Failed to update notification settings' })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Notification Settings</h1>
          <button
            onClick={() => router.push('/settings')}
            className="text-primary-blue hover:text-blue-700"
          >
            Back to Settings
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Order Updates */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full">
                  <Bell className="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Order Updates</h3>
                  <p className="text-sm text-gray-500">
                    Get notified about your order status changes
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.orderUpdates}
                  onChange={() => handleToggle('orderUpdates')}
                  disabled={isLoading}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
              </label>
            </div>

            {/* Promotional Offers */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full">
                  <Gift className="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Promotional Offers</h3>
                  <p className="text-sm text-gray-500">
                    Receive special offers and discounts
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.promotions}
                  onChange={() => handleToggle('promotions')}
                  disabled={isLoading}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
              </label>
            </div>

            {/* Newsletter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Newsletter</h3>
                  <p className="text-sm text-gray-500">
                    Subscribe to our weekly newsletter
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.newsletter}
                  onChange={() => handleToggle('newsletter')}
                  disabled={isLoading}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
              </label>
            </div>

            {/* Notification Methods */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Methods</h3>
              
              {/* Push Notifications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full">
                      <Bell className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Receive notifications on your device
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.pushNotifications}
                      onChange={() => handleToggle('pushNotifications')}
                      disabled={isLoading}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                  </label>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full">
                      <MessageSquare className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">SMS Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Receive notifications via SMS
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.smsNotifications}
                      onChange={() => handleToggle('smsNotifications')}
                      disabled={isLoading}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                  </label>
                </div>

                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.emailNotifications}
                      onChange={() => handleToggle('emailNotifications')}
                      disabled={isLoading}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {message.text && (
            <div
              className={`mx-8 mb-8 p-4 rounded-md ${
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