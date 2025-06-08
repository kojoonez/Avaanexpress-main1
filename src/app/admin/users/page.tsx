'use client'

import { useState } from 'react'
import { DataTable } from '@/components/admin/DataTable'
import { UserDetails } from '@/components/admin/UserDetails'

const columns = [
  { id: 'id', header: 'User ID', width: 130 },
  { id: 'name', header: 'Name', width: 180 },
  { id: 'email', header: 'Email', width: 200 },
  { id: 'role', header: 'Role', width: 130 },
  { id: 'status', header: 'Status', width: 130 },
  { id: 'createdAt', header: 'Created At', width: 180 },
]

const mockUsers = [
  {
    id: 'USR001',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Customer',
    status: 'Active',
    createdAt: '2024-05-24',
  },
  // Add more mock users as needed
]

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search users..."
            className="px-4 py-2 rounded-lg bg-card-background text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
          />
          <select className="px-4 py-2 rounded-lg bg-card-background text-white border border-gray-700 focus:outline-none focus:border-primary-blue">
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="rider">Rider</option>
            <option value="restaurant">Restaurant</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable
            columns={columns}
            data={mockUsers}
            onRowClick={(id: string) => setSelectedUser(id)}
          />
        </div>
        <div className="bg-card-background rounded-lg p-4">
          {selectedUser ? (
            <UserDetails userId={selectedUser} />
          ) : (
            <div className="text-gray-400 text-center py-8">
              Select a user to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 