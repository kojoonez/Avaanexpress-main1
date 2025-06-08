'use client'

import { useState } from 'react'
import { Filter, ChevronDown } from 'lucide-react'

const pharmacyTypes = [
  'All',
  'Retail',
  'Hospital',
  'Specialty',
  '24/7',
  'Compounding'
]

const serviceTypes = [
  { label: 'All Services', value: 'all' },
  { label: 'Prescription', value: 'prescription' },
  { label: 'OTC Medication', value: 'otc' },
  { label: 'Medical Supplies', value: 'supplies' },
  { label: 'Consultation', value: 'consultation' },
  { label: 'Compounding', value: 'compounding' }
]

interface PharmacyFiltersProps {
  selectedType: string;
  selectedService: string;
  onTypeChange: (type: string) => void;
  onServiceChange: (service: string) => void;
}

export default function PharmacyFilters({ 
  selectedType, 
  selectedService, 
  onTypeChange, 
  onServiceChange 
}: PharmacyFiltersProps) {
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Pharmacy Type Filter */}
      <div className="relative">
        <button
          onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
          className="w-full md:w-[200px] flex items-center justify-between gap-2 px-4 py-2 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter size={18} />
            <span className="truncate">{selectedType} Pharmacies</span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isTypeDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg py-2">
            {pharmacyTypes.map((type) => (
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
                {type} {type !== 'All' && 'Pharmacies'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Service Type Filter */}
      <div className="relative">
        <button
          onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
          className="w-full md:w-[200px] flex items-center justify-between gap-2 px-4 py-2 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="truncate">
              {serviceTypes.find(service => service.value === selectedService)?.label}
            </span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isServiceDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg py-2">
            {serviceTypes.map((service) => (
              <button
                key={service.value}
                onClick={() => {
                  onServiceChange(service.value)
                  setIsServiceDropdownOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                  selectedService === service.value ? 'text-primary-blue' : 'text-white'
                }`}
              >
                {service.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 