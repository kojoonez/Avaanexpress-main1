'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Temporary token setup - Move to .env.local in production
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia29qb29uZXoiLCJhIjoiY21iYjNwdG8xMHcyYjJqc2NxaWVyYXRjZSJ9.Y2k6vkTOAKOndnqMS6Aj0A'
mapboxgl.accessToken = MAPBOX_TOKEN

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng] = useState(-73.935242)
  const [lat] = useState(40.730610)
  const [zoom] = useState(13)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom,
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Add geolocation control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    )

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [lng, lat, zoom])

  return (
    <div className="relative w-full h-[70vh]">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  )
} 