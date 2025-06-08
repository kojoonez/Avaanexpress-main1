'use client'

import { User, Mail, Phone, Calendar, MapPin, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface UserDetailsProps {
  userId: string
}

export function UserDetails({ userId }: UserDetailsProps) {
  // This would fetch user details from an API in production
  const userDetails = {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    role: 'Customer',
    status: 'Active',
    address: '123 Main St, City',
    createdAt: '2024-05-24',
    lastLogin: '2024-05-24 09:30 AM',
    orders: 15,
    totalSpent: '$350.25'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">User Details</h2>
        <span className={`px-3 py-1 rounded-full text-sm ${
          userDetails.status === 'Active' ? 'bg-green-500/20 text-green-500' :
          'bg-red-500/20 text-red-500'
        }`}>
          {userDetails.status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-white">{userDetails.name}</h3>
            <p className="text-sm text-gray-400">{userDetails.role}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-white">Email</h3>
            <p className="text-sm text-gray-400">{userDetails.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-white">Phone</h3>
            <p className="text-sm text-gray-400">{userDetails.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-white">Address</h3>
            <p className="text-sm text-gray-400">{userDetails.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-white">Member Since</h3>
            <p className="text-sm text-gray-400">{userDetails.createdAt}</p>
            <p className="text-sm text-gray-400">Last login: {userDetails.lastLogin}</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4">
          <h3 className="font-medium text-white mb-3">Activity Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card-background rounded-lg p-3">
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-lg font-semibold text-white">{userDetails.orders}</p>
            </div>
            <div className="bg-card-background rounded-lg p-3">
              <p className="text-sm text-gray-400">Total Spent</p>
              <p className="text-lg font-semibold text-primary-blue">{userDetails.totalSpent}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-500"
        >
          Suspend User
        </Button>
        <Button
          className="flex-1 bg-primary-blue hover:bg-secondary-blue text-white"
        >
          Edit Details
        </Button>
      </div>
    </div>
  )
} 