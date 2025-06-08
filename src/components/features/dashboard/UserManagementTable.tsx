'use client'

import { MoreVertical, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Customer',
    status: 'Active',
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Driver',
    status: 'Active',
    lastActive: '5 mins ago'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Store Owner',
    status: 'Inactive',
    lastActive: '1 day ago'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: 'Just now'
  }
]

export default function UserManagementTable() {
  return (
    <div className="bg-card-background rounded-lg border border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-semibold">User Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-4 text-sm font-medium text-gray-400">Name</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Email</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Role</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Last Active</th>
              <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-800 last:border-0">
                <td className="p-4">
                  <div className="font-medium">{user.name}</div>
                </td>
                <td className="p-4 text-gray-400">{user.email}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm">
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {user.status === 'Active' ? (
                      <>
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-green-500">Active</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="text-red-500" />
                        <span className="text-red-500">Inactive</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="p-4 text-gray-400">{user.lastActive}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <Edit size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <Trash2 size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 