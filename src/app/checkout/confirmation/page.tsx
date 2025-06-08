'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CartSummary from '@/components/features/checkout/CartSummary'

export default function OrderConfirmationPage() {
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    // In a real application, you would fetch the order details from your backend
    // For demo purposes, we'll get it from localStorage
    const orderData = localStorage.getItem('lastOrder')
    if (!orderData) {
      router.push('/restaurants')
      return
    }
    setOrderDetails(JSON.parse(orderData))
  }, [router])

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-lg text-gray-600">
              Thank you for your order. We'll send you updates about your delivery.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {orderDetails.deliveryAddress.streetAddress}
                    {orderDetails.deliveryAddress.apartment && `, ${orderDetails.deliveryAddress.apartment}`}<br />
                    {orderDetails.deliveryAddress.city}, {orderDetails.deliveryAddress.postalCode}
                  </p>
                  {orderDetails.deliveryAddress.instructions && (
                    <p className="mt-1 text-sm text-gray-500">
                      Instructions: {orderDetails.deliveryAddress.instructions}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Estimated Delivery Time</h3>
                  <p className="mt-1 text-sm text-gray-900">30-45 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <CartSummary
            items={orderDetails.items}
            deliveryFee={orderDetails.deliveryFee}
            showImages={false}
          />

          {/* Actions */}
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/restaurants"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
            >
              Order More Food
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
            >
              View Order History
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 