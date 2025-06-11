'use client'

import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { Clock, ShoppingBag } from 'lucide-react'

export default function CartSummary() {
  const { items, currentVendor, getSubtotal, getDeliveryFee, getTax, getTotal } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatSection = (section: string) => {
    return section?.replace('-', ' ') || ''
  }

  return (
    <div className="bg-card-background rounded-lg p-6">
      {/* Vendor Info */}
      {currentVendor && currentVendor.name && (
        <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-white">{currentVendor.name}</h3>
            {currentVendor.section && (
              <p className="text-sm text-gray-400 capitalize">
                {formatSection(currentVendor.section)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock size={16} />
            <span>20-30 min</span>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="py-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            {item.image && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h4 className="text-white">{item.name}</h4>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="text-white">{formatPrice(item.price * item.quantity)}</p>
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
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="pt-4 border-t border-gray-800">
        <div className="space-y-2">
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
      </div>
    </div>
  )
} 