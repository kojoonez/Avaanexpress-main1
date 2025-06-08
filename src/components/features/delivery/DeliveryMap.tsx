'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader, AlertCircle } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Temporary token setup - Move to .env.local in production
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia29qb29uZXoiLCJhIjoiY21iYjNwdG8xMHcyYjJqc2NxaWVyYXRjZSJ9.Y2k6vkTOAKOndnqMS6Aj0A'

interface Location {
  lat: number
  lng: number
  address: string
}

interface DeliveryMapProps {
  pickupLocation?: Location
  dropoffLocation?: Location
  className?: string
  onLocationSelect?: (type: 'pickup' | 'dropoff', location: Location) => void
}

// Custom marker element creator
const createCustomMarker = (type: 'pickup' | 'dropoff') => {
  const el = document.createElement('div')
  el.className = 'custom-marker'
  
  if (type === 'pickup') {
    // Car icon for pickup
    el.innerHTML = `
      <div class="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center shadow-lg border-2 border-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.7a1 1 0 0 0-.8.4L2.2 11l-5.16.86a1 1 0 0 0-.84.99V16h3m16 0H2m12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
        </svg>
      </div>
    `
  } else {
    // House emoji for dropoff
    el.innerHTML = `
      <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
        <span class="text-xl">🏠</span>
      </div>
    `
  }
  
  return el
}

export default function DeliveryMap({
  pickupLocation,
  dropoffLocation,
  className = '',
  onLocationSelect
}: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const [tempMarker, setTempMarker] = useState<mapboxgl.Marker | null>(null)

  // Function to get address from coordinates
  const getAddressFromCoordinates = async (lng: number, lat: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
      )
      const data = await response.json()
      return data.features[0]?.place_name || 'Unknown location'
    } catch (error) {
      console.error('Error getting address:', error)
      return 'Unknown location'
    }
  }

  useEffect(() => {
    if (!mapRef.current) return

    try {
      // Initialize Mapbox with the token
      mapboxgl.accessToken = MAPBOX_TOKEN
      
      const defaultCenter: [number, number] = [0, 20] // More globally centered coordinates
      map.current = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: pickupLocation ? [pickupLocation.lng, pickupLocation.lat] as [number, number] : defaultCenter,
        zoom: 2, // Set a more zoomed out default view
        attributionControl: false // Hide attribution for testing
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl())

      // Add click handler for map
      map.current.on('click', async (e) => {
        if (!onLocationSelect) return

        // Remove temporary marker if it exists
        if (tempMarker) {
          tempMarker.remove()
        }

        // Get address for the clicked location
        const address = await getAddressFromCoordinates(e.lngLat.lng, e.lngLat.lat)

        // Create location object
        const location: Location = {
          lng: e.lngLat.lng,
          lat: e.lngLat.lat,
          address
        }

        // Call the callback with the new location
        onLocationSelect('pickup', location)
      })

      map.current.on('load', () => {
        setIsLoading(false)
        setMapError(null)
      })

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e)
        setMapError('An error occurred while loading the map. Please check your internet connection and try again.')
      })

      return () => {
        map.current?.remove()
      }
    } catch (error) {
      console.error('Error initializing map:', error)
      setMapError(error instanceof Error ? error.message : 'Failed to load the map. Please check your configuration.')
      setIsLoading(false)
    }
  }, [pickupLocation, onLocationSelect])

  useEffect(() => {
    if (!map.current || !pickupLocation || !dropoffLocation) return

    // Remove existing markers and route
    const markers = document.getElementsByClassName('mapboxgl-marker')
    while (markers[0]) {
      markers[0].remove()
    }

    if (map.current.getLayer('route')) {
      map.current.removeLayer('route')
    }
    if (map.current.getSource('route')) {
      map.current.removeSource('route')
    }

    // Add custom markers
    new mapboxgl.Marker({
      element: createCustomMarker('pickup')
    })
      .setLngLat([pickupLocation.lng, pickupLocation.lat])
      .addTo(map.current)

    new mapboxgl.Marker({
      element: createCustomMarker('dropoff')
    })
      .setLngLat([dropoffLocation.lng, dropoffLocation.lat])
      .addTo(map.current)

    // Get route
    const getRoute = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/` +
          `${pickupLocation.lng},${pickupLocation.lat};${dropoffLocation.lng},${dropoffLocation.lat}` +
          `?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch route')
        }

        const data = await response.json()

        if (data.routes?.[0]) {
          const route = data.routes[0].geometry

          map.current?.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route
            }
          })

          map.current?.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#00C2E8',
              'line-width': 4
            }
          })

          // Fit map to show both points
          const bounds = new mapboxgl.LngLatBounds()
          bounds.extend([pickupLocation.lng, pickupLocation.lat])
          bounds.extend([dropoffLocation.lng, dropoffLocation.lat])
          map.current?.fitBounds(bounds, { padding: 50 })
        }
      } catch (error) {
        console.error('Error getting route:', error)
        setMapError('Unable to load the delivery route. Please try again.')
      }
    }

    getRoute()
  }, [pickupLocation, dropoffLocation])

  return (
    <>
      <style jsx global>{`
        .custom-marker {
          transform: translate(-50%, -50%);
          cursor: pointer;
        }
      `}</style>
      <div className={`relative rounded-lg overflow-hidden ${className}`}>
        {mapError && (
          <div className="absolute inset-0 bg-gray-900/95 text-white flex flex-col items-center justify-center p-4 z-10">
            <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-center">{mapError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary-blue hover:bg-blue-600 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        {isLoading && !mapError && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <Loader className="w-8 h-8 text-primary-blue animate-spin" />
          </div>
        )}
        <div ref={mapRef} className="w-full h-full min-h-[300px]" />
      </div>
    </>
  )
} 