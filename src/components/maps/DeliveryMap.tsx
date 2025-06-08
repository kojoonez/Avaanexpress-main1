'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from 'lucide-react'

interface Location {
  lat: number
  lng: number
  address: string
}

interface DeliveryMapProps {
  riderLocation?: Location
  customerLocation: Location
  restaurantLocation: Location
  className?: string
}

export function DeliveryMap({
  riderLocation,
  customerLocation,
  restaurantLocation,
  className = ''
}: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null)

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.onload = initializeMap
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const initializeMap = () => {
    if (!mapRef.current) return

    const mapOptions: google.maps.MapOptions = {
      zoom: 13,
      center: restaurantLocation,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [{ "color": "#242f3e" }]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{ "color": "#242f3e" }]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#746855" }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{ "color": "#38414e" }]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{ "color": "#212a37" }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#9ca5b3" }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#17263c" }]
        }
      ]
    }

    const newMap = new google.maps.Map(mapRef.current, mapOptions)
    setMap(newMap)

    // Create markers
    new google.maps.Marker({
      position: restaurantLocation,
      map: newMap,
      icon: {
        url: '/icons/restaurant-marker.png',
        scaledSize: new google.maps.Size(32, 32)
      },
      title: 'Restaurant'
    })

    new google.maps.Marker({
      position: customerLocation,
      map: newMap,
      icon: {
        url: '/icons/customer-marker.png',
        scaledSize: new google.maps.Size(32, 32)
      },
      title: 'Customer'
    })

    if (riderLocation) {
      new google.maps.Marker({
        position: riderLocation,
        map: newMap,
        icon: {
          url: '/icons/rider-marker.png',
          scaledSize: new google.maps.Size(32, 32)
        },
        title: 'Rider'
      })
    }

    // Set up directions renderer
    const newDirectionsRenderer = new google.maps.DirectionsRenderer({
      map: newMap,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#00C2E8',
        strokeWeight: 4
      }
    })
    setDirectionsRenderer(newDirectionsRenderer)
    setIsLoading(false)
  }

  useEffect(() => {
    if (!map || !directionsRenderer) return

    const directionsService = new google.maps.DirectionsService()

    // Calculate and display route
    const waypoints = riderLocation
      ? [{ location: riderLocation, stopover: true }]
      : []

    directionsService.route(
      {
        origin: restaurantLocation,
        destination: customerLocation,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          directionsRenderer.setDirections(result)
        }
      }
    )
  }, [map, directionsRenderer, riderLocation])

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <Loader className="w-8 h-8 text-primary-blue animate-spin" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full min-h-[300px]" />
    </div>
  )
} 