'use client'

import { useState } from 'react'
import { Filter, ChevronDown } from 'lucide-react'

const storeTypes = [
  'All Stores',
  'Supermarket',
  'Local Market',
  'Organic',
  'International',
  'Specialty'
]

const priceRanges = [
  { label: 'Any Price', value: 'any' },
  { label: 'Budget $', value: 'low' },
  { label: 'Mid Range $$', value: 'medium' },
  { label: 'Premium $$$', value: 'high' }
]

interface StoreFiltersProps {
  selectedType: string;
  selectedPrice: string;
  onTypeChange: (type: string) => void;
  onPriceChange: (price: string) => void;
}

export default function StoreFilters({ 
  selectedType, 
  selectedPrice, 
  onTypeChange, 
  onPriceChange 
}: StoreFiltersProps) {
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Store Type Filter */}
      <div className="relative">
        <button
          onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
          className="w-full md:w-[200px] flex items-center justify-between gap-2 px-4 py-2 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter size={18} />
            <span className="truncate">{selectedType}</span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isTypeDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg py-2">
            {storeTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  onTypeChange(type)
                  setIsTypeDropdownOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                  selectedType === type ? 'text-primary-blue' : 'text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="relative">
        <button
          onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
          className="w-full md:w-[200px] flex items-center justify-between gap-2 px-4 py-2 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="truncate">
              {priceRanges.find(range => range.value === selectedPrice)?.label}
            </span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isPriceDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isPriceDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg py-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => {
                  onPriceChange(range.value)
                  setIsPriceDropdownOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                  selectedPrice === range.value ? 'text-primary-blue' : 'text-white'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 