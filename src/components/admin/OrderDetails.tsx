'use client'

import { Package, User, Store, MapPin, Clock, CreditCard } from 'lucide-react'

interface OrderDetailsProps {
  orderId: string
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
  // This would fetch order details from an API in production
  const orderDetails = {
    id: orderId,
    customer: {
      name: 'John Doe',
      address: '123 Main St, City',
      phone: '+1234567890'
    },
    restaurant: {
      name: 'Burger Palace',
      address: '456 Food St, City'
    },
    items: [
      { name: 'Cheeseburger', quantity: 2, price: '$12.99' },
      { name: 'Fries', quantity: 1, price: '$4.99' },
      { name: 'Soda', quantity: 2, price: '$3.99' }
    ],
    status: 'Delivered',
    total: '$25.99',
    createdAt: '2024-05-24 10:30 AM',
    paymentMethod: 'Credit Card'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Order Details</h2>
        <span className={`px-3 py-1 rounded-full text-sm ${
          orderDetails.status === 'Delivered' ? 'bg-green-500/20 text-green-500' :
          orderDetails.status === 'Cancelled' ? 'bg-red-500/20 text-red-500' :
          'bg-yellow-500/20 text-yellow-500'
        }`}>
          {orderDetails.status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Package className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-white">Order #{orderDetails.id}</h3>
            <p className="text-sm text-gray-400">{orderDetails.createdAt}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-white">{orderDetails.customer.name}</h3>
            <p className="text-sm text-gray-400">{orderDetails.customer.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Store className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-white">{orderDetails.restaurant.name}</h3>
            <p className="text-sm text-gray-400">{orderDetails.restaurant.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-white">Delivery Address</h3>
            <p className="text-sm text-gray-400">{orderDetails.customer.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-medium text-white">Payment Method</h3>
            <p className="text-sm text-gray-400">{orderDetails.paymentMethod}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4">
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
          <div className="border-t border-gray-800 pt-2 mt-4 flex justify-between font-medium">
            <span className="text-white">Total</span>
            <span className="text-primary-blue">{orderDetails.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 