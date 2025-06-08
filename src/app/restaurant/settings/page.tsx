'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Image, Clock, MapPin, Phone, Mail, Globe, Camera } from 'lucide-react'

interface BusinessHours {
  day: string
  open: string
  close: string
  closed: boolean
}

export default function RestaurantSettings() {
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>([
    { day: 'Monday', open: '09:00', close: '22:00', closed: false },
    { day: 'Tuesday', open: '09:00', close: '22:00', closed: false },
    { day: 'Wednesday', open: '09:00', close: '22:00', closed: false },
    { day: 'Thursday', open: '09:00', close: '22:00', closed: false },
    { day: 'Friday', open: '09:00', close: '23:00', closed: false },
    { day: 'Saturday', open: '10:00', close: '23:00', closed: false },
    { day: 'Sunday', open: '10:00', close: '22:00', closed: false },
  ])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Restaurant Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-card-background rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  defaultValue="Burger Palace"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  defaultValue="Best burgers in town with fresh ingredients and signature sauces."
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Cuisine Type
                </label>
                <select className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue">
                  <option value="burgers">Burgers</option>
                  <option value="pizza">Pizza</option>
                  <option value="sushi">Sushi</option>
                  <option value="indian">Indian</option>
                  <option value="italian">Italian</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card-background rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      defaultValue="+1234567890"
                      className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      defaultValue="contact@burgerpalace.com"
                      className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    defaultValue="https://burgerpalace.com"
                    className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    rows={2}
                    defaultValue="123 Food Street, Cuisine City, FC 12345"
                    className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-card-background rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Business Hours</h2>
            <div className="space-y-4">
              {businessHours.map((hours, index) => (
                <div key={hours.day} className="flex items-center gap-4">
                  <div className="w-28">
                    <span className="text-gray-400">{hours.day}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      value={hours.open}
                      disabled={hours.closed}
                      onChange={(e) => {
                        const newHours = [...businessHours]
                        newHours[index].open = e.target.value
                        setBusinessHours(newHours)
                      }}
                      className="px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue disabled:opacity-50"
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="time"
                      value={hours.close}
                      disabled={hours.closed}
                      onChange={(e) => {
                        const newHours = [...businessHours]
                        newHours[index].close = e.target.value
                        setBusinessHours(newHours)
                      }}
                      className="px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue disabled:opacity-50"
                    />
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!hours.closed}
                      onChange={() => {
                        const newHours = [...businessHours]
                        newHours[index].closed = !newHours[index].closed
                        setBusinessHours(newHours)
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="space-y-6">
          {/* Restaurant Logo */}
          <div className="bg-card-background rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Restaurant Logo</h2>
            <div className="aspect-square rounded-lg border-2 border-dashed border-gray-700 flex flex-col items-center justify-center">
              <Camera className="w-12 h-12 text-gray-600 mb-2" />
              <p className="text-sm text-gray-400 text-center mb-4">
                Drag and drop your logo here, or click to select
              </p>
              <input type="file" accept="image/*" className="hidden" id="logo-upload" />
              <Button
                onClick={() => document.getElementById('logo-upload')?.click()}
                variant="secondary"
                className="bg-gray-700 hover:bg-gray-600"
              >
                Upload Logo
              </Button>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-card-background rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Cover Image</h2>
            <div className="aspect-video rounded-lg border-2 border-dashed border-gray-700 flex flex-col items-center justify-center">
              <Image className="w-12 h-12 text-gray-600 mb-2" />
              <p className="text-sm text-gray-400 text-center mb-4">
                Drag and drop your cover image here, or click to select
              </p>
              <input type="file" accept="image/*" className="hidden" id="cover-upload" />
              <Button
                onClick={() => document.getElementById('cover-upload')?.click()}
                variant="secondary"
                className="bg-gray-700 hover:bg-gray-600"
              >
                Upload Cover
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button className="px-6 py-2 bg-primary-blue hover:bg-secondary-blue text-white rounded-lg">
          Save Changes
        </Button>
      </div>
    </div>
  )
} 