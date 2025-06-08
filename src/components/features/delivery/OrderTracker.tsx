'use client'

import { useEffect, useState } from 'react'
import { Package, MapPin, Truck, CheckCircle } from 'lucide-react'
import mapboxgl, { LngLatLike } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Temporary token setup - Move to .env.local in production
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia29qb29uZXoiLCJhIjoiY21iYjNwdG8xMHcyYjJqc2NxaWVyYXRjZSJ9.Y2k6vkTOAKOndnqMS6Aj0A'
mapboxgl.accessToken = MAPBOX_TOKEN

// This would come from your API in a real application
const mockOrder = {
  id: 'DEL-12345',
  status: 'in_transit',
  pickup: {
    address: '123 Pickup St, City',
    time: '10:30 AM',
    coordinates: [-0.1278, 51.5074] as [number, number] // London coordinates for demo
  },
  dropoff: {
    address: '456 Delivery Ave, City',
    estimatedTime: '11:45 AM',
    coordinates: [-0.1248, 51.5094] as [number, number] // Nearby coordinates for demo
  },
  driver: {
    name: 'John Smith',
    phone: '+1 234-567-8900',
    vehicle: 'Toyota Corolla',
    plate: 'ABC 123',
    // Simulated driver location between pickup and dropoff
    currentLocation: {
      coordinates: [-0.1263, 51.5084] as [number, number],
      lastUpdated: new Date().toISOString()
    }
  },
  package: {
    size: 'Medium',
    description: 'Electronics package'
  },
  timeline: [
    {
      status: 'Order Placed',
      time: '10:15 AM',
      completed: true
    },
    {
      status: 'Driver Assigned',
      time: '10:20 AM',
      completed: true
    },
    {
      status: 'Picked Up',
      time: '10:30 AM',
      completed: true
    },
    {
      status: 'In Transit',
      time: '10:35 AM',
      completed: true
    },
    {
      status: 'Delivered',
      time: 'Expected 11:45 AM',
      completed: false
    }
  ]
}

// Custom marker element creator
const createCustomMarker = (type: 'pickup' | 'dropoff' | 'driver') => {
  const el = document.createElement('div')
  el.className = 'custom-marker'
  
  if (type === 'pickup') {
    el.innerHTML = `
      <div class="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center shadow-lg border-2 border-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8"/>
          <path d="M8 12h8"/>
        </svg>
      </div>
    `
  } else if (type === 'dropoff') {
    el.innerHTML = `
      <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
        <span class="text-xl">🏠</span>
      </div>
    `
  } else {
    el.innerHTML = `
      <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.7a1 1 0 0 0-.8.4L2.2 11l-5.16.86a1 1 0 0 0-.84.99V16h3m16 0H2m12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
        </svg>
      </div>
    `
  }
  
  return el
}

export default function OrderTracker() {
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const [driverMarker, setDriverMarker] = useState<mapboxgl.Marker | null>(null)

  // Initialize map
  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: mockOrder.driver.currentLocation.coordinates,
      zoom: 14
    })

    // Add navigation controls
    mapInstance.addControl(new mapboxgl.NavigationControl())

    mapInstance.on('load', () => {
      // Add markers for pickup and dropoff
      new mapboxgl.Marker({
        element: createCustomMarker('pickup')
      })
        .setLngLat(mockOrder.pickup.coordinates)
        .addTo(mapInstance)

      new mapboxgl.Marker({
        element: createCustomMarker('dropoff')
      })
        .setLngLat(mockOrder.dropoff.coordinates)
        .addTo(mapInstance)

      // Add driver marker
      const marker = new mapboxgl.Marker({
        element: createCustomMarker('driver')
      })
        .setLngLat(mockOrder.driver.currentLocation.coordinates)
        .addTo(mapInstance)

      setDriverMarker(marker)

      // Add route line
      mapInstance.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              mockOrder.pickup.coordinates,
              mockOrder.driver.currentLocation.coordinates,
              mockOrder.dropoff.coordinates
            ]
          }
        }
      })

      mapInstance.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#00C2E8',
          'line-width': 4,
          'line-opacity': 0.8
        }
      })
    })

    setMap(mapInstance)

    return () => {
      mapInstance.remove()
    }
  }, [])

  // Simulate driver movement (in a real app, this would be updated from your backend)
  useEffect(() => {
    if (!map || !driverMarker) return

    const updateDriverLocation = () => {
      // Simulate movement along the route
      const currentPos = driverMarker.getLngLat()
      const targetPos = mockOrder.dropoff.coordinates
      
      // Move slightly towards the target
      const newLng = currentPos.lng + (targetPos[0] - currentPos.lng) * 0.1
      const newLat = currentPos.lat + (targetPos[1] - currentPos.lat) * 0.1
      
      driverMarker.setLngLat([newLng, newLat])

      // Update the route line
      const source = map.getSource('route') as mapboxgl.GeoJSONSource
      source.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            mockOrder.pickup.coordinates,
            [newLng, newLat] as [number, number],
            mockOrder.dropoff.coordinates
          ]
        }
      })
    }

    // Update every 2 seconds
    const interval = setInterval(updateDriverLocation, 2000)

    return () => clearInterval(interval)
  }, [map, driverMarker])

  return (
    <div className="space-y-8">
      {/* Live Map */}
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <div id="map" className="w-full h-[400px]" />
      </div>

      {/* Order Status */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Order #{mockOrder.id}</h2>
          <span className="px-3 py-1 bg-blue-500/10 text-primary-blue rounded-full text-sm">
            In Transit
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {mockOrder.timeline.map((event, index) => (
            <div key={event.status} className="flex items-start mb-8 last:mb-0">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    event.completed ? 'bg-primary-blue' : 'bg-gray-700'
                  }`}
                />
                {index < mockOrder.timeline.length - 1 && (
                  <div
                    className={`absolute w-0.5 h-8 ${
                      event.completed ? 'bg-primary-blue' : 'bg-gray-700'
                    }`}
                    style={{ left: '1rem', top: '2rem' }}
                  />
                )}
              </div>
              <div className="ml-4">
                <p className="font-medium">{event.status}</p>
                <p className="text-sm text-gray-400">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Driver Details */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold mb-4">Driver Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="font-medium">{mockOrder.driver.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Phone</p>
            <p className="font-medium">{mockOrder.driver.phone}</p>
          </div>
          <div>
            <p className="text-gray-400">Vehicle</p>
            <p className="font-medium">{mockOrder.driver.vehicle}</p>
          </div>
          <div>
            <p className="text-gray-400">License Plate</p>
            <p className="font-medium">{mockOrder.driver.plate}</p>
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="flex-shrink-0 w-5 h-5 mt-1 text-primary-blue" />
            <div>
              <p className="text-gray-400">Pickup Location</p>
              <p className="font-medium">{mockOrder.pickup.address}</p>
              <p className="text-sm text-gray-400">Picked up at {mockOrder.pickup.time}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="flex-shrink-0 w-5 h-5 mt-1 text-primary-blue" />
            <div>
              <p className="text-gray-400">Dropoff Location</p>
              <p className="font-medium">{mockOrder.dropoff.address}</p>
              <p className="text-sm text-gray-400">Expected by {mockOrder.dropoff.estimatedTime}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Package className="flex-shrink-0 w-5 h-5 mt-1 text-primary-blue" />
            <div>
              <p className="text-gray-400">Package Details</p>
              <p className="font-medium">{mockOrder.package.size} - {mockOrder.package.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
        <p className="text-center text-gray-400">
          Need help? Contact our support team at support@avaan.com
        </p>
      </div>
    </div>
  )
} 