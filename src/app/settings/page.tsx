'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  Lock,
  Settings,
  Heart
} from 'lucide-react'

interface SettingsSection {
  id: string
  title: string
  icon: any
  description: string
}

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: User,
    description: 'Manage your personal details and preferences'
  },
  {
    id: 'addresses',
    title: 'Delivery Addresses',
    icon: MapPin,
    description: 'Add and manage your delivery locations'
  },
  {
    id: 'payment',
    title: 'Payment Methods',
    icon: CreditCard,
    description: 'Manage your payment options'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    description: 'Control your notification preferences'
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: Lock,
    description: 'Manage your account security and privacy'
  },
  {
    id: 'preferences',
    title: 'Order Preferences',
    icon: Heart,
    description: 'Set your default ordering preferences'
  }
]

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('personal')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }
  }, [user, router])

  const handleSectionClick = (sectionId: string) => {
    router.push(`/settings/${sectionId}`)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <button
            onClick={() => router.push('/dashboard/customer')}
            className="text-primary-blue hover:text-blue-700"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="bg-white rounded-lg shadow p-6 text-left transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full transition-all duration-200 group-hover:bg-opacity-20">
                    <Icon className="w-6 h-6 text-primary-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-blue transition-colors duration-200">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {section.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {message.text && (
          <div
            className={`mt-6 p-4 rounded-md ${
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
  )
} 