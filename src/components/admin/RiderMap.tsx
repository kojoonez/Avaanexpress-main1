'use client'

import { useState, useCallback } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl/maplibre'
import type { MapRef, ViewStateChangeEvent } from 'react-map-gl/maplibre'
import { MapPin } from 'lucide-react'
import 'mapbox-gl/dist/mapbox-gl.css'

interface RiderMapProps {
  location: {
    lat: number
    lng: number
  }
  orderId: string
}

interface ViewState {
  latitude: number
  longitude: number
  zoom: number
}

export function RiderMap({ location, orderId }: RiderMapProps) {
  const [viewState, setViewState] = useState<ViewState>({
    latitude: location.lat,
    longitude: location.lng,
    zoom: 14
  })

  const onMove = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState)
  }, [])

  return (
    <div className="h-full">
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          Tracking Order {orderId}
        </h3>
      </div>
      
      <div className="h-[calc(100%-2rem)] rounded-lg overflow-hidden">
        <ReactMapGL
          {...viewState}
          onMove={onMove}
          style={{ width: '100%', height: '100%' }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        >
          <Marker
            latitude={location.lat}
            longitude={location.lng}
          >
            <div className="relative">
              <MapPin size={32} className="text-primary-blue" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-blue rounded-full animate-ping" />
            </div>
          </Marker>
        </ReactMapGL>
      </div>
    </div>
  )
} 