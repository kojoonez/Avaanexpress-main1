'use client'

import { useState, useEffect } from 'react'
import AdminDashboardNav from '@/components/AdminDashboardNav'
import { Store, Building2, MapPin, Phone, Mail, AlertCircle } from 'lucide-react'

interface StoreData {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: 'pending' | 'active' | 'suspended'
  registrationDate: string
  totalOrders: number
  rating: number
  cuisine: string[]
}

export default function StoresManagement() {
  const [stores, setStores] = useState<StoreData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const [newStore, setNewStore] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cuisine: '',
    password: ''
  })

  useEffect(() => {
    // Simulated data - replace with actual API call
    const mockStores: StoreData[] = [
      {
        id: '1',
        name: 'Pizza Palace',
        email: 'info@pizzapalace.com',
        phone: '+358 40 1234567',
        address: 'Mannerheimintie 50, Helsinki',
        status: 'active',
        registrationDate: '2024-01-15',
        totalOrders: 1250,
        rating: 4.5,
        cuisine: ['Italian', 'Pizza']
      },
      {
        id: '2',
        name: 'Sushi Master',
        email: 'contact@sushimaster.fi',
        phone: '+358 40 9876543',
        address: 'Fredrikinkatu 30, Helsinki',
        status: 'active',
        registrationDate: '2024-02-01',
        totalOrders: 890,
        rating: 4.8,
        cuisine: ['Japanese', 'Sushi']
      },
      {
        id: '3',
        name: 'Burger Bros',
        email: 'hello@burgerbros.fi',
        phone: '+358 40 5555555',
        address: 'Hämeentie 15, Helsinki',
        status: 'pending',
        registrationDate: '2024-03-10',
        totalOrders: 0,
        rating: 0,
        cuisine: ['American', 'Burgers']
      }
    ]

    setStores(mockStores)
    setIsLoading(false)
  }, [])

  const handleAddStore = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Here you would make an API call to create the store
      const newStoreData: StoreData = {
        id: Date.now().toString(),
        ...newStore,
        status: 'pending',
        registrationDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        rating: 0,
        cuisine: newStore.cuisine.split(',').map(c => c.trim())
      }

      setStores(prev => [...prev, newStoreData])
      setShowAddForm(false)
      setNewStore({
        name: '',
        email: '',
        phone: '',
        address: '',
        cuisine: '',
        password: ''
      })
    } catch (error) {
      console.error('Failed to add store:', error)
    }
  }

  const handleStatusChange = async (storeId: string, newStatus: 'active' | 'suspended' | 'pending') => {
    // Here you would make an API call to update the store status
    setStores(prev =>
      prev.map(store =>
        store.id === storeId ? { ...store, status: newStatus } : store
      )
    )
  }

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || store.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminDashboardNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Store Management</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            >
              <Store className="w-5 h-5 mr-2" />
              Add New Store
            </button>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-black"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-black"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Stores Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Store Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStores.map((store) => (
                  <tr key={store.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <Building2 className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                        <div>
                          <div className="font-medium text-gray-900">{store.name}</div>
                          <div className="text-sm text-gray-500">
                            Registered: {new Date(store.registrationDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            Cuisine: {store.cuisine.join(', ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="w-4 h-4 mr-2" />
                          {store.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-4 h-4 mr-2" />
                          {store.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          {store.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={store.status}
                        onChange={(e) => handleStatusChange(store.id, e.target.value as any)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          store.status === 'active' ? 'bg-green-100 text-green-800' :
                          store.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          Orders: {store.totalOrders}
                        </div>
                        <div className="text-sm text-gray-900">
                          Rating: {store.rating > 0 ? `${store.rating}/5` : 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary-blue hover:text-blue-600 font-medium">
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

      {/* Add Store Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Store</h2>
            <form onSubmit={handleAddStore} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                <input
                  type="text"
                  value={newStore.name}
                  onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newStore.email}
                  onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={newStore.phone}
                  onChange={(e) => setNewStore({ ...newStore, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={newStore.address}
                  onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cuisine Types</label>
                <input
                  type="text"
                  value={newStore.cuisine}
                  onChange={(e) => setNewStore({ ...newStore, cuisine: e.target.value })}
                  placeholder="Italian, Pizza, etc. (comma separated)"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={newStore.password}
                  onChange={(e) => setNewStore({ ...newStore, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600"
                >
                  Add Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 