'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'

const cuisines = [
  'All',
  'Italian',
  'Japanese',
  'Chinese',
  'Mexican',
  'Indian',
  'Thai',
  'American',
  'Mediterranean'
]

const priceRanges = [
  { label: 'All', value: 'all' },
  { label: '$', value: 'low' },
  { label: '$$', value: 'medium' },
  { label: '$$$', value: 'high' }
]

interface RestaurantFiltersProps {
  onCuisineChange: (cuisine: string) => void;
  onPriceChange: (price: string) => void;
}

export default function RestaurantFilters({ onCuisineChange, onPriceChange }: RestaurantFiltersProps) {
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState('all')

  const handleCuisineClick = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    onCuisineChange(cuisine);
  };

  const handlePriceClick = (price: string) => {
    setSelectedPrice(price);
    onPriceChange(price);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Restaurants</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-card-background border border-gray-800 rounded-lg hover:border-gray-700">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      {/* Cuisine Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
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

      {/* Price Range Filter */}
      <div className="flex gap-2">
        {priceRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => handlePriceClick(range.value)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedPrice === range.value
                ? 'bg-primary-blue text-white'
                : 'bg-card-background border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  )
} 