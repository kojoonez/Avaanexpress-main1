'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Header from '@/components/layout/Header'
import CartSummary from '@/components/features/checkout/CartSummary'
import DeliveryAddressForm from '@/components/features/checkout/DeliveryAddressForm'
import PaymentForm from '@/components/features/checkout/PaymentForm'
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
  paymentMethod: 'card' | 'apple-pay' | 'google-pay'
  cardNumber?: string
  cardName?: string
  expiryDate?: string
  cvv?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { items, clearCart } = useCart()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CheckoutFormData>()

  const selectedPaymentMethod = watch('paymentMethod')

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true)

    try {
      // In a real app, this would make an API call to process the payment and create the order
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call

      // Handle different payment methods
      switch (data.paymentMethod) {
        case 'apple-pay':
          // In a real app, trigger Apple Pay flow
          console.log('Processing Apple Pay payment...')
          break
        case 'google-pay':
          // In a real app, trigger Google Pay flow
          console.log('Processing Google Pay payment...')
          break
        default:
          // Process card payment
          console.log('Processing card payment...')
      }

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

  // Redirect if cart is empty
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
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <DeliveryAddressForm register={register} errors={errors} />
              <PaymentForm register={register} errors={errors} />

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-primary-blue hover:bg-secondary-blue disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                {isProcessing ? 'Käsitellään...' : 'Maksa tilaus'}
              </button>
            </form>
          </div>

          {/* Right Column - Cart Summary */}
          <div className="lg:sticky lg:top-[80px]">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
} 