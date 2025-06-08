'use client'

import { useState } from 'react'
import { Package, User, Store, MapPin, Clock, CreditCard, MessageCircle, Send, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AssignRiderModal } from './AssignRiderModal'
import { DeliveryMap } from '@/components/maps/DeliveryMap'

interface Message {
  id: string
  sender: string
  role: 'customer' | 'rider' | 'restaurant' | 'admin'
  message: string
  timestamp: string
}

interface OrderDetailsExpandedProps {
  orderId: string
  onClose?: () => void
}

export function OrderDetailsExpanded({ orderId, onClose }: OrderDetailsExpandedProps) {
  const [activeChat, setActiveChat] = useState<'customer' | 'rider' | 'restaurant' | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [showAssignRider, setShowAssignRider] = useState(false)

  // This would fetch order details from an API in production
  const orderDetails = {
    id: orderId,
    status: 'In Progress',
    customer: {
      id: 'CUST001',
      name: 'John Doe',
      address: '123 Main St, City',
      phone: '+1234567890',
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: '123 Main St, City'
      }
    },
    restaurant: {
      id: 'REST001',
      name: 'Burger Palace',
      address: '456 Food St, City',
      phone: '+1987654321',
      location: {
        lat: 40.7580,
        lng: -73.9855,
        address: '456 Food St, City'
      }
    },
    rider: {
      id: 'RIDER001',
      name: 'Mike Smith',
      phone: '+1122334455',
      rating: 4.8,
      totalDeliveries: 156,
      location: {
        lat: 40.7300,
        lng: -73.9950,
        address: '789 Delivery St'
      }
    },
    items: [
      { name: 'Cheeseburger', quantity: 2, price: '$12.99' },
      { name: 'Fries', quantity: 1, price: '$4.99' },
      { name: 'Soda', quantity: 2, price: '$3.99' }
    ],
    total: '$25.99',
    createdAt: '2024-05-24 10:30 AM',
    estimatedDelivery: '2024-05-24 11:15 AM',
    paymentMethod: 'Credit Card',
    specialInstructions: 'Please include extra napkins'
  }

  // Mock chat messages
  const messages: Message[] = [
    {
      id: '1',
      sender: 'John Doe',
      role: 'customer',
      message: 'Is my order on the way?',
      timestamp: '10:45 AM'
    },
    {
      id: '2',
      sender: 'Mike Smith',
      role: 'rider',
      message: 'Yes, I\'m 10 minutes away',
      timestamp: '10:46 AM'
    }
  ]

  const handleAssignRider = (riderId: string) => {
    // Here you would make an API call to assign the rider
    console.log(`Assigning rider ${riderId} to order ${orderId}`)
    setShowAssignRider(false)
    // You would then update the order details to reflect the new rider
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card-background rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">Order #{orderDetails.id}</h2>
              <p className="text-gray-400">{orderDetails.createdAt}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                orderDetails.status === 'Delivered' ? 'bg-green-500/20 text-green-500' :
                orderDetails.status === 'Cancelled' ? 'bg-red-500/20 text-red-500' :
                'bg-yellow-500/20 text-yellow-500'
              }`}>
                {orderDetails.status}
              </span>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Map */}
              <div className="bg-gray-800/50 rounded-lg overflow-hidden">
                <DeliveryMap
                  customerLocation={orderDetails.customer.location}
                  restaurantLocation={orderDetails.restaurant.location}
                  riderLocation={orderDetails.rider?.location}
                  className="h-[300px]"
                />
              </div>

              {/* Order Details */}
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-white">Delivery Details</h3>
                    <p className="text-sm text-gray-400">Estimated delivery: {orderDetails.estimatedDelivery}</p>
                    <p className="text-sm text-gray-400">Special instructions: {orderDetails.specialInstructions}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-white">Customer</h3>
                    <p className="text-sm text-gray-400">{orderDetails.customer.name}</p>
                    <p className="text-sm text-gray-400">{orderDetails.customer.phone}</p>
                    <p className="text-sm text-gray-400">{orderDetails.customer.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Store className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-white">Restaurant</h3>
                    <p className="text-sm text-gray-400">{orderDetails.restaurant.name}</p>
                    <p className="text-sm text-gray-400">{orderDetails.restaurant.phone}</p>
                    <p className="text-sm text-gray-400">{orderDetails.restaurant.address}</p>
                  </div>
                </div>

                {orderDetails.rider && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <h3 className="font-medium text-white">Delivery Rider</h3>
                      <p className="text-sm text-gray-400">{orderDetails.rider.name}</p>
                      <p className="text-sm text-gray-400">{orderDetails.rider.phone}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-400">
                          {orderDetails.rider.rating} ({orderDetails.rider.totalDeliveries} deliveries)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Order Items</h3>
                <div className="space-y-2">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-white">{item.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-700 pt-2 mt-4 flex justify-between font-medium">
                    <span className="text-white">Total</span>
                    <span className="text-primary-blue">{orderDetails.total}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-500"
                >
                  Cancel Order
                </Button>
                {!orderDetails.rider && (
                  <Button
                    onClick={() => setShowAssignRider(true)}
                    className="flex-1 bg-primary-blue hover:bg-secondary-blue text-white"
                  >
                    Assign Rider
                  </Button>
                )}
              </div>
            </div>

            {/* Chat Section */}
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Communication</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveChat('customer')}
                    className={`w-full p-3 rounded-lg flex items-center gap-3 ${
                      activeChat === 'customer' ? 'bg-primary-blue text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat with Customer</span>
                  </button>
                  <button
                    onClick={() => setActiveChat('rider')}
                    className={`w-full p-3 rounded-lg flex items-center gap-3 ${
                      activeChat === 'rider' ? 'bg-primary-blue text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat with Rider</span>
                  </button>
                  <button
                    onClick={() => setActiveChat('restaurant')}
                    className={`w-full p-3 rounded-lg flex items-center gap-3 ${
                      activeChat === 'restaurant' ? 'bg-primary-blue text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat with Restaurant</span>
                  </button>
                </div>
              </div>

              {activeChat && (
                <div className="bg-gray-800/50 rounded-lg p-4 h-[400px] flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-white">
                      Chat with {
                        activeChat === 'customer' ? 'Customer' :
                        activeChat === 'rider' ? 'Rider' : 'Restaurant'
                      }
                    </h3>
                    <button
                      onClick={() => setActiveChat(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex flex-col ${
                          message.role === 'admin' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'admin'
                            ? 'bg-primary-blue text-white'
                            : 'bg-gray-700 text-gray-200'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                        </div>
                        <span className="text-xs text-gray-400 mt-1">
                          {message.sender} • {message.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue"
                    />
                    <Button
                      onClick={() => {
                        // Send message
                        setMessageInput('')
                      }}
                      className="bg-primary-blue hover:bg-secondary-blue text-white px-4"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Assign Rider Modal */}
      {showAssignRider && (
        <AssignRiderModal
          orderId={orderId}
          onClose={() => setShowAssignRider(false)}
          onAssign={handleAssignRider}
        />
      )}
    </div>
  )
} 