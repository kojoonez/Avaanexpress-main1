'use client'

import { useState } from 'react'
import { 
  ShoppingBag, Clock, DollarSign, Star,
  CheckCircle, XCircle, Edit, Trash2, 
  Plus, Settings, ChevronDown
} from 'lucide-react'
import DashboardHeader from './DashboardHeader'
import OrderNotifications from './OrderNotifications'
import OrderTimeline from './OrderTimeline'

// Enhanced order status types
type OrderStatus = 
  | 'new'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'picked_up'
  | 'delivered'
  | 'cancelled'

// Mock data for demonstration
const orders = [
  {
    id: 'ORD-12345',
    customer: 'John Doe',
    items: [
      { name: 'Chicken Burger', quantity: 2, price: '$12.99' },
      { name: 'French Fries', quantity: 1, price: '$4.99' }
    ],
    total: '$30.97',
    status: 'preparing' as OrderStatus,
    time: '10 mins ago',
    deliveryDriver: 'Mike Wilson',
    estimatedDeliveryTime: '11:45 AM',
    customerPhone: '+1234567890',
    deliveryAddress: '123 Main St, City'
  },
  // Add more orders...
]

// Status workflow configuration
const statusWorkflow: Record<OrderStatus, {
  label: string
  color: string
  nextStatuses: OrderStatus[]
}> = {
  new: {
    label: 'New Order',
    color: 'bg-blue-500/10 text-blue-500',
    nextStatuses: ['confirmed', 'cancelled']
  },
  confirmed: {
    label: 'Confirmed',
    color: 'bg-purple-500/10 text-purple-500',
    nextStatuses: ['preparing', 'cancelled']
  },
  preparing: {
    label: 'Preparing',
    color: 'bg-yellow-500/10 text-yellow-500',
    nextStatuses: ['ready_for_pickup', 'cancelled']
  },
  ready_for_pickup: {
    label: 'Ready for Pickup',
    color: 'bg-green-500/10 text-green-500',
    nextStatuses: ['picked_up', 'cancelled']
  },
  picked_up: {
    label: 'Picked Up',
    color: 'bg-indigo-500/10 text-indigo-500',
    nextStatuses: ['delivered', 'cancelled']
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-500/10 text-green-500',
    nextStatuses: []
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-500/10 text-red-500',
    nextStatuses: []
  }
}

const menuItems = [
  {
    id: 1,
    name: 'Chicken Burger',
    category: 'Main Course',
    price: '$12.99',
    status: 'Active',
    image: '/images/chicken-burger.jpg'
  },
  {
    id: 2,
    name: 'French Fries',
    category: 'Sides',
    price: '$4.99',
    status: 'Active',
    image: '/images/fries.jpg'
  },
  // Add more items...
]

const metrics = [
  {
    title: 'Today\'s Orders',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'bg-blue-500'
  },
  {
    title: 'Average Prep Time',
    value: '18 min',
    change: '-5%',
    trend: 'down',
    icon: Clock,
    color: 'bg-green-500'
  },
  {
    title: 'Today\'s Revenue',
    value: '$2,845',
    change: '+18%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-purple-500'
  },
  {
    title: 'Rating',
    value: '4.8',
    change: '+0.2',
    trend: 'up',
    icon: Star,
    color: 'bg-yellow-500'
  }
]

// Mock timeline data
const orderTimelines: Record<string, Array<{ status: string, timestamp: string, note?: string }>> = {
  'ORD-12345': [
    {
      status: 'Order Received',
      timestamp: '10:30 AM',
      note: 'New order placed by customer'
    },
    {
      status: 'Order Confirmed',
      timestamp: '10:32 AM',
      note: 'Restaurant accepted the order'
    },
    {
      status: 'Preparing',
      timestamp: '10:35 AM',
      note: 'Kitchen started preparing the order'
    }
  ]
}

