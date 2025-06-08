'use client'

import { useState } from 'react'
import { Filter, ChevronDown } from 'lucide-react'

const categories = [
  'All',
  'Salon & Hair',
  'Spa & Beauty',
  'Wellness',
  'Massage',
  'Nails'
]

const treatments = [
  { label: 'All Treatments', value: 'all' },
  { label: 'Hair Styling', value: 'hair' },
  { label: 'Facial', value: 'facial' },
  { label: 'Massage', value: 'massage' },
  { label: 'Nails', value: 'nails' },
  { label: 'Makeup', value: 'makeup' },
  { label: 'Skincare', value: 'skincare' },
  { label: 'Spa', value: 'spa' }
]

const genderOptions = [
  { label: 'All', value: 'all' },
  { label: 'Women', value: 'women' },
  { label: 'Men', value: 'men' },
  { label: 'Unisex', value: 'unisex' }
]

interface ServiceFiltersProps {
  selectedCategory: string;
  selectedTreatment: string;
  selectedGender: string;
  onCategoryChange: (category: string) => void;
  onTreatmentChange: (treatment: string) => void;
  onGenderChange: (gender: string) => void;
}

export default function ServiceFilters({ 
  selectedCategory, 
  selectedTreatment, 
  selectedGender,
  onCategoryChange,
  onTreatmentChange,
  onGenderChange
}: ServiceFiltersProps) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [isTreatmentDropdownOpen, setIsTreatmentDropdownOpen] = useState(false)
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false)

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

      {/* Treatment Filter */}
      <div className="relative">
        <button
          onClick={() => setIsTreatmentDropdownOpen(!isTreatmentDropdownOpen)}
          className="w-full md:w-[200px] flex items-center justify-between gap-2 px-4 py-2 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="truncate">
              {treatments.find(t => t.value === selectedTreatment)?.label}
            </span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isTreatmentDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isTreatmentDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg py-2">
            {treatments.map((treatment) => (
              <button
                key={treatment.value}
                onClick={() => {
                  onTreatmentChange(treatment.value)
                  setIsTreatmentDropdownOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                  selectedTreatment === treatment.value ? 'text-primary-blue' : 'text-white'
                }`}
              >
                {treatment.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Gender Filter */}
      <div className="relative">
        <button
          onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
          className="w-full md:w-[200px] flex items-center justify-between gap-2 px-4 py-2 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="truncate">
              {genderOptions.find(g => g.value === selectedGender)?.label}
            </span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isGenderDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isGenderDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg py-2">
            {genderOptions.map((gender) => (
              <button
                key={gender.value}
                onClick={() => {
                  onGenderChange(gender.value)
                  setIsGenderDropdownOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                  selectedGender === gender.value ? 'text-primary-blue' : 'text-white'
                }`}
              >
                {gender.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 