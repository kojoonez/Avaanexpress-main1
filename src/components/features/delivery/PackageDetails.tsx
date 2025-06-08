'use client'

import { Package, Weight, FileText } from 'lucide-react'

interface PackageDetailsProps {
  size: string
  weight: string
  instructions: string
  onSizeChange: (size: string) => void
  onWeightChange: (weight: string) => void
  onInstructionsChange: (instructions: string) => void
}

const packageSizes = [
  { value: 'small', label: 'Small (up to 5kg)' },
  { value: 'medium', label: 'Medium (up to 15kg)' },
  { value: 'large', label: 'Large (up to 30kg)' },
]

export default function PackageDetails({
  size,
  weight,
  instructions,
  onSizeChange,
  onWeightChange,
  onInstructionsChange,
}: PackageDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Package Size
        </label>
        <div className="grid grid-cols-3 gap-4">
          {packageSizes.map((packageSize) => (
            <button
              key={packageSize.value}
              onClick={() => onSizeChange(packageSize.value)}
              className={`flex items-center justify-center p-4 rounded-lg border ${
                size === packageSize.value
                  ? 'border-primary-blue bg-primary-blue/10 text-white'
                  : 'border-gray-800 text-gray-400 hover:border-gray-600'
              }`}
            >
              <Package size={18} className="mr-2" />
              {packageSize.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Weight (kg)
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Weight size={18} className="text-gray-400" />
          </div>
          <input
            type="number"
            value={weight}
            onChange={(e) => onWeightChange(e.target.value)}
            placeholder="Enter package weight"
            className="w-full pl-10 pr-4 py-3 bg-card-background border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Special Instructions
        </label>
        <div className="relative">
          <div className="absolute left-3 top-3">
            <FileText size={18} className="text-gray-400" />
          </div>
          <textarea
            value={instructions}
            onChange={(e) => onInstructionsChange(e.target.value)}
            placeholder="Add any special instructions for the driver"
            rows={4}
            className="w-full pl-10 pr-4 py-3 bg-card-background border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>
      </div>
    </div>
  )
} 