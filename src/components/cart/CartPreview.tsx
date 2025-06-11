'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function CartPreview() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const {
    items = [],
    currentVendor,
    itemCount = 0,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDeliveryFee,
    getTax,
    getTotal
  } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (itemCount === 0) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-white hover:text-primary-blue transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-white hover:text-primary-blue transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Panel */}
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-card-background z-50 shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-lg font-medium text-white">Your Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Vendor Info */}
              {currentVendor && (
                <div className="p-4 bg-gray-900">
                  <div className="text-white font-medium">
                    {currentVendor.name}
                  </div>
                  <div className="text-sm text-gray-400 capitalize">
                    {currentVendor.section.replace('-', ' ')}
                  </div>
                </div>
              )}

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-gray-900 rounded-lg"
                    >
                      {item.image && (
                        <div className="relative w-20 h-20">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="text-white font-medium">
                            {item.name}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {item.options && item.options.length > 0 && (
                          <div className="mt-1 text-sm text-gray-400">
                            {item.options.map((opt) => (
                              <div key={opt.name}>
                                {opt.name}: {opt.value}
                                {opt.price ? ` (+${formatPrice(opt.price)})` : ''}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-primary-blue">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 border-t border-gray-800">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery Fee</span>
                    <span>{formatPrice(getDeliveryFee())}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span>{formatPrice(getTax())}</span>
                  </div>
                  <div className="flex justify-between text-white font-medium pt-2 border-t border-gray-800">
                    <span>Total</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsOpen(false)
                    router.push('/checkout')
                  }}
                  className="w-full mt-4 py-3 px-4 bg-primary-blue text-white rounded-lg font-medium hover:bg-secondary-blue transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 