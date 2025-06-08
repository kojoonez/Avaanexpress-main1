'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { CreditCard } from 'lucide-react'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import LocationInput from '@/components/features/delivery/LocationInput'
import PackageDetails from '@/components/features/delivery/PackageDetails'
import DeliveryScheduler from '@/components/features/delivery/DeliveryScheduler'

// Dynamically import MapView to avoid SSR issues
const MapView = dynamic(() => import('@/components/features/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-card-background animate-pulse rounded-lg" />
  ),
})

export default function OrderDeliveryPage() {
  const [pickupAddress, setPickupAddress] = useState('')
  const [dropoffAddress, setDropoffAddress] = useState('')
  const [packageSize, setPackageSize] = useState('small')
  const [packageWeight, setPackageWeight] = useState('')
  const [instructions, setInstructions] = useState('')
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(new Date())
  const [price] = useState('$25.00') // In a real app, this would be calculated based on distance and package details

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement order submission
    console.log({
      pickupAddress,
      dropoffAddress,
      packageSize,
      packageWeight,
      instructions,
      deliveryDate,
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <div className="ml-64 pt-[60px]">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div>
              <h1 className="text-2xl font-bold mb-6">Order a Delivery Driver</h1>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <LocationInput
                    label="Pickup Location"
                    placeholder="Enter pickup address"
                    value={pickupAddress}
                    onChange={setPickupAddress}
                  />
                  <LocationInput
                    label="Dropoff Location"
                    placeholder="Enter dropoff address"
                    value={dropoffAddress}
                    onChange={setDropoffAddress}
                  />
                </div>

                <PackageDetails
                  size={packageSize}
                  weight={packageWeight}
                  instructions={instructions}
                  onSizeChange={setPackageSize}
                  onWeightChange={setPackageWeight}
                  onInstructionsChange={setInstructions}
                />

                <DeliveryScheduler
                  selectedDate={deliveryDate}
                  onDateChange={setDeliveryDate}
                />

                {/* Price and Payment */}
                <div className="bg-card-background rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Delivery Fee</span>
                    <span className="text-2xl font-bold">{price}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-blue hover:bg-secondary-blue text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard size={20} />
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>

            {/* Map Section */}
            <div className="lg:sticky lg:top-[76px]">
              <div className="bg-card-background rounded-lg border border-gray-800 p-4">
                <MapView />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 