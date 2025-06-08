'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, MapPin, Clock, Calendar } from 'lucide-react'
import Header from '@/components/layout/Header'

// Mock order data - In a real app, this would come from an API or state management
const order = {
  id: 'ORD123456',
  date: new Date().toISOString(),
  status: 'confirmed',
  estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(), // 45 minutes from now
  address: '123 Main St, Apt 4B, New York, NY 10001',
  vendor: {
    name: 'Sample Vendor',
    section: 'restaurant'
  },
  items: [
    {
      name: 'Sample Item 1',
      quantity: 2,
      price: 19.99
    },
    {
      name: 'Sample Item 2',
      quantity: 1,
      price: 24.99
    }
  ],
  subtotal: 64.97,
  deliveryFee: 4.99,
  tax: 5.20,
  total: 75.16
}

export default function OrderSuccessPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-card-background rounded-lg p-8">
          {/* Success Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              Order Confirmed!
            </h1>
            <p className="text-gray-400 text-center mt-2">
              Your order has been successfully placed
            </p>
            <div className="text-primary-blue font-medium mt-2">
              Order #{order.id}
            </div>
          </div>

          {/* Order Status */}
          <div className="space-y-6">
            <div className="p-6 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-medium text-white mb-4">
                Delivery Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-primary-blue mt-1" />
                  <div>
                    <div className="text-white font-medium">
                      {formatDate(order.date)}
                    </div>
                    <div className="text-gray-400">Order Date</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary-blue mt-1" />
                  <div>
                    <div className="text-white font-medium">
                      {formatDate(order.estimatedDelivery)}
                    </div>
                    <div className="text-gray-400">Estimated Delivery</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary-blue mt-1" />
                  <div>
                    <div className="text-white font-medium">
                      Delivery Address
                    </div>
                    <div className="text-gray-400">{order.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-medium text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="text-gray-400">
                      {item.quantity}x {item.name}
                    </div>
                    <div className="text-white">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-800 pt-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Delivery Fee</span>
                      <span>{formatPrice(order.deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax</span>
                      <span>{formatPrice(order.tax)}</span>
                    </div>
                    <div className="flex justify-between text-white font-medium pt-2 border-t border-gray-800">
                      <span>Total</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex-1 py-3 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => {
                  // In a real app, this would download a PDF receipt
                  console.log('Download receipt')
                }}
                className="flex-1 py-3 px-4 bg-primary-blue text-white rounded-lg font-medium hover:bg-secondary-blue transition-colors"
              >
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 