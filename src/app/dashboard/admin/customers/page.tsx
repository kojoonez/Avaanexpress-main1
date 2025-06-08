'use client'

import { useState, useEffect } from 'react'
import AdminDashboardNav from '@/components/AdminDashboardNav'
import { Users, User, Phone, Mail, MapPin, ShoppingBag, Star } from 'lucide-react'

interface CustomerData {
  id: string
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
  status: 'active' | 'inactive' | 'blocked'
  totalOrders: number
  totalSpent: number
  lastOrder?: {
    date: string
    amount: number
    status: string
  }
  preferences: {
    dietaryRestrictions: string[]
    favoriteStores: string[]
  }
}

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<CustomerData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    // Simulated data - replace with actual API call
    const mockCustomers: CustomerData[] = [
      {
        id: '1',
        name: 'Emma Virtanen',
        email: 'emma.v@gmail.com',
        phone: '+358 40 1234567',
        address: 'Aleksanterinkatu 15, Helsinki',
        joinDate: '2023-12-01',
        status: 'active',
        totalOrders: 25,
        totalSpent: 750.50,
        lastOrder: {
          date: '2024-03-14',
          amount: 35.90,
          status: 'delivered'
        },
        preferences: {
          dietaryRestrictions: ['Vegetarian'],
          favoriteStores: ['Sushi Master', 'Green Delight']
        }
      },
      {
        id: '2',
        name: 'Mikko Korhonen',
        email: 'mikko.k@outlook.com',
        phone: '+358 40 9876543',
        address: 'Ruoholahdenkatu 23, Helsinki',
        joinDate: '2024-01-15',
        status: 'active',
        totalOrders: 8,
        totalSpent: 245.80,
        lastOrder: {
          date: '2024-03-13',
          amount: 29.90,
          status: 'delivered'
        },
        preferences: {
          dietaryRestrictions: [],
          favoriteStores: ['Burger Bros', 'Pizza Palace']
        }
      },
      {
        id: '3',
        name: 'Sofia Nieminen',
        email: 'sofia.n@gmail.com',
        phone: '+358 40 5555555',
        address: 'Tehtaankatu 8, Helsinki',
        joinDate: '2024-02-20',
        status: 'inactive',
        totalOrders: 2,
        totalSpent: 55.80,
        lastOrder: {
          date: '2024-02-25',
          amount: 27.90,
          status: 'delivered'
        },
        preferences: {
          dietaryRestrictions: ['Gluten-free', 'Lactose-free'],
          favoriteStores: ['Health Kitchen']
        }
      }
    ]

    setCustomers(mockCustomers)
    setIsLoading(false)
  }, [])

  const handleStatusChange = async (customerId: string, newStatus: 'active' | 'inactive' | 'blocked') => {
    // Here you would make an API call to update the customer status
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === customerId ? { ...customer, status: newStatus } : customer
      )
    )
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminDashboardNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Total Customers: {customers.length} | Active: {customers.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search customers..."
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
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {/* Customers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders & Preferences
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <User className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                        <div>
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">
                            Joined: {new Date(customer.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="w-4 h-4 mr-2" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-4 h-4 mr-2" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          {customer.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={customer.status}
                        onChange={(e) => handleStatusChange(customer.id, e.target.value as any)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          customer.status === 'active' ? 'bg-green-100 text-green-800' :
                          customer.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-900">
                          <ShoppingBag className="w-4 h-4 mr-2 text-gray-400" />
                          {customer.totalOrders} orders (€{customer.totalSpent.toFixed(2)})
                        </div>
                        {customer.lastOrder && (
                          <div className="text-sm text-gray-500">
                            Last order: {new Date(customer.lastOrder.date).toLocaleDateString()} 
                            (€{customer.lastOrder.amount.toFixed(2)})
                          </div>
                        )}
                        {customer.preferences.dietaryRestrictions.length > 0 && (
                          <div className="text-sm text-gray-500">
                            Dietary: {customer.preferences.dietaryRestrictions.join(', ')}
                          </div>
                        )}
                        {customer.preferences.favoriteStores.length > 0 && (
                          <div className="text-sm text-gray-500">
                            Favorites: {customer.preferences.favoriteStores.join(', ')}
                          </div>
                        )}
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
    </div>
  )
} 