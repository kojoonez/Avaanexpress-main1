'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, Minus, Trash2 } from 'lucide-react'
import Header from '@/components/layout/Header'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const router = useRouter()
  const { state, removeItem, updateQuantity, getSubtotal } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const deliveryFee = 2.99
  const total = getSubtotal() + deliveryFee

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">Add items from restaurants to start your order</p>
            <button
              onClick={() => router.push('/restaurants')}
              className="px-6 py-3 bg-primary-blue hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-white mb-6">Your Cart</h1>
            <div className="space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-card-background rounded-lg border border-gray-800"
                >
                  {item.image && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{item.name}</h3>
                    {item.options && Object.entries(item.options).length > 0 && (
                      <p className="text-sm text-gray-400 mb-2">
                        {Object.entries(item.options)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(' • ')}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-primary-blue">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-4">
            <div className="bg-card-background rounded-lg border border-gray-800 p-6">
              <h2 className="text-lg font-medium text-white mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-800 pt-2 mt-2">
                  <div className="flex justify-between text-white font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-3 bg-primary-blue hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 