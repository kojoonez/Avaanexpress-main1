'use client'

import { Dispatch, SetStateAction } from 'react'

interface StoreFiltersProps {
  types: string[];
  selectedType: string;
  onTypeChange: Dispatch<SetStateAction<string>>;
  selectedPriceRange: string | null;
  onPriceRangeChange: Dispatch<SetStateAction<string | null>>;
}

const priceRanges = [
  { label: '$', description: 'Budget-friendly' },
  { label: '$$', description: 'Mid-range' },
  { label: '$$$', description: 'Premium' }
]

export default function StoreFilters({
  types,
  selectedType,
  onTypeChange,
  selectedPriceRange,
  onPriceRangeChange
}: StoreFiltersProps) {
  return (
    <div className="bg-card-background border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Store Types */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Store Type
            </label>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedType === type
                      ? 'bg-primary-blue text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Price Range
            </label>
            <div className="flex gap-2">
              {priceRanges.map(({ label, description }) => (
                <button
                  key={label}
                  onClick={() => onPriceRangeChange(
                    selectedPriceRange === label ? null : label
                  )}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedPriceRange === label
                      ? 'bg-primary-blue text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  title={description}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 