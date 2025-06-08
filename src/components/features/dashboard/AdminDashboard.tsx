'use client'

import { useState, useEffect } from 'react'
import { 
  Users, Store, Truck, ShoppingBag, 
  MapPin, AlertCircle, CheckCircle, XCircle,
  Edit, Trash2, MoreVertical, Eye
} from 'lucide-react'
import DashboardHeader from './DashboardHeader'
import MetricsGrid from './MetricsGrid'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Temporary token setup - Move to .env.local in production
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia29qb29uZXoiLCJhIjoiY21iYjNwdG8xMHcyYjJqc2NxaWVyYXRjZSJ9.Y2k6vkTOAKOndnqMS6Aj0A'
mapboxgl.accessToken = MAPBOX_TOKEN

// Mock data for demonstration
const stores = [
  {
    id: 1,
    name: "Joe's Restaurant",
    type: "Restaurant",
    status: "Active",
    rating: 4.5,
    orders: 1234,
    revenue: "$45,678",
    location: "123 Main St, City",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Fresh Grocery",
    type: "Grocery",
    status: "Active",
    rating: 4.8,
    orders: 2345,
    revenue: "$67,890",
    location: "456 Market St, City",
    lastActive: "5 mins ago"
  },
  // Add more stores...
]

const drivers = [
  {
    id: 1,
    name: "John Smith",
    status: "Active",
    currentOrder: "DEL-12345",
    rating: 4.7,
    totalDeliveries: 567,
    location: {
      coordinates: [-0.1278, 51.5074]
    },
    lastActive: "Now"
  },
  // Add more drivers...
]

interface TabProps {
  label: string
  icon: any
  count: number
  active: boolean
  onClick: () => void
}

function Tab({ label, icon: Icon, count, active, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-primary-blue text-white' 
          : 'hover:bg-gray-800 text-gray-400'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
      <span className={`px-2 py-0.5 rounded-full text-sm ${
        active 
          ? 'bg-blue-600' 
          : 'bg-gray-700'
      }`}>
        {count}
      </span>
    </button>
  )
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stores')
  const [selectedStore, setSelectedStore] = useState<number | null>(null)
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  // Initialize map when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-0.1278, 51.5074],
        zoom: 11
      })

      mapInstance.addControl(new mapboxgl.NavigationControl())
      setMap(mapInstance)

      return () => {
        mapInstance.remove()
      }
    }
  }, [])

  // Update driver markers on map
  useEffect(() => {
    if (!map) return

    // Remove existing markers
    const markers = document.getElementsByClassName('mapboxgl-marker')
    while (markers[0]) {
      markers[0].remove()
    }

    // Add driver markers
    drivers.forEach(driver => {
      const el = document.createElement('div')
      el.className = 'driver-marker'
      el.innerHTML = `
        <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.7a1 1 0 0 0-.8.4L2.2 11l-5.16.86a1 1 0 0 0-.84.99V16h3m16 0H2m12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
          </svg>
        </div>
      `

      new mapboxgl.Marker({ element: el })
        .setLngLat(driver.location.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <div class="font-bold">${driver.name}</div>
              <div class="text-sm">Order: ${driver.currentOrder}</div>
              <div class="text-sm">Rating: ${driver.rating}⭐</div>
            </div>
          `))
        .addTo(map)
    })
  }, [map, drivers])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage stores, drivers, and monitor system activity</p>
        </div>

        <MetricsGrid />

        <div className="mt-8 flex items-center gap-4">
          <Tab
            label="Stores"
            icon={Store}
            count={stores.length}
            active={activeTab === 'stores'}
            onClick={() => setActiveTab('stores')}
          />
          <Tab
            label="Drivers"
            icon={Truck}
            count={drivers.length}
            active={activeTab === 'drivers'}
            onClick={() => setActiveTab('drivers')}
          />
          <Tab
            label="Active Orders"
            icon={ShoppingBag}
            count={15}
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Table Panel */}
          <div className="bg-card-background rounded-lg border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold">
                {activeTab === 'stores' ? 'Store Management' : 
                 activeTab === 'drivers' ? 'Driver Management' : 
                 'Active Orders'}
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              {activeTab === 'stores' && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Store</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Type</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Orders</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Revenue</th>
                      <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stores.map((store) => (
                      <tr key={store.id} className="border-b border-gray-800 last:border-0">
                        <td className="p-4">
                          <div className="font-medium">{store.name}</div>
                          <div className="text-sm text-gray-400">{store.location}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm">
                            {store.type}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {store.status === 'Active' ? (
                              <>
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="text-green-500">Active</span>
                              </>
                            ) : (
                              <>
                                <XCircle size={16} className="text-red-500" />
                                <span className="text-red-500">Inactive</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-4">{store.orders}</td>
                        <td className="p-4">{store.revenue}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => setSelectedStore(store.id)}
                              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            >
                              <Eye size={16} className="text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                              <Edit size={16} className="text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                              <MoreVertical size={16} className="text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'drivers' && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Driver</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Current Order</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Rating</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Deliveries</th>
                      <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map((driver) => (
                      <tr key={driver.id} className="border-b border-gray-800 last:border-0">
                        <td className="p-4">
                          <div className="font-medium">{driver.name}</div>
                          <div className="text-sm text-gray-400">Last active: {driver.lastActive}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {driver.status === 'Active' ? (
                              <>
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="text-green-500">Active</span>
                              </>
                            ) : (
                              <>
                                <XCircle size={16} className="text-red-500" />
                                <span className="text-red-500">Inactive</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-4">{driver.currentOrder || '-'}</td>
                        <td className="p-4">{driver.rating}⭐</td>
                        <td className="p-4">{driver.totalDeliveries}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                              <MapPin size={16} className="text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                              <Edit size={16} className="text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                              <MoreVertical size={16} className="text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Map Panel */}
          <div className="bg-card-background rounded-lg border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold">Live Driver Tracking</h2>
            </div>
            <div id="map" className="w-full h-[600px]" />
          </div>
        </div>
      </main>
    </div>
  )
} 