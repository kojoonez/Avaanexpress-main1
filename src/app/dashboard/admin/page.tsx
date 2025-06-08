'use client'

import { useState } from 'react'
import AdminDashboardNav from '@/components/AdminDashboardNav'

interface Store {
  id: number
  name: string
  email: string
  status: 'pending' | 'active' | 'suspended'
  registrationDate: string
}

export default function AdminDashboard() {
  const [stores, setStores] = useState<Store[]>([])
  const [showStoreForm, setShowStoreForm] = useState(false)
  const [newStore, setNewStore] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  })

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to create the store
    // For now, we'll just add it to the local state
    const store: Store = {
      id: stores.length + 1,
      name: newStore.name,
      email: newStore.email,
      status: 'pending',
      registrationDate: new Date().toISOString()
    }
    setStores([...stores, store])
    setShowStoreForm(false)
    setNewStore({ name: '', email: '', password: '', address: '', phone: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminDashboardNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Store Management</h1>
            <button
              onClick={() => setShowStoreForm(true)}
              className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add New Store
            </button>
          </div>

          {showStoreForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Create New Store</h2>
                <form onSubmit={handleCreateStore} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Store Name</label>
                    <input
                      type="text"
                      value={newStore.name}
                      onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={newStore.email}
                      onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={newStore.password}
                      onChange={(e) => setNewStore({ ...newStore, password: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      value={newStore.address}
                      onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={newStore.phone}
                      onChange={(e) => setNewStore({ ...newStore, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowStoreForm(false)}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Create Store
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Store Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stores.map((store) => (
                  <tr key={store.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{store.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        store.status === 'active' ? 'bg-green-100 text-green-800' :
                        store.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {store.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(store.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-primary-blue hover:text-blue-600">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
} 