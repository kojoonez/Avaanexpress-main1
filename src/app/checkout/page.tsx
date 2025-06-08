'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import authService from '@/services/auth'
import AuthModal from '@/components/AuthModal'

export default function CheckoutPage() {
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load cart data from localStorage
    const loadCart = () => {
      const cartData = localStorage.getItem('cart')
      if (cartData) {
        const cart = JSON.parse(cartData)
        const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
        setCartTotal(total)
      }
    }

    // Check authentication status
    const checkAuth = () => {
      const isAuthenticated = authService.isAuthenticated()
      if (!isAuthenticated) {
        setShowAuthModal(true)
      }
    }

    loadCart()
    checkAuth()
    setIsLoading(false)
  }, [])

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    // Continue with checkout process
    // You would typically redirect to the payment page or show the next step
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
          
          {/* Cart Summary */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            {/* Add cart items here */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-base font-medium text-gray-900">€{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Address</h2>
            {/* Add address form or selection here */}
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
            {/* Add payment method selection here */}
          </div>

          {/* Place Order Button */}
          <button
            onClick={() => !authService.isAuthenticated() && setShowAuthModal(true)}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
          >
            Place Order
          </button>
        </div>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        cartTotal={cartTotal}
      />
    </div>
  )
} 