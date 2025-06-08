'use client'

import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import OrderHistoryList from '@/components/features/delivery/OrderHistoryList'
import { Search, Filter } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function OrderHistoryPage() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    // Handle search
    console.log('Searching for:', searchQuery)
  }

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
        <div className="relative h-[200px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4">
              Order History
            </h1>
            <p className="text-base md:text-xl text-white/90 text-center mb-6 max-w-2xl">
              View and track your past deliveries
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Search and Filter Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders by ID or address"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 rounded-lg border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </form>
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 bg-gray-900 rounded-lg border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-blue appearance-none cursor-pointer"
              >
                <option value="all">All Orders</option>
                <option value="completed">Completed</option>
                <option value="in_transit">In Transit</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                type="button"
                className="px-4 py-3 bg-gray-900 rounded-lg border border-gray-800 text-white hover:bg-gray-800 transition-colors"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Orders List */}
          <OrderHistoryList />
        </div>
      </div>
    </main>
  )
} 