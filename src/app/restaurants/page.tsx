'use client'

import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import RestaurantFilters from '@/components/features/restaurants/RestaurantFilters'
import RestaurantGrid from '@/components/features/restaurants/RestaurantGrid'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RestaurantsPage() {
  const router = useRouter()
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [selectedSort, setSelectedSort] = useState('recommended')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      // If it's a complex search, redirect to the search page
      if (searchQuery.length > 2) {
        await router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&type=restaurant`)
      }
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setIsSearching(false)
    }
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
        <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 md:mb-6">
              Discover Local Restaurants
            </h1>
            <p className="text-base md:text-xl text-white/90 text-center mb-6 md:mb-8 max-w-2xl">
              Order from the best local restaurants with fast delivery
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for restaurants or cuisines..."
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <button
                type="submit"
                disabled={!searchQuery.trim() || isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary-blue hover:bg-secondary-blue disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all"
              >
                <Search size={20} className={isSearching ? 'animate-pulse' : ''} />
              </button>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-6">
          <RestaurantFilters 
            onCuisineChange={setSelectedCuisine}
            onPriceChange={setSelectedPrice}
            onSortChange={setSelectedSort}
          />
          <RestaurantGrid 
            selectedCuisine={selectedCuisine}
            selectedPrice={selectedPrice}
            searchQuery={debouncedSearch}
            sortBy={selectedSort}
          />
        </div>
      </div>
    </main>
  )
} 