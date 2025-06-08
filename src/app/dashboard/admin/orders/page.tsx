'use client'

import { useState, useEffect } from 'react'
import AdminDashboardNav from '@/components/AdminDashboardNav'
import { ShoppingBag, Store, User, Car, Clock, MapPin, CreditCard } from 'lucide-react'

interface OrderData {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'preparing' | 'ready' | 'picked_up' | 'delivering' | 'delivered' | 'cancelled'
  customer: {
    id: string
    name: string
    phone: string
    address: string
  }
  store: {
    id: string
    name: string
    address: string
  }
  driver?: {
    id: string
    name: string
    phone: string
  }
  items: {
    name: string
    quantity: number
    price: number
  }[]
  subtotal: number
  deliveryFee: number
  tip: number
  total: number
  paymentMethod: string
  estimatedDeliveryTime?: string
  specialInstructions?: string
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<OrderData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    // Simulated data - replace with actual API call
    const mockOrders: OrderData[] = [
      {
        id: '1',
        orderNumber: 'AV-2024-001',
        date: '2024-03-15T12:30:00',
        status: 'delivering',
        customer: {
          id: '1',
          name: 'Emma Virtanen',
          phone: '+358 40 1234567',
          address: 'Aleksanterinkatu 15, Helsinki'
        },
        store: {
          id: '1',
          name: 'Sushi Master',
          address: 'Fredrikinkatu 30, Helsinki'
        },
        driver: {
          id: '1',
          name: 'John Smith',
          phone: '+358 40 1234567'
        },
        items: [
          {
            name: 'Salmon Roll',
            quantity: 2,
            price: 12.90
          },
          {
            name: 'Miso Soup',
            quantity: 1,
            price: 4.50
          }
        ],
        subtotal: 30.30,
        deliveryFee: 4.90,
        tip: 2.00,
        total: 37.20,
        paymentMethod: 'Credit Card',
        estimatedDeliveryTime: '2024-03-15T13:00:00',
        specialInstructions: 'Please ring the doorbell twice'
      },
      {
        id: '2',
        orderNumber: 'AV-2024-002',
        date: '2024-03-15T12:45:00',
        status: 'preparing',
        customer: {
          id: '2',
          name: 'Mikko Korhonen',
          phone: '+358 40 9876543',
          address: 'Ruoholahdenkatu 23, Helsinki'
        },
        store: {
          id: '2',
          name: 'Burger Bros',
          address: 'Hämeentie 15, Helsinki'
        },
        items: [
          {
            name: 'Classic Burger',
            quantity: 1,
            price: 15.90
          },
          {
            name: 'Sweet Potato Fries',
            quantity: 1,
            price: 5.90
          }
        ],
        subtotal: 21.80,
        deliveryFee: 4.90,
        tip: 0,
        total: 26.70,
        paymentMethod: 'MobilePay'
      },
      {
        id: '3',
        orderNumber: 'AV-2024-003',
        date: '2024-03-15T12:15:00',
        status: 'delivered',
        customer: {
          id: '3',
          name: 'Sofia Nieminen',
          phone: '+358 40 5555555',
          address: 'Tehtaankatu 8, Helsinki'
        },
        store: {
          id: '3',
          name: 'Pizza Palace',
          address: 'Mannerheimintie 50, Helsinki'
        },
        driver: {
          id: '2',
          name: 'Maria Garcia',
          phone: '+358 40 9876543'
        },
        items: [
          {
            name: 'Margherita Pizza',
            quantity: 1,
            price: 14.90
          },
          {
            name: 'Garlic Bread',
            quantity: 1,
            price: 4.90
          }
        ],
        subtotal: 19.80,
        deliveryFee: 4.90,
        tip: 3.00,
        total: 27.70,
        paymentMethod: 'Credit Card'
      }
    ]

    setOrders(mockOrders)
    setIsLoading(false)
  }, [])

  const handleStatusChange = async (orderId: string, newStatus: OrderData['status']) => {
    // Here you would make an API call to update the order status
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  const getStatusColor = (status: OrderData['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      case 'preparing':
        return 'bg-blue-100 text-blue-800'
      case 'ready':
        return 'bg-yellow-100 text-yellow-800'
      case 'picked_up':
        return 'bg-indigo-100 text-indigo-800'
      case 'delivering':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const sortOrders = (a: OrderData, b: OrderData) => {
    switch (sortBy) {
      case 'date':
        return sortOrder === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'total':
        return sortOrder === 'desc'
          ? b.total - a.total
          : a.total - b.total
      default:
        return 0
    }
  }

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.store.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort(sortOrders)

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminDashboardNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Total Orders: {orders.length} | Active: {orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length}
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search orders..."
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
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="picked_up">Picked Up</option>
              <option value="delivering">Delivering</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-black"
            >
              <option value="date">Sort by Date</option>
              <option value="total">Sort by Total</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer & Store
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items & Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <ShoppingBag className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                        <div>
                          <div className="font-medium text-gray-900">{order.orderNumber}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleString()}
                          </div>
                          {order.estimatedDeliveryTime && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              Est: {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center text-sm font-medium text-gray-900">
                            <User className="w-4 h-4 mr-2" />
                            {order.customer.name}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-2" />
                            {order.customer.address}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-sm font-medium text-gray-900">
                            <Store className="w-4 h-4 mr-2" />
                            {order.store.name}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-2" />
                            {order.store.address}
                          </div>
                        </div>
                        {order.driver && (
                          <div>
                            <div className="flex items-center text-sm font-medium text-gray-900">
                              <Car className="w-4 h-4 mr-2" />
                              {order.driver.name}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-900">
                          {order.items.map((item, index) => (
                            <div key={index}>
                              {item.quantity}x {item.name} (€{item.price.toFixed(2)})
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-2 space-y-1">
                          <div className="text-sm text-gray-500">
                            Subtotal: €{order.subtotal.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Delivery: €{order.deliveryFee.toFixed(2)}
                          </div>
                          {order.tip > 0 && (
                            <div className="text-sm text-gray-500">
                              Tip: €{order.tip.toFixed(2)}
                            </div>
                          )}
                          <div className="text-sm font-medium text-gray-900">
                            Total: €{order.total.toFixed(2)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <CreditCard className="w-4 h-4 mr-2" />
                            {order.paymentMethod}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="picked_up">Picked Up</option>
                        <option value="delivering">Delivering</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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