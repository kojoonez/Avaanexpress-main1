'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Star, MapPin, Clock, Calendar, ChevronDown } from 'lucide-react'
import Header from '@/components/layout/Header'

// Mock data - In a real app, this would come from an API
const provider = {
  id: 1,
  name: 'Serenity Spa & Salon',
  image: 'https://picsum.photos/1920/1080?random=1',
  type: 'Spa & Salon',
  services: [
    {
      category: 'Massage',
      items: [
        { name: 'Swedish Massage (60min)', price: 89.99, duration: 60 },
        { name: 'Deep Tissue Massage (60min)', price: 99.99, duration: 60 },
        { name: 'Hot Stone Massage (90min)', price: 129.99, duration: 90 },
        { name: 'Couples Massage (60min)', price: 179.99, duration: 60 }
      ]
    },
    {
      category: 'Facial',
      items: [
        { name: 'Signature Facial', price: 129.99, duration: 60 },
        { name: 'Anti-Aging Facial', price: 149.99, duration: 75 },
        { name: 'Deep Cleansing Facial', price: 109.99, duration: 60 }
      ]
    },
    {
      category: 'Hair',
      items: [
        { name: 'Haircut & Style', price: 69.99, duration: 45 },
        { name: 'Color & Style', price: 129.99, duration: 120 },
        { name: 'Highlights', price: 149.99, duration: 150 }
      ]
    }
  ],
  rating: 4.8,
  totalReviews: 324,
  address: '123 Wellness St, Spa District',
  description: 'Luxury spa and salon services in a serene environment',
  hours: {
    monday: '9:00 AM - 8:00 PM',
    tuesday: '9:00 AM - 8:00 PM',
    wednesday: '9:00 AM - 8:00 PM',
    thursday: '9:00 AM - 8:00 PM',
    friday: '9:00 AM - 9:00 PM',
    saturday: '8:00 AM - 9:00 PM',
    sunday: '10:00 AM - 6:00 PM'
  },
  amenities: [
    'Free WiFi',
    'Complimentary Tea & Water',
    'Private Rooms',
    'Shower Facilities',
    'Lockers',
    'Robes & Slippers Provided'
  ]
}

interface TimeSlot {
  time: string
  available: boolean
}

// Mock available time slots - In a real app, this would come from an API
const timeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: false },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: false },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: false }
]

interface BookingFormData {
  service: {
    name: string
    price: number
    duration: number
  } | null
  date: string
  time: string | null
}

export default function ProviderPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Massage')
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingFormData>({
    defaultValues: {
      service: null,
      date: new Date().toISOString().split('T')[0],
      time: null
    }
  })

  const selectedService = watch('service')
  const selectedTime = watch('time')

  const onSubmit = (data: BookingFormData) => {
    if (!data.service || !data.time) return

    // In a real app, this would make an API call to create the booking
    console.log('Booking:', {
      providerId: params.id,
      ...data
    })

    // Redirect to confirmation page
    router.push('/health-beauty/booking-confirmation')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={provider.image}
          alt={provider.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl w-full mx-auto px-4 pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {provider.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span>{provider.type}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-white">{provider.rating}</span>
                <span>({provider.totalReviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{provider.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Services */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card-background rounded-lg p-6">
              <h2 className="text-xl font-medium text-white mb-4">Services</h2>
              <div className="space-y-4">
                {provider.services.map((category) => (
                  <div key={category.category}>
                    <button
                      onClick={() => setExpandedCategory(
                        expandedCategory === category.category ? null : category.category
                      )}
                      className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-white font-medium">
                        {category.category}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedCategory === category.category ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedCategory === category.category && (
                      <div className="mt-2 space-y-2">
                        {category.items.map((service) => (
                          <button
                            key={service.name}
                            onClick={() => setValue('service', service)}
                            className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                              selectedService?.name === service.name
                                ? 'bg-primary-blue text-white'
                                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                            }`}
                          >
                            <div>
                              <div className="font-medium">{service.name}</div>
                              <div className="text-sm">
                                {service.duration} minutes
                              </div>
                            </div>
                            <div className="text-lg">
                              ${service.price}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-card-background rounded-lg p-6">
              <h2 className="text-xl font-medium text-white mb-4">Business Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(provider.hours).map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                  >
                    <span className="text-gray-400 capitalize">{day}</span>
                    <span className="text-white">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-card-background rounded-lg p-6">
              <h2 className="text-xl font-medium text-white mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {provider.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-gray-400"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary-blue" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit(onSubmit)} className="sticky top-4 bg-card-background rounded-lg p-6">
              <h2 className="text-xl font-medium text-white mb-4">Book Appointment</h2>
              
              {/* Selected Service Summary */}
              {selectedService ? (
                <div className="mb-6 p-4 bg-gray-900 rounded-lg">
                  <div className="text-white font-medium mb-2">
                    {selectedService.name}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {selectedService.duration} minutes
                    </span>
                    <span className="text-primary-blue">
                      ${selectedService.price}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mb-6 text-gray-400 text-center p-4 bg-gray-900 rounded-lg">
                  Please select a service
                </div>
              )}

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  {...register('date', { required: 'Please select a date' })}
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </span>
                )}
              </div>

              {/* Time Slots */}
              {selectedService && (
                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">
                    Available Times
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setValue('time', slot.time)}
                        className={`p-2 rounded-lg text-sm text-center transition-colors ${
                          !slot.available
                            ? 'bg-gray-900 text-gray-600 cursor-not-allowed'
                            : selectedTime === slot.time
                            ? 'bg-primary-blue text-white'
                            : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  {errors.time && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.time.message}
                    </span>
                  )}
                </div>
              )}

              {/* Book Button */}
              <button
                type="submit"
                disabled={!selectedService || !selectedTime}
                className="w-full py-3 px-4 bg-primary-blue text-white rounded-lg font-medium disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors hover:bg-secondary-blue"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 