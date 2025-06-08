'use client'

import { useState, useEffect } from 'react'
import AdminDashboardNav from '@/components/AdminDashboardNav'
import { Car, User, Phone, Mail, MapPin, Star } from 'lucide-react'

interface DriverData {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
  totalDeliveries: number
  rating: number
  vehicle: {
    type: 'car' | 'motorcycle' | 'bicycle'
    model: string
    licensePlate: string
  }
  currentLocation?: {
    lat: number
    lng: number
    lastUpdated: string
  }
}

export default function DriversManagement() {
  const [drivers, setDrivers] = useState<DriverData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const [newDriver, setNewDriver] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    vehicleType: 'car',
    vehicleModel: '',
    licensePlate: '',
    password: ''
  })

  useEffect(() => {
    // Simulated data - replace with actual API call
    const mockDrivers: DriverData[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@avaan.fi',
        phone: '+358 40 1234567',
        address: 'Töölönkatu 1, Helsinki',
        status: 'active',
        joinDate: '2024-01-10',
        totalDeliveries: 156,
        rating: 4.8,
        vehicle: {
          type: 'car',
          model: 'Toyota Prius 2022',
          licensePlate: 'ABC-123'
        },
        currentLocation: {
          lat: 60.1699,
          lng: 24.9384,
          lastUpdated: '2024-03-15T12:30:00'
        }
      },
      {
        id: '2',
        name: 'Maria Garcia',
        email: 'maria.garcia@avaan.fi',
        phone: '+358 40 9876543',
        address: 'Kallio 15, Helsinki',
        status: 'active',
        joinDate: '2024-02-01',
        totalDeliveries: 89,
        rating: 4.9,
        vehicle: {
          type: 'motorcycle',
          model: 'Honda CB500F 2023',
          licensePlate: 'XYZ-789'
        }
      },
      {
        id: '3',
        name: 'Alex Johnson',
        email: 'alex.j@avaan.fi',
        phone: '+358 40 5555555',
        address: 'Punavuori 8, Helsinki',
        status: 'pending',
        joinDate: '2024-03-12',
        totalDeliveries: 0,
        rating: 0,
        vehicle: {
          type: 'bicycle',
          model: 'Trek FX3 2024',
          licensePlate: 'N/A'
        }
      }
    ]

    setDrivers(mockDrivers)
    setIsLoading(false)
  }, [])

  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Here you would make an API call to create the driver
      const newDriverData: DriverData = {
        id: Date.now().toString(),
        name: newDriver.name,
        email: newDriver.email,
        phone: newDriver.phone,
        address: newDriver.address,
        status: 'pending',
        joinDate: new Date().toISOString().split('T')[0],
        totalDeliveries: 0,
        rating: 0,
        vehicle: {
          type: newDriver.vehicleType as any,
          model: newDriver.vehicleModel,
          licensePlate: newDriver.licensePlate
        }
      }

      setDrivers(prev => [...prev, newDriverData])
      setShowAddForm(false)
      setNewDriver({
        name: '',
        email: '',
        phone: '',
        address: '',
        vehicleType: 'car',
        vehicleModel: '',
        licensePlate: '',
        password: ''
      })
    } catch (error) {
      console.error('Failed to add driver:', error)
    }
  }

  const handleStatusChange = async (driverId: string, newStatus: 'active' | 'inactive' | 'pending') => {
    // Here you would make an API call to update the driver status
    setDrivers(prev =>
      prev.map(driver =>
        driver.id === driverId ? { ...driver, status: newStatus } : driver
      )
    )
  }

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || driver.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminDashboardNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            >
              <Car className="w-5 h-5 mr-2" />
              Add New Driver
            </button>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-black"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-black"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Drivers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDrivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <User className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                        <div>
                          <div className="font-medium text-gray-900">{driver.name}</div>
                          <div className="text-sm text-gray-500">
                            Joined: {new Date(driver.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="w-4 h-4 mr-2" />
                          {driver.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-4 h-4 mr-2" />
                          {driver.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          {driver.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {driver.vehicle.type.charAt(0).toUpperCase() + driver.vehicle.type.slice(1)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {driver.vehicle.model}
                        </div>
                        <div className="text-sm text-gray-500">
                          {driver.vehicle.licensePlate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={driver.status}
                        onChange={(e) => handleStatusChange(driver.id, e.target.value as any)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          driver.status === 'active' ? 'bg-green-100 text-green-800' :
                          driver.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          Deliveries: {driver.totalDeliveries}
                        </div>
                        <div className="flex items-center text-sm text-gray-900">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {driver.rating > 0 ? `${driver.rating}/5` : 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary-blue hover:text-blue-600 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Driver Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Driver</h2>
            <form onSubmit={handleAddDriver} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newDriver.email}
                  onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={newDriver.phone}
                  onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={newDriver.address}
                  onChange={(e) => setNewDriver({ ...newDriver, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                <select
                  value={newDriver.vehicleType}
                  onChange={(e) => setNewDriver({ ...newDriver, vehicleType: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                >
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="bicycle">Bicycle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                <input
                  type="text"
                  value={newDriver.vehicleModel}
                  onChange={(e) => setNewDriver({ ...newDriver, vehicleModel: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">License Plate</label>
                <input
                  type="text"
                  value={newDriver.licensePlate}
                  onChange={(e) => setNewDriver({ ...newDriver, licensePlate: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={newDriver.password}
                  onChange={(e) => setNewDriver({ ...newDriver, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600"
                >
                  Add Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 