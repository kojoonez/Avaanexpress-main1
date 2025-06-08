'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import { Camera, User } from 'lucide-react'

interface PersonalInfo {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  language: string
  profilePicture: string | null
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fi', name: 'Finnish' },
  { code: 'sv', name: 'Swedish' }
]

export default function PersonalSettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    language: 'en',
    profilePicture: null
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    // Fetch user's personal information
    const fetchPersonalInfo = async () => {
      try {
        const response = await fetch(`/api/customer/profile?email=${user.email}`)
        if (response.ok) {
          const data = await response.json()
          setPersonalInfo({
            name: data.profile.name || '',
            email: data.profile.email || '',
            phone: data.profile.phone || '',
            dateOfBirth: data.profile.dateOfBirth || '',
            language: data.profile.language || 'en',
            profilePicture: data.profile.profilePicture || null
          })
        }
      } catch (error) {
        console.error('Failed to fetch personal info:', error)
        setMessage({ type: 'error', text: 'Failed to load personal information' })
      }
    }

    fetchPersonalInfo()
  }, [user, router])

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
        setPersonalInfo(prev => ({ ...prev, profilePicture: imageUrl }))
        await handleSave({ ...personalInfo, profilePicture: imageUrl })
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Failed to upload image:', error)
      setMessage({ type: 'error', text: 'Failed to upload profile picture' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (dataToUpdate = personalInfo) => {
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
        setMessage({ type: 'success', text: 'Personal information updated successfully' })
      } else {
        throw new Error('Failed to update personal information')
      }
    } catch (error) {
      console.error('Update failed:', error)
      setMessage({ type: 'error', text: 'Failed to update personal information' })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Personal Information</h1>
          <button
            onClick={() => router.push('/settings')}
            className="text-primary-blue hover:text-blue-700"
          >
            Back to Settings
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Picture Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                  {personalInfo.profilePicture ? (
                    <Image
                      src={personalInfo.profilePicture}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profile-picture"
                  className="absolute bottom-0 right-0 bg-primary-blue text-white p-2 rounded-full cursor-pointer hover:bg-blue-700"
                >
                  <Camera className="w-5 h-5" />
                  <input
                    type="file"
                    id="profile-picture"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Click the camera icon to update your profile picture
              </p>
            </div>
          </div>

          {/* Personal Information Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={personalInfo.email}
                disabled
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 shadow-sm text-gray-900"
              />
              <p className="mt-1 text-sm text-gray-500">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                value={personalInfo.language}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, language: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-gray-900"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
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

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 