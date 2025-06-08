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
  categories: string[]
  services: string[]
  genderOptions: string[]
  selectedCategory: string
  selectedServices: string[]
  selectedGender: string
  onCategoryChange: (category: string) => void
  onServiceToggle: (service: string) => void
  onGenderChange: (gender: string) => void
}

export default function ServiceFilters({
  categories,
  services,
  genderOptions,
  selectedCategory,
  selectedServices,
  selectedGender,
  onCategoryChange,
  onServiceToggle,
  onGenderChange
}: ServiceFiltersProps) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [isTreatmentDropdownOpen, setIsTreatmentDropdownOpen] = useState(false)
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false)

  return (
    <div className="bg-card-background border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-white font-medium mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-blue text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Service Types */}
          <div>
            <h3 className="text-white font-medium mb-3">Service Types</h3>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => onServiceToggle(service)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedServices.includes(service)
                      ? 'bg-primary-blue text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <h3 className="text-white font-medium mb-3">Gender</h3>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map((gender) => (
                <button
                  key={gender}
                  onClick={() => onGenderChange(gender)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedGender === gender
                      ? 'bg-primary-blue text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 