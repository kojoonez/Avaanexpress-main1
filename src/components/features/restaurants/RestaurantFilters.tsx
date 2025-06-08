'use client'

import { useState } from 'react'
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react'

const cuisines = [
  'All',
  'Italian',
  'Japanese',
  'Chinese',
  'Mexican',
  'Indian',
  'Thai',
  'American',
  'Mediterranean',
  'Korean',
  'Vietnamese',
  'French',
  'Greek',
  'Spanish',
  'Middle Eastern'
]

const priceRanges = [
  { label: 'All', value: 'all' },
  { label: '$', value: 'low', description: 'Under $15' },
  { label: '$$', value: 'medium', description: '$15-$30' },
  { label: '$$$', value: 'high', description: 'Over $30' }
]

const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Rating', value: 'rating' },
  { label: 'Delivery Time', value: 'delivery_time' },
  { label: 'Distance', value: 'distance' }
]

interface RestaurantFiltersProps {
  onCuisineChange: (cuisine: string) => void;
  onPriceChange: (price: string) => void;
  onSortChange?: (sort: string) => void;
}

export default function RestaurantFilters({
  onCuisineChange,
  onPriceChange,
  onSortChange
}: RestaurantFiltersProps) {
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [selectedSort, setSelectedSort] = useState('recommended')
  const [showFilters, setShowFilters] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleCuisineClick = (cuisine: string) => {
    setSelectedCuisine(cuisine)
    onCuisineChange(cuisine)
  }

  const handlePriceClick = (price: string) => {
    setSelectedPrice(price)
    onPriceChange(price)
  }

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort)
    onSortChange?.(sort)
  }

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('cuisine-scroll')
    if (!container) return

    const scrollAmount = 200
    const newPosition = direction === 'left'
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount)

    container.scrollTo({ left: newPosition, behavior: 'smooth' })
    setScrollPosition(newPosition)
  }

  return (
    <div className="mb-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Restaurants</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-card-background border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
        >
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-4 bg-card-background border border-gray-800 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-medium mb-3">Sort By</h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedSort === option.value
                        ? 'bg-primary-blue text-white'
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range with Descriptions */}
            <div>
              <h3 className="text-sm font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handlePriceClick(range.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedPrice === range.value
                        ? 'bg-primary-blue text-white'
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{range.label}</span>
                      {range.description && (
                        <span className="text-sm text-gray-400">
                          {range.description}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Cuisine Filter */}
      <div className="relative">
        <div
          id="cuisine-scroll"
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => handleCuisineClick(cuisine)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCuisine === cuisine
                  ? 'bg-primary-blue text-white'
                  : 'bg-card-background border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>

        {/* Scroll Buttons */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          style={{ display: scrollPosition > 0 ? 'block' : 'none' }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
} 