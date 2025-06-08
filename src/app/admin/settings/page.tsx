'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Settings, Bell, Shield, Globe, CreditCard } from 'lucide-react'

interface SettingSection {
  id: string
  title: string
  icon: any
  component: React.ReactNode
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general')

  const sections: SettingSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      icon: Settings,
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="Delivery Platform"
                className="w-full px-4 py-2 rounded-lg bg-card-background text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="support@example.com"
                className="w-full px-4 py-2 rounded-lg bg-card-background text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-400">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
              </label>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Security Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Minimum Password Length
              </label>
              <select className="w-full px-4 py-2 rounded-lg bg-card-background text-white border border-gray-700 focus:outline-none focus:border-primary-blue">
                <option value="8">8 characters</option>
                <option value="10">10 characters</option>
                <option value="12">12 characters</option>
              </select>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-card-background rounded-lg p-4">
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-blue text-white'
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {section.title}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="lg:col-span-3 bg-card-background rounded-lg p-6">
          {sections.find((s) => s.id === activeSection)?.component}

          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="secondary"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Cancel
            </Button>
            <Button
              className="px-4 py-2 bg-primary-blue hover:bg-secondary-blue text-white rounded-lg"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 