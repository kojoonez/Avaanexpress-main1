'use client'

import { RiderMap } from '../admin/RiderMap'
import { StatusPanel } from './StatusPanel'

export function RiderDashboard() {
  // Example location - this would come from the rider's GPS in production
  const currentLocation = {
    lat: 51.5074,
    lng: -0.1278
  }

  return (
    <div className="h-screen relative">
      <RiderMap 
        location={currentLocation}
        orderId="live-view" // Using a placeholder ID for the live view
      />
      <StatusPanel />
    </div>
  )
} 