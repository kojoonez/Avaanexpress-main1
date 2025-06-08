'use client'

import { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import DeliveryForm from '@/components/features/delivery/DeliveryForm'

export default function RequestDeliveryPage() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocationError('Unable to get your current location')
        }
      )
    } else {
      setLocationError('Geolocation is not supported by your browser')
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <Navigation 
        onCollapse={(collapsed) => setIsNavCollapsed(collapsed)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      />
      <div 
        className={`transition-all duration-300 ${
          isMobile 
            ? 'ml-0' 
            : isNavCollapsed ? 'ml-20' : 'ml-64'
        } pt-[60px]`}
      >
        {/* Hero Section */}
        <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 md:mb-6">
              Request a Delivery
            </h1>
            <p className="text-base md:text-xl text-white/90 text-center mb-6 md:mb-8 max-w-2xl">
              Fast and reliable home-to-home delivery service
            </p>

            {/* Location Status */}
            <div className="flex items-center gap-2 text-white/80">
              <MapPin size={20} />
              {locationError ? (
                <span className="text-red-400">{locationError}</span>
              ) : userLocation ? (
                <span>Using your current location</span>
              ) : (
                <span>Getting your location...</span>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-3xl mx-auto">
            <DeliveryForm initialLocation={userLocation} />
          </div>
        </div>
      </div>
    </main>
  )
} 