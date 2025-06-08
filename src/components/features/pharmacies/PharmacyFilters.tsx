'use client'

import { Dispatch, SetStateAction } from 'react'

interface PharmacyFiltersProps {
  types: string[];
  services: string[];
  selectedType: string;
  selectedServices: string[];
  onTypeChange: Dispatch<SetStateAction<string>>;
  onServiceToggle: (service: string) => void;
}

export default function PharmacyFilters({
  types,
  services,
  selectedType,
  selectedServices,
  onTypeChange,
  onServiceToggle
}: PharmacyFiltersProps) {
  return (
    <div className="bg-card-background border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Pharmacy Types */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Pharmacy Type
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

          {/* Services */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Services
            </label>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => onServiceToggle(service)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
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
        </div>
      </div>
    </div>
  )
} 