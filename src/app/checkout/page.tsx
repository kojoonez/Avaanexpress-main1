'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { MapPin, Clock, CreditCard } from 'lucide-react'
import Header from '@/components/layout/Header'
import { useCart } from '@/contexts/CartContext'

interface CheckoutFormData {
  // Delivery Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  deliveryInstructions?: string

  // Payment Information
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const {
    items,
    currentVendor,
    getSubtotal,
    getDeliveryFee,
    getTax,
    getTotal,
    clearCart
  } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckoutFormData>()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true)

    try {
      // In a real app, this would make an API call to process the payment and create the order
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call

      // Clear cart and redirect to success page
      clearCart()
      router.push('/checkout/success')
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Delivery Information */}
              <div className="bg-card-background rounded-lg p-6">
                <h2 className="text-xl font-medium text-white mb-6">
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      {...register('address', { required: 'Address is required' })}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.address && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      {...register('apartment')}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      {...register('city', { required: 'City is required' })}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.city && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.city.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      {...register('state', { required: 'State is required' })}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.state && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.state.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      {...register('zipCode', {
                        required: 'ZIP code is required',
                        pattern: {
                          value: /^\d{5}(-\d{4})?$/,
                          message: 'Invalid ZIP code'
                        }
                      })}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.zipCode && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.zipCode.message}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">
                      Delivery Instructions (optional)
                    </label>
                    <textarea
                      {...register('deliveryInstructions')}
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card-background rounded-lg p-6">
                <h2 className="text-xl font-medium text-white mb-6">
                  Payment Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      {...register('cardNumber', {
                        required: 'Card number is required',
                        pattern: {
                          value: /^\d{16}$/,
                          message: 'Invalid card number'
                        }
                      })}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.cardNumber && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.cardNumber.message}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      {...register('cardName', { required: 'Name on card is required' })}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.cardName && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.cardName.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      {...register('expiryDate', {
                        required: 'Expiry date is required',
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                          message: 'Invalid expiry date (MM/YY)'
                        }
                      })}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.expiryDate && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.expiryDate.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      {...register('cvv', {
                        required: 'CVV is required',
                        pattern: {
                          value: /^\d{3,4}$/,
                          message: 'Invalid CVV'
                        }
                      })}
                      placeholder="123"
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    {errors.cvv && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.cvv.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-card-background rounded-lg p-6">
              <h2 className="text-xl font-medium text-white mb-6">
                Order Summary
              </h2>

              {/* Vendor Info */}
              {currentVendor && (
                <div className="flex items-start gap-4 p-4 bg-gray-900 rounded-lg mb-6">
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      {currentVendor.name}
                    </div>
                    <div className="text-sm text-gray-400 capitalize">
                      {currentVendor.section.replace('-', ' ')}
                    </div>
                  </div>
                </div>
              )}

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-900 rounded-lg"
                  >
                    {item.image && (
                      <div className="relative w-16 h-16">
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
                        <div>
                          <div className="text-white font-medium">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            Qty: {item.quantity}
                          </div>
                        </div>
                        <div className="text-primary-blue">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
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
                onClick={handleSubmit(onSubmit)}
                disabled={isProcessing}
                className="w-full mt-6 py-3 px-4 bg-primary-blue text-white rounded-lg font-medium hover:bg-secondary-blue transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Pay ${formatPrice(getTotal())}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 