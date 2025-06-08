'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Star, Clock, Stethoscope, Phone } from 'lucide-react'
import Header from '@/components/layout/Header'
import PharmacyFilters from '@/components/features/pharmacies/PharmacyFilters'

// Mock data - In a real app, this would come from an API
const pharmacies = [
  {
    id: 1,
    name: 'HealthCare Pharmacy',
    image: 'https://picsum.photos/800/400?random=1',
    type: 'Retail',
    services: ['Prescription', 'OTC', 'Medical Supplies'],
    rating: 4.8,
    deliveryTime: '30-45 min',
    isOpen24Hours: true,
    acceptsInsurance: true,
    description: 'Full-service pharmacy with prescription and OTC medications',
    address: '123 Health St, Medical District',
    phone: '(555) 123-4567'
  },
  {
    id: 2,
    name: 'City Hospital Pharmacy',
    image: 'https://picsum.photos/800/400?random=2',
    type: 'Hospital',
    services: ['Prescription', 'Medical Supplies'],
    rating: 4.6,
    deliveryTime: '20-35 min',
    isOpen24Hours: true,
    acceptsInsurance: true,
    description: 'Hospital pharmacy providing prescriptions and medical supplies',
    address: '456 Hospital Ave, Medical Center',
    phone: '(555) 234-5678'
  },
  {
    id: 3,
    name: 'QuickMeds',
    image: 'https://picsum.photos/800/400?random=3',
    type: 'Retail',
    services: ['OTC', 'Medical Supplies'],
    rating: 4.4,
    deliveryTime: '15-30 min',
    isOpen24Hours: false,
    acceptsInsurance: false,
    description: 'Fast delivery of over-the-counter medications and supplies',
    address: '789 Quick St, Downtown',
    phone: '(555) 345-6789'
  }
]

const pharmacyTypes = ['All', 'Retail', 'Hospital', '24/7']
const serviceTypes = ['Prescription', 'OTC', 'Medical Supplies']

export default function PharmaciesPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('All')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    if (selectedType !== 'All') {
      if (selectedType === '24/7' && !pharmacy.isOpen24Hours) return false
      if (selectedType !== '24/7' && pharmacy.type !== selectedType) return false
    }
    
    if (selectedServices.length > 0) {
      if (!selectedServices.every(service => pharmacy.services.includes(service))) {
        return false
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        pharmacy.name.toLowerCase().includes(query) ||
        pharmacy.description.toLowerCase().includes(query) ||
        pharmacy.address.toLowerCase().includes(query)
      )
    }
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src="https://picsum.photos/1920/1080?random=0"
          alt="Pharmacies"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl w-full mx-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
              Find Local Pharmacies
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for pharmacies or medications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <PharmacyFilters
        types={pharmacyTypes}
        services={serviceTypes}
        selectedType={selectedType}
        selectedServices={selectedServices}
        onTypeChange={setSelectedType}
        onServiceToggle={(service) => {
          setSelectedServices(prev =>
            prev.includes(service)
              ? prev.filter(s => s !== service)
              : [...prev, service]
          )
        }}
      />

      {/* Pharmacy Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.map((pharmacy) => (
            <button
              key={pharmacy.id}
              onClick={() => router.push(`/pharmacies/${pharmacy.id}`)}
              className="group bg-card-background rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors text-left"
            >
              <div className="relative h-48">
                <Image
                  src={pharmacy.image}
                  alt={pharmacy.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {pharmacy.isOpen24Hours && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                    24/7
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-medium text-white mb-2">{pharmacy.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{pharmacy.description}</p>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm mb-4">
                  <span className="text-gray-400">{pharmacy.type}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-white">{pharmacy.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{pharmacy.deliveryTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pharmacy.services.map((service) => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{pharmacy.phone}</span>
                  </div>
                  {pharmacy.acceptsInsurance && (
                    <div className="flex items-center gap-2 text-primary-blue">
                      <Stethoscope className="w-4 h-4" />
                      <span className="text-sm">Insurance Accepted</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 