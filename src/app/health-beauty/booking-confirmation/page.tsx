'use client'

import { useRouter } from 'next/navigation'
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react'
import Header from '@/components/layout/Header'

// Mock booking data - In a real app, this would come from an API or state management
const booking = {
  id: 'BK123456',
  provider: 'Serenity Spa & Salon',
  service: 'Swedish Massage (60min)',
  date: '2024-02-10',
  time: '11:00 AM',
  price: 89.99,
  address: '123 Wellness St, Spa District',
  instructions: [
    'Please arrive 15 minutes before your appointment',
    'Wear comfortable clothing',
    'Bring a valid ID',
    'Payment will be collected at the venue'
  ]
}

export default function BookingConfirmationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={false}
        onMobileMenuToggle={() => {}}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-card-background rounded-lg p-8">
          {/* Success Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              Booking Confirmed!
            </h1>
            <p className="text-gray-400 text-center mt-2">
              Your appointment has been successfully booked
            </p>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            <div className="p-6 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-medium text-white mb-4">
                Booking Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-primary-blue mt-1" />
                  <div>
                    <div className="text-white font-medium">
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-gray-400">Date</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary-blue mt-1" />
                  <div>
                    <div className="text-white font-medium">{booking.time}</div>
                    <div className="text-gray-400">Time</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary-blue mt-1" />
                  <div>
                    <div className="text-white font-medium">{booking.provider}</div>
                    <div className="text-gray-400">{booking.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="p-6 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-medium text-white mb-4">
                Service Details
              </h2>
              <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                <div>
                  <div className="text-white font-medium">{booking.service}</div>
                  <div className="text-gray-400">Booking #{booking.id}</div>
                </div>
                <div className="text-xl text-primary-blue">
                  ${booking.price}
                </div>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="p-6 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-medium text-white mb-4">
                Important Instructions
              </h2>
              <ul className="space-y-3">
                {booking.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-blue mt-2" />
                    <span className="text-gray-400">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/health-beauty')}
                className="flex-1 py-3 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Back to Services
              </button>
              <button
                onClick={() => {
                  // In a real app, this would open the calendar app or download an ICS file
                  console.log('Add to calendar')
                }}
                className="flex-1 py-3 px-4 bg-primary-blue text-white rounded-lg font-medium hover:bg-secondary-blue transition-colors"
              >
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 