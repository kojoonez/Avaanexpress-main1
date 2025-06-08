'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { CreditCard, Plus, Trash2, Smartphone } from 'lucide-react'
import Image from 'next/image'

interface PaymentMethod {
  id: string
  type: 'card' | 'apple_pay' | 'google_pay' | 'klarna' | 'mobilepay' | 'pivo'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  name?: string
}

const PAYMENT_OPTIONS = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Add a credit or debit card'
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    icon: <Image src="/icons/apple-pay.svg" alt="Apple Pay" width={24} height={24} />,
    description: 'Pay with Apple Pay'
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    icon: <Image src="/icons/google-pay.svg" alt="Google Pay" width={48} height={24} />,
    description: 'Pay with Google Pay'
  },
  {
    id: 'klarna',
    name: 'Klarna',
    icon: <Image src="/icons/klarna.svg" alt="Klarna" width={48} height={24} />,
    description: 'Pay later with Klarna'
  },
  {
    id: 'mobilepay',
    name: 'MobilePay',
    icon: <Image src="/icons/mobilepay.svg" alt="MobilePay" width={24} height={24} />,
    description: 'Pay with MobilePay (Finland)'
  },
  {
    id: 'pivo',
    name: 'Pivo',
    icon: <Image src="/icons/pivo.svg" alt="Pivo" width={24} height={24} />,
    description: 'Pay with Pivo (Finland)'
  }
]

export default function PaymentSettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    // Load existing payment methods
    const loadPaymentMethods = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/customer/payment-methods?email=${user.email}`)
        
        if (!response.ok) {
          throw new Error('Failed to load payment methods')
        }

        const data = await response.json()
        setPaymentMethods(data.paymentMethods || [])
      } catch (error) {
        console.error('Failed to load payment methods:', error)
        setMessage({ type: 'error', text: 'Failed to load payment methods' })
      } finally {
        setIsLoading(false)
      }
    }

    loadPaymentMethods()
  }, [user, router])

  const handleAddPayment = async (type: string) => {
    try {
      setIsLoading(true)
      let newPaymentMethod: PaymentMethod

      switch (type) {
        case 'card':
          const [expiryMonth, expiryYear] = newCard.expiry.split('/')
          newPaymentMethod = {
            id: Date.now().toString(),
            type: 'card',
            last4: newCard.number.slice(-4),
            brand: 'Visa', // In real app, detect card brand
            expiryMonth: parseInt(expiryMonth),
            expiryYear: parseInt(`20${expiryYear}`),
            name: newCard.name
          }
          break

        case 'apple_pay':
        case 'google_pay':
        case 'klarna':
        case 'mobilepay':
        case 'pivo':
          newPaymentMethod = {
            id: Date.now().toString(),
            type: type as PaymentMethod['type'],
            name: PAYMENT_OPTIONS.find(opt => opt.id === type)?.name
          }
          break

        default:
          throw new Error('Invalid payment method')
      }

      // Save to backend
      const response = await fetch('/api/customer/payment-methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          paymentMethod: newPaymentMethod
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save payment method')
      }

      // Update local state only after successful save
      setPaymentMethods(prev => [...prev, newPaymentMethod])
      setShowAddPayment(false)
      setSelectedMethod(null)
      setNewCard({ number: '', expiry: '', cvc: '', name: '' })
      setMessage({ type: 'success', text: 'Payment method saved successfully' })
    } catch (error) {
      console.error('Failed to save payment method:', error)
      setMessage({ type: 'error', text: 'Failed to save payment method' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemovePayment = async (id: string) => {
    try {
      setIsLoading(true)

      // Remove from backend
      const response = await fetch('/api/customer/payment-methods', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          paymentMethodId: id
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to remove payment method')
      }

      // Update local state only after successful removal
      setPaymentMethods(prev => prev.filter(method => method.id !== id))
      setMessage({ type: 'success', text: 'Payment method removed successfully' })
    } catch (error) {
      console.error('Failed to remove payment method:', error)
      setMessage({ type: 'error', text: 'Failed to remove payment method' })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    router.push('/auth/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your payment methods for orders
                </p>
              </div>
              <button
                onClick={() => router.push('/settings')}
                className="text-primary-blue hover:text-blue-700"
              >
                Back to Settings
              </button>
            </div>
          </div>

          {message.text && (
            <div
              className={`px-8 py-4 ${
                message.type === 'error'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="px-8 py-6">
            {/* Existing Payment Methods */}
            <div className="space-y-4">
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    {method.type === 'card' ? (
                      <CreditCard className="text-gray-400" />
                    ) : (
                      <Image
                        src={`/icons/${method.type}.svg`}
                        alt={method.name || ''}
                        width={24}
                        height={24}
                      />
                    )}
                    <div>
                      {method.type === 'card' ? (
                        <>
                          <p className="font-medium text-gray-900">
                            {method.brand} •••• {method.last4}
                          </p>
                          <p className="text-sm text-gray-500">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </>
                      ) : (
                        <p className="font-medium text-gray-900">{method.name}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemovePayment(method.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Payment Method */}
            {showAddPayment ? (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {PAYMENT_OPTIONS.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedMethod(option.id)}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        selectedMethod === option.id
                          ? 'border-primary-blue bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {option.icon}
                        <div>
                          <p className="font-medium text-gray-900">{option.name}</p>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedMethod === 'card' && (
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={newCard.number}
                        onChange={e => setNewCard(prev => ({ ...prev, number: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-black placeholder-gray-500"
                        maxLength={16}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={newCard.expiry}
                          onChange={e => setNewCard(prev => ({ ...prev, expiry: e.target.value }))}
                          placeholder="MM/YY"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-black placeholder-gray-500"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={newCard.cvc}
                          onChange={e => setNewCard(prev => ({ ...prev, cvc: e.target.value }))}
                          placeholder="123"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-black placeholder-gray-500"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={newCard.name}
                        onChange={e => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue text-black placeholder-gray-500"
                        required
                      />
                    </div>
                  </form>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => selectedMethod && handleAddPayment(selectedMethod)}
                    disabled={isLoading || !selectedMethod}
                    className="flex-1 bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Payment Method'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddPayment(false)
                      setSelectedMethod(null)
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddPayment(true)}
                className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus size={20} className="mr-2" />
                Add Payment Method
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 