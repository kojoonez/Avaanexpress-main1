'use client'

import { MapPin } from 'lucide-react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

interface DeliveryFormData {
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
}

interface DeliveryAddressFormProps {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
}

export default function DeliveryAddressForm({ register, errors }: DeliveryAddressFormProps) {
  return (
    <div className="bg-card-background rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="text-primary-blue" />
        <h2 className="text-xl font-medium text-white">Delivery Information</h2>
      </div>

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
              {errors.firstName.message as string}
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
              {errors.lastName.message as string}
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
              {errors.email.message as string}
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
              {errors.phone.message as string}
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
              {errors.address.message as string}
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
              {errors.city.message as string}
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
              {errors.state.message as string}
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
                value: /^[0-9]{5}(-[0-9]{4})?$/,
                message: 'Please enter a valid ZIP code'
              }
            })}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
          {errors.zipCode && (
            <span className="text-red-500 text-sm mt-1">
              {errors.zipCode.message as string}
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
            placeholder="Add any special instructions for delivery"
          />
        </div>
      </div>
    </div>
  )
} 