'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Search, Loader } from 'lucide-react'
import { debounce } from 'lodash'

// Temporary token setup - Move to .env.local in production
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia29qb29uZXoiLCJhIjoiY21iYjNwdG8xMHcyYjJqc2NxaWVyYXRjZSJ9.Y2k6vkTOAKOndnqMS6Aj0A'

interface LocationInputProps {
  label: string
  placeholder: string
  value: string
  onChange: (address: string, coordinates?: { lat: number; lng: number }) => void
  error?: string
}

interface Feature {
  id: string
  place_name: string
  center: [number, number]
}

export default function LocationInput({
  label,
  placeholder,
  value,
  onChange,
  error
}: LocationInputProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [predictions, setPredictions] = useState<Feature[]>([])
  const [showPredictions, setShowPredictions] = useState(false)

  const debouncedSearch = useRef(
    debounce(async (input: string) => {
      if (input.length < 3) {
        setPredictions([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json` +
          `?access_token=${MAPBOX_TOKEN}` +
          '&types=address,place,locality,neighborhood,postcode' +
          '&language=en' +
          '&fuzzyMatch=true' +
          '&worldview=cn' +
          '&limit=5'
        )
        const data = await response.json()
        setPredictions(data.features || [])
      } catch (error) {
        console.error('Error fetching predictions:', error)
        setPredictions([])
      } finally {
        setIsLoading(false)
      }
    }, 300)
  ).current

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue)
    setShowPredictions(true)
    debouncedSearch(inputValue)
  }

  const handlePredictionSelect = (prediction: Feature) => {
    const [lng, lat] = prediction.center
    onChange(prediction.place_name, { lat, lng })
    setShowPredictions(false)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-400">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <MapPin size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 bg-card-background border ${
            error ? 'border-red-500' : 'border-gray-800'
          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue`}
          onFocus={() => value && setShowPredictions(true)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {isLoading ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <Search size={18} />
          )}
        </div>

        {/* Predictions Dropdown */}
        {showPredictions && predictions.length > 0 && (
          <div className="absolute z-50 left-0 right-0 mt-1 bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
            {predictions.map((prediction) => (
              <button
                key={prediction.id}
                onClick={() => handlePredictionSelect(prediction)}
                className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors"
              >
                <div className="text-white">
                  {prediction.place_name}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
} 