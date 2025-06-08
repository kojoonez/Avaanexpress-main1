'use client'

import { useState, useEffect } from 'react'
import { MapPin, Package, Clock, CreditCard, Calendar, Info, Truck } from 'lucide-react'
import LocationInput from './LocationInput'
import DeliveryMap from './DeliveryMap'
import { format } from 'date-fns'

interface LocationDetails {
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
  instructions: string
}

interface PackageDetails {
  size: string
  weight: string
  description: string
  isFragile: boolean
  requiresRefrigeration: boolean
}

interface PriceBreakdown {
  basePrice: number
  distanceCharge: number
  weightCharge: number
  specialHandling: number
  total: number
}

interface DeliveryFormProps {
  initialLocation?: {
    lat: number
    lng: number
  } | null
}

export default function DeliveryForm({ initialLocation }: DeliveryFormProps) {
  const [pickup, setPickup] = useState<LocationDetails>({ 
    address: '', 
    coordinates: initialLocation || undefined,
    instructions: '' 
  })
  const [dropoff, setDropoff] = useState<LocationDetails>({ 
    address: '', 
    instructions: '' 
  })
  const [packageDetails, setPackageDetails] = useState<PackageDetails>({
    size: 'medium',
    weight: '',
    description: '',
    isFragile: false,
    requiresRefrigeration: false
  })
  const [deliveryTime, setDeliveryTime] = useState<Date>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('')
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<{
    pickup?: string
    dropoff?: string
    package?: string
    time?: string
  }>({})
  const [activeLocationSelect, setActiveLocationSelect] = useState<'pickup' | 'dropoff' | null>(null)

  // Available time slots
  const timeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00'
  ]

  // Update pickup location when initialLocation changes
  useEffect(() => {
    if (initialLocation) {
      setPickup(prev => ({
        ...prev,
        coordinates: initialLocation
      }))
    }
  }, [initialLocation])

  // Calculate price whenever relevant details change
  useEffect(() => {
    const calculatePrice = async () => {
      if (!pickup.coordinates || !dropoff.coordinates || !packageDetails.weight) {
        setPriceBreakdown(null)
        return
      }

      setIsCalculating(true)
      try {
        // Calculate distance using coordinates
        const distance = calculateDistance(
          pickup.coordinates.lat,
          pickup.coordinates.lng,
          dropoff.coordinates.lat,
          dropoff.coordinates.lng
        )

        // Base price calculation
        const basePrice = 10.00
        const distanceCharge = distance * 2.5 // $2.50 per km
        const weightCharge = parseFloat(packageDetails.weight) * 1.5 // $1.50 per kg
        const specialHandling = (packageDetails.isFragile ? 5 : 0) + 
                              (packageDetails.requiresRefrigeration ? 8 : 0)

        const total = basePrice + distanceCharge + weightCharge + specialHandling

        setPriceBreakdown({
          basePrice,
          distanceCharge,
          weightCharge,
          specialHandling,
          total
        })
      } catch (error) {
        console.error('Error calculating price:', error)
      } finally {
        setIsCalculating(false)
      }
    }

    calculatePrice()
  }, [pickup.coordinates, dropoff.coordinates, packageDetails])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return Math.round((R * c) * 10) / 10 // Round to 1 decimal place
  }

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180)
  }

  const handleLocationSelect = (type: 'pickup' | 'dropoff', location: { lat: number; lng: number; address: string }) => {
    if (type === 'pickup') {
      setPickup(prev => ({
        ...prev,
        address: location.address,
        coordinates: {
          lat: location.lat,
          lng: location.lng
        }
      }))
    } else {
      setDropoff(prev => ({
        ...prev,
        address: location.address,
        coordinates: {
          lat: location.lat,
          lng: location.lng
        }
      }))
    }
    setActiveLocationSelect(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const newErrors: typeof errors = {}
    
    if (!pickup.address || !pickup.coordinates) {
      newErrors.pickup = 'Please enter a valid pickup address'
    }
    
    if (!dropoff.address || !dropoff.coordinates) {
      newErrors.dropoff = 'Please enter a valid dropoff address'
    }
    
    if (!packageDetails.weight) {
      newErrors.package = 'Please enter the package weight'
    }

    if (!selectedTimeSlot) {
      newErrors.time = 'Please select a delivery time slot'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit delivery request
    try {
      const deliveryRequest = {
        pickup,
        dropoff,
        packageDetails,
        deliveryTime,
        selectedTimeSlot,
        price: priceBreakdown?.total
      }

      console.log('Submitting delivery request:', deliveryRequest)
      // await createDeliveryRequest(deliveryRequest)
      
      // Show success message or redirect
      alert('Delivery request submitted successfully!')
    } catch (error) {
      console.error('Error creating delivery request:', error)
      alert('Failed to submit delivery request. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Map Preview */}
      <div className="relative">
        <DeliveryMap
          pickupLocation={pickup.coordinates && {
            ...pickup.coordinates,
            address: pickup.address
          }}
          dropoffLocation={dropoff.coordinates && {
            ...dropoff.coordinates,
            address: dropoff.address
          }}
          onLocationSelect={handleLocationSelect}
          className="h-[400px] mb-8 rounded-xl shadow-lg"
        />
        {activeLocationSelect && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-center">
            <div className="px-4 py-2 bg-gray-800/90 text-white rounded-lg flex items-center gap-2 backdrop-blur-sm">
              Click on the map to set {activeLocationSelect} location
              <button
                onClick={() => setActiveLocationSelect(null)}
                className="ml-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pickup Location */}
      <div 
        className={`space-y-4 p-4 rounded-xl transition-colors ${
          activeLocationSelect === 'pickup' 
            ? 'bg-primary-blue/10 border border-primary-blue' 
            : 'hover:bg-gray-900/50 border border-transparent'
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="text-primary-blue" />
            Pickup Location
          </h2>
          <button
            type="button"
            onClick={() => setActiveLocationSelect(activeLocationSelect === 'pickup' ? null : 'pickup')}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors ${
              activeLocationSelect === 'pickup'
                ? 'bg-primary-blue text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            {activeLocationSelect === 'pickup' ? 'Cancel Selection' : 'Set on Map'}
          </button>
        </div>
        <div className="space-y-4">
          <LocationInput
            label="Address"
            placeholder="Enter pickup address or use the map"
            value={pickup.address}
            onChange={(address, coordinates) => 
              setPickup(prev => ({ ...prev, address, coordinates }))
            }
            error={errors.pickup}
          />
          <div>
            <label className="block text-sm font-medium mb-2">Instructions (Optional)</label>
            <textarea
              value={pickup.instructions}
              onChange={(e) => setPickup(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="Any specific instructions for pickup (e.g., Floor number, Access code)"
              rows={2}
              className="w-full px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
        </div>
      </div>

      {/* Dropoff Location */}
      <div 
        className={`space-y-4 p-4 rounded-xl transition-colors ${
          activeLocationSelect === 'dropoff' 
            ? 'bg-green-500/10 border border-green-500' 
            : 'hover:bg-gray-900/50 border border-transparent'
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="text-green-500" />
            Dropoff Location
          </h2>
          <button
            type="button"
            onClick={() => setActiveLocationSelect(activeLocationSelect === 'dropoff' ? null : 'dropoff')}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors ${
              activeLocationSelect === 'dropoff'
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            {activeLocationSelect === 'dropoff' ? 'Cancel Selection' : 'Set on Map'}
          </button>
        </div>
        <div className="space-y-4">
          <LocationInput
            label="Address"
            placeholder="Enter dropoff address or use the map"
            value={dropoff.address}
            onChange={(address, coordinates) => 
              setDropoff(prev => ({ ...prev, address, coordinates }))
            }
            error={errors.dropoff}
          />
          <div>
            <label className="block text-sm font-medium mb-2">Instructions (Optional)</label>
            <textarea
              value={dropoff.instructions}
              onChange={(e) => setDropoff(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="Any specific instructions for dropoff (e.g., Ring doorbell, Call upon arrival)"
              rows={2}
              className="w-full px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="text-primary-blue" />
          Package Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              value={packageDetails.size}
              onChange={(e) => setPackageDetails(prev => ({ ...prev, size: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            >
              <option value="small">Small (up to 5kg)</option>
              <option value="medium">Medium (up to 15kg)</option>
              <option value="large">Large (up to 30kg)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Weight (kg)</label>
            <input
              type="number"
              value={packageDetails.weight}
              onChange={(e) => setPackageDetails(prev => ({ ...prev, weight: e.target.value }))}
              placeholder="Enter package weight"
              min="0"
              max="30"
              step="0.1"
              className="w-full px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
            {errors.package && (
              <p className="text-sm text-red-500 mt-1">{errors.package}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description (Optional)</label>
          <textarea
            value={packageDetails.description}
            onChange={(e) => setPackageDetails(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your package contents"
            rows={2}
            className="w-full px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={packageDetails.isFragile}
              onChange={(e) => setPackageDetails(prev => ({ ...prev, isFragile: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-800 text-primary-blue focus:ring-primary-blue bg-gray-900"
            />
            <span className="text-sm">Fragile Package (+$5.00)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={packageDetails.requiresRefrigeration}
              onChange={(e) => setPackageDetails(prev => ({ ...prev, requiresRefrigeration: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-800 text-primary-blue focus:ring-primary-blue bg-gray-900"
            />
            <span className="text-sm">Requires Refrigeration (+$8.00)</span>
          </label>
        </div>
      </div>

      {/* Delivery Time */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="text-primary-blue" />
          Delivery Time
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Date</label>
            <input
              type="date"
              value={format(deliveryTime, 'yyyy-MM-dd')}
              onChange={(e) => setDeliveryTime(new Date(e.target.value))}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Select Time Slot</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedTimeSlot === slot
                      ? 'border-primary-blue bg-primary-blue/10 text-white'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {errors.time && (
              <p className="text-sm text-red-500 mt-1">{errors.time}</p>
            )}
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      {priceBreakdown && (
        <div className="space-y-4 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CreditCard className="text-primary-blue" />
            Price Breakdown
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Base Price</span>
              <span>${priceBreakdown.basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Distance Charge</span>
              <span>${priceBreakdown.distanceCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Weight Charge</span>
              <span>${priceBreakdown.weightCharge.toFixed(2)}</span>
            </div>
            {priceBreakdown.specialHandling > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">Special Handling</span>
                <span>${priceBreakdown.specialHandling.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-800 mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-primary-blue">${priceBreakdown.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isCalculating || !priceBreakdown}
        className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
          isCalculating || !priceBreakdown
            ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
            : 'bg-primary-blue hover:bg-secondary-blue text-white'
        }`}
      >
        {isCalculating ? (
          <>
            <Clock className="w-5 h-5 animate-spin" />
            Calculating Price...
          </>
        ) : !priceBreakdown ? (
          <>
            <Info className="w-5 h-5" />
            Fill in delivery details
          </>
        ) : (
          <>
            <Truck className="w-5 h-5" />
            Book Delivery for ${priceBreakdown.total.toFixed(2)}
          </>
        )}
      </button>
    </form>
  )
} 