export default function StoreDashboard() {
  const [activeTab, setActiveTab] = useState('orders')
  const [storeStatus, setStoreStatus] = useState('open')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [statusUpdateMenu, setStatusUpdateMenu] = useState<string | null>(null)

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    // In production, this would make an API call to update the order status
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
    
    // Mock update for demonstration
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    )
    
    // Close the status menu
    setStatusUpdateMenu(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Store Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Joe's Restaurant</h1>
            <p className="text-gray-400">123 Main Street, City</p>
          </div>
          
          <div className="flex items-center gap-4">
            <OrderNotifications />
            
            <button
              onClick={() => setStoreStatus(storeStatus === 'open' ? 'closed' : 'open')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                storeStatus === 'open'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {storeStatus === 'open' ? (
                <>
                  <CheckCircle size={20} />
                  Open for Orders
                </>
              ) : (
                <>
                  <XCircle size={20} />
                  Closed
                </>
              )}
            </button>
            
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Settings size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div
                key={metric.title}
                className="bg-card-background rounded-lg p-6 border border-gray-800"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${metric.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className={`flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{metric.title}</h3>
                <div className="text-2xl font-bold">{metric.value}</div>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'orders'
                ? 'bg-primary-blue text-white'
                : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            Active Orders
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'menu'
                ? 'bg-primary-blue text-white'
                : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            Menu Management
          </button>
        </div>

        {/* Content */}
        <div className="bg-card-background rounded-lg border border-gray-800">
          {activeTab === 'orders' && (
            <div>
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold">Active Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Order ID</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Customer</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Items</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Total</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Driver</th>
                      <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr 
                        key={order.id} 
                        className={`border-b border-gray-800 last:border-0 ${
                          selectedOrder === order.id ? 'bg-gray-800/50' : ''
                        }`}
                        onClick={() => setSelectedOrder(
                          selectedOrder === order.id ? null : order.id
                        )}
                      >
                        <td className="p-4">
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-gray-400">{order.time}</div>
                        </td>
                        <td className="p-4">
                          <div>{order.customer}</div>
                          <div className="text-sm text-gray-400">{order.customerPhone}</div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-sm">
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">{order.total}</td>
                        <td className="p-4">
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setStatusUpdateMenu(
                                  statusUpdateMenu === order.id ? null : order.id
                                )
                              }}
                              className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                                statusWorkflow[order.status].color
                              }`}
                            >
                              {statusWorkflow[order.status].label}
                              {statusWorkflow[order.status].nextStatuses.length > 0 && (
                                <ChevronDown size={16} />
                              )}
                            </button>

                            {statusUpdateMenu === order.id && (
                              <div className="absolute left-0 mt-2 w-48 bg-card-background rounded-lg border border-gray-800 shadow-lg z-10">
                                {statusWorkflow[order.status].nextStatuses.map((status) => (
                                  <button
                                    key={status}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleStatusUpdate(order.id, status)
                                    }}
                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg ${
                                      statusWorkflow[status].color
                                    }`}
                                  >
                                    {statusWorkflow[status].label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">{order.deliveryDriver}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="px-3 py-1 bg-primary-blue text-white rounded-lg text-sm">
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Details Expansion Panel */}
              {selectedOrder && (
                <div className="border-t border-gray-800 p-6">
                  {orders.map(order => order.id === selectedOrder && (
                    <div key={order.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Delivery Details</h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-400">Delivery Address</p>
                            <p className="font-medium">{order.deliveryAddress}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Estimated Delivery Time</p>
                            <p className="font-medium">{order.estimatedDeliveryTime}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Driver</p>
                            <p className="font-medium">{order.deliveryDriver}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Order Timeline</h3>
                        <OrderTimeline events={orderTimelines[order.id] || []} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'menu' && (
            <div>
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Menu Items</h2>
                <button className="px-4 py-2 bg-primary-blue text-white rounded-lg flex items-center gap-2">
                  <Plus size={20} />
                  Add Item
                </button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
                  >
                    <div className="aspect-video bg-gray-800">
                      {/* Image placeholder */}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="text-lg font-bold">{item.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <Edit size={16} className="text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <Trash2 size={16} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 