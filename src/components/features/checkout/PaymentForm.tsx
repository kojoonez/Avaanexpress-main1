'use client'

import { useState } from 'react'
import { CreditCard, CreditCardIcon } from 'lucide-react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import Image from 'next/image'

interface PaymentFormData {
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  paymentMethod: 'card' | 'apple-pay' | 'google-pay'
}

interface PaymentFormProps {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
}

export default function PaymentForm({ register, errors }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'apple-pay' | 'google-pay'>('card')

  const handlePaymentMethodChange = (method: 'card' | 'apple-pay' | 'google-pay') => {
    setSelectedMethod(method)
    // Register the value
    register('paymentMethod').onChange({ target: { value: method } })
  }

  return (
    <div className="bg-card-background rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="text-primary-blue" />
        <h2 className="text-xl font-medium text-white">Maksutapa</h2>
      </div>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          type="button"
          onClick={() => handlePaymentMethodChange('card')}
          className={`p-4 rounded-lg border ${
            selectedMethod === 'card'
              ? 'border-primary-blue bg-primary-blue/10'
              : 'border-gray-700 hover:border-gray-600'
          } transition-colors`}
        >
          <div className="flex items-center gap-3">
            <CreditCardIcon className="w-6 h-6 text-white" />
            <span className="text-white">Luottokortti</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handlePaymentMethodChange('apple-pay')}
          className={`p-4 rounded-lg border ${
            selectedMethod === 'apple-pay'
              ? 'border-primary-blue bg-primary-blue/10'
              : 'border-gray-700 hover:border-gray-600'
          } transition-colors`}
        >
          <div className="flex items-center justify-center">
            <Image
              src="/apple-pay.svg"
              alt="Apple Pay"
              width={64}
              height={24}
              className="h-6 w-auto"
            />
          </div>
        </button>

        <button
          type="button"
          onClick={() => handlePaymentMethodChange('google-pay')}
          className={`p-4 rounded-lg border ${
            selectedMethod === 'google-pay'
              ? 'border-primary-blue bg-primary-blue/10'
              : 'border-gray-700 hover:border-gray-600'
          } transition-colors`}
        >
          <div className="flex items-center justify-center">
            <Image
              src="/google-pay.svg"
              alt="Google Pay"
              width={64}
              height={24}
              className="h-6 w-auto"
            />
          </div>
        </button>
      </div>

      {/* Credit Card Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Kortin numero
            </label>
            <input
              type="text"
              {...register('cardNumber', {
                required: 'Kortin numero vaaditaan',
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: 'Syötä kelvollinen 16-numeroinen kortin numero'
                }
              })}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
            {errors.cardNumber && (
              <span className="text-red-500 text-sm mt-1">
                {errors.cardNumber.message as string}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Kortinhaltijan nimi
            </label>
            <input
              type="text"
              {...register('cardName', { required: 'Kortinhaltijan nimi vaaditaan' })}
              placeholder="Matti Meikäläinen"
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
            {errors.cardName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.cardName.message as string}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Voimassaoloaika
              </label>
              <input
                type="text"
                {...register('expiryDate', {
                  required: 'Voimassaoloaika vaaditaan',
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                    message: 'Syötä kelvollinen päivämäärä (KK/VV)'
                  }
                })}
                placeholder="KK/VV"
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              {errors.expiryDate && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.expiryDate.message as string}
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
                  required: 'CVV vaaditaan',
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: 'Syötä kelvollinen CVV'
                  }
                })}
                placeholder="123"
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              {errors.cvv && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.cvv.message as string}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Apple Pay Section */}
      {selectedMethod === 'apple-pay' && (
        <div className="text-center py-6">
          <button
            type="button"
            className="w-full max-w-md bg-black text-white rounded-lg py-4 px-6 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
            onClick={() => {
              // In a real app, this would trigger the Apple Pay flow
              alert('Apple Pay integration would be triggered here')
            }}
          >
            <Image
              src="/apple-pay-white.svg"
              alt="Apple Pay"
              width={64}
              height={24}
              className="h-6 w-auto"
            />
          </button>
        </div>
      )}

      {/* Google Pay Section */}
      {selectedMethod === 'google-pay' && (
        <div className="text-center py-6">
          <button
            type="button"
            className="w-full max-w-md bg-white text-black rounded-lg py-4 px-6 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
            onClick={() => {
              // In a real app, this would trigger the Google Pay flow
              alert('Google Pay integration would be triggered here')
            }}
          >
            <Image
              src="/google-pay-black.svg"
              alt="Google Pay"
              width={64}
              height={24}
              className="h-6 w-auto"
            />
          </button>
        </div>
      )}
    </div>
  )
} 