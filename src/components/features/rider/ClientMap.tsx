'use client'

import { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapPin } from 'lucide-react'
import mapboxgl from 'mapbox-gl'

// Temporary token setup - Move to .env.local in production
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia29qb29uZXoiLCJhIjoiY21iYjNwdG8xMHcyYjJqc2NxaWVyYXRjZSJ9.Y2k6vkTOAKOndnqMS6Aj0A'
mapboxgl.accessToken = MAPBOX_TOKEN

const initialViewState = {
  latitude: 51.5074,
  longitude: -0.1278,
  zoom: 13
}

// Sample demand zones data
const demandZones = [
  { id: 1, lat: 51.5074, lng: -0.1278, demand: 1.5 },
  { id: 2, lat: 51.5124, lng: -0.1358, demand: 1.2 },
  { id: 3, lat: 51.5024, lng: -0.1198, demand: 0.8 }
]

export default function ClientMap() {
  const [viewState, setViewState] = useState(initialViewState)
  const [mapError, setMapError] = useState<string | null>(null)

  return (
    <>
      {mapError && (
        <div className="absolute top-4 left-4 right-4 z-10 bg-red-500/90 text-white p-3 rounded-lg text-sm">
          {mapError}
        </div>
      )}
      <ReactMapGL
        {...viewState}
        width="100%"
        height="100%"
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onError={(evt: any) => setMapError(evt.error?.message || 'An error occurred loading the map')}
      >
        {/* Current Location Marker */}
        <Marker
          latitude={viewState.latitude}
          longitude={viewState.longitude}
        >
          <div className="relative">
            <MapPin size={32} className="text-primary-blue" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-blue rounded-full animate-ping" />
          </div>
        </Marker>

        {/* Demand Zone Markers */}
        {demandZones.map(zone => (
          <Marker
            key={zone.id}
            latitude={zone.lat}
            longitude={zone.lng}
          >
            <div className={`
              w-12 h-12 rounded-full bg-primary-blue/20 
              flex items-center justify-center
              ${zone.demand > 1.2 ? 'animate-pulse' : ''}
            `}>
              <span className="text-sm font-semibold text-white">
                {zone.demand}x
              </span>
            </div>
          </Marker>
        ))}
      </ReactMapGL>
    </>
  )
} 