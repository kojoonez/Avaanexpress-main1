'use client'

import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import OrderTracker from '@/components/features/delivery/OrderTracker'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function TrackOrderPage() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [trackingId, setTrackingId] = useState('')

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle tracking search
    console.log('Searching for tracking ID:', trackingId)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Navigation onCollapse={(collapsed) => setIsNavCollapsed(collapsed)} />
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
              Track Your Delivery
            </h1>
            <p className="text-base md:text-xl text-white/90 text-center mb-6 md:mb-8 max-w-2xl">
              Real-time updates on your package location
            </p>

            {/* Tracking Search */}
            <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking number"
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Track
              </button>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-3xl mx-auto">
            <OrderTracker />
          </div>
        </div>
      </div>
    </main>
  )
} 