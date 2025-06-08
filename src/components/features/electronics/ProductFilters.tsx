'use client'

import { useState } from 'react'
import { Filter, ChevronDown } from 'lucide-react'

const categories = [
  'All',
  'Smartphones',
  'Laptops',
  'Audio',
  'TVs',
  'Gaming',
  'Accessories'
]

const brands = [
  { label: 'All Brands', value: 'all' },
  { label: 'Apple', value: 'apple' },
  { label: 'Samsung', value: 'samsung' },
  { label: 'Sony', value: 'sony' },
  { label: 'LG', value: 'lg' },
  { label: 'Dell', value: 'dell' },
  { label: 'HP', value: 'hp' }
]

const priceRanges = [
  { label: 'Any Price', value: 'all' },
  { label: 'Under $100', value: 'under-100' },
  { label: '$100 - $500', value: '100-500' },
  { label: '$500 - $1000', value: '500-1000' },
  { label: 'Over $1000', value: 'over-1000' }
]

const availabilityOptions = [
  { label: 'All Items', value: 'all' },
  { label: 'In Stock', value: 'in-stock' },
  { label: 'Pre-order', value: 'pre-order' }
]

interface ProductFiltersProps {
  selectedCategory: string;
  selectedBrand: string;
  selectedPrice: string;
  selectedAvailability: string;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceChange: (price: string) => void;
  onAvailabilityChange: (availability: string) => void;
}

export default function ProductFilters({ 
  selectedCategory, 
  selectedBrand, 
  selectedPrice, 
  selectedAvailability,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onAvailabilityChange
}: ProductFiltersProps) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false)
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)
  const [isAvailabilityDropdownOpen, setIsAvailabilityDropdownOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Category Filter */}
      <div className="relative">
        <button
          onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          className="w-full md:w-[200px] flex items-center justify-between gap-2 px-4 py-2 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter size={18} />
            <span className="truncate">{selectedCategory}</span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isCategoryDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg py-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category)
                  setIsCategoryDropdownOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                  selectedCategory === category ? 'text-primary-blue' : 'text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="relative">
        <button
          onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
          className="w-full md:w-[200px] flex items-center justify-between gap-2 px-4 py-2 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="truncate">
              {brands.find(b => b.value === selectedBrand)?.label}
            </span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isBrandDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isBrandDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg py-2">
            {brands.map((brand) => (
              <button
                key={brand.value}
                onClick={() => {
                  onBrandChange(brand.value)
                  setIsBrandDropdownOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                  selectedBrand === brand.value ? 'text-primary-blue' : 'text-white'
                }`}
              >
                {brand.label}
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
              {priceRanges.find(p => p.value === selectedPrice)?.label}
            </span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isPriceDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isPriceDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg py-2">
            {priceRanges.map((price) => (
              <button
                key={price.value}
                onClick={() => {
                  onPriceChange(price.value)
                  setIsPriceDropdownOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                  selectedPrice === price.value ? 'text-primary-blue' : 'text-white'
                }`}
              >
                {price.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="relative">
        <button
          onClick={() => setIsAvailabilityDropdownOpen(!isAvailabilityDropdownOpen)}
          className="w-full md:w-[200px] flex items-center justify-between gap-2 px-4 py-2 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="truncate">
              {availabilityOptions.find(a => a.value === selectedAvailability)?.label}
            </span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isAvailabilityDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isAvailabilityDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg py-2">
            {availabilityOptions.map((availability) => (
              <button
                key={availability.value}
                onClick={() => {
                  onAvailabilityChange(availability.value)
                  setIsAvailabilityDropdownOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                  selectedAvailability === availability.value ? 'text-primary-blue' : 'text-white'
                }`}
              >
                {availability.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 