declare namespace google.maps {
  interface MapOptions {
    zoom?: number
    center?: { lat: number; lng: number }
    styles?: Array<{
      elementType?: string
      stylers?: Array<{ [key: string]: string | number }>
      featureType?: string
    }>
  }

  class Map {
    constructor(element: HTMLElement, options?: MapOptions)
    fitBounds(bounds: LatLngBounds): void
  }

  class Marker {
    constructor(options: {
      position: { lat: number; lng: number }
      map: Map
      icon?: {
        path?: SymbolPath | string
        scale?: number
        fillColor?: string
        fillOpacity?: number
        strokeColor?: string
        strokeWeight?: number
        url?: string
        scaledSize?: Size
      }
      title?: string
    })
  }

  class DirectionsService {
    route(
      request: {
        origin: { lat: number; lng: number }
        destination: { lat: number; lng: number }
        travelMode: TravelMode
      },
      callback: (
        result: DirectionsResult | null,
        status: 'OK' | 'ZERO_RESULTS' | 'NOT_FOUND' | 'ERROR'
      ) => void
    ): void
  }

  class DirectionsRenderer {
    constructor(options?: {
      map?: Map
      suppressMarkers?: boolean
      polylineOptions?: {
        strokeColor?: string
        strokeWeight?: number
      }
    })
    setDirections(result: DirectionsResult): void
  }

  class LatLngBounds {
    constructor()
    extend(latLng: { lat: number; lng: number }): void
  }

  class Size {
    constructor(width: number, height: number)
  }

  enum SymbolPath {
    CIRCLE = 0,
    FORWARD_CLOSED_ARROW = 1,
    FORWARD_OPEN_ARROW = 2,
    BACKWARD_CLOSED_ARROW = 3,
    BACKWARD_OPEN_ARROW = 4
  }

  enum TravelMode {
    DRIVING = 'DRIVING',
    WALKING = 'WALKING',
    BICYCLING = 'BICYCLING',
    TRANSIT = 'TRANSIT'
  }

  interface DirectionsResult {
    routes: Array<{
      legs: Array<{
        distance: { text: string; value: number }
        duration: { text: string; value: number }
        steps: Array<{
          instructions: string
          distance: { text: string; value: number }
          duration: { text: string; value: number }
        }>
      }>
    }>
  }

  namespace places {
    class AutocompleteService {
      getPlacePredictions(
        request: {
          input: string
          sessionToken?: AutocompleteSessionToken
          componentRestrictions?: { country: string }
          types?: string[]
        },
        callback: (predictions: Array<{
          description: string
          place_id: string
          structured_formatting: {
            main_text: string
            secondary_text: string
          }
        }>) => void
      ): void
    }

    class AutocompleteSessionToken {
      constructor()
    }

    class PlacesService {
      constructor(map: Map | HTMLElement)
      getDetails(
        request: { placeId: string },
        callback: (
          result: {
            geometry: {
              location: {
                lat: () => number
                lng: () => number
              }
            }
          } | null,
          status: 'OK' | 'ZERO_RESULTS' | 'NOT_FOUND' | 'ERROR'
        ) => void
      ): void
    }
  }

  class Geocoder {
    geocode(
      request: { placeId: string } | { address: string },
      callback: (
        results: Array<{
          geometry: {
            location: {
              lat: () => number
              lng: () => number
            }
          }
        }>,
        status: 'OK' | 'ZERO_RESULTS' | 'NOT_FOUND' | 'ERROR'
      ) => void
    ): void
  }
} 