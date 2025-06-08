'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Star, Clock, Calendar, MapPin } from 'lucide-react'
import Header from '@/components/layout/Header'
import ServiceFilters from '@/components/features/health-beauty/ServiceFilters'

// Mock data - In a real app, this would come from an API
const providers = [
  {
    id: 1,
    name: 'Serenity Spa & Salon',
    image: 'https://picsum.photos/800/400?random=1',
    type: 'Spa & Salon',
    services: ['Massage', 'Facial', 'Hair', 'Nails'],
    rating: 4.8,
    totalReviews: 324,
    gender: 'Unisex',
    address: '123 Wellness St, Spa District',
    popularServices: [
      { name: 'Swedish Massage (60min)', price: 89.99 },
      { name: 'Signature Facial', price: 129.99 },
      { name: 'Hair Cut & Style', price: 69.99 }
    ],
    nextAvailable: '2024-02-10T10:00:00Z',
    description: 'Luxury spa and salon services in a serene environment'
  },
  {
    id: 2,
    name: 'Modern Men\'s Grooming',
    image: 'https://picsum.photos/800/400?random=2',
    type: 'Barber',
    services: ['Hair', 'Beard', 'Facial'],
    rating: 4.7,
    totalReviews: 156,
    gender: 'Men',
    address: '456 Style Ave, Downtown',
    popularServices: [
      { name: 'Haircut & Beard Trim', price: 45.99 },
      { name: 'Hot Towel Shave', price: 35.99 },
      { name: 'Men\'s Facial', price: 59.99 }
    ],
    nextAvailable: '2024-02-09T14:00:00Z',
    description: 'Premium grooming services for the modern gentleman'
  },
  {
    id: 3,
    name: 'Wellness Center & Spa',
    image: 'https://picsum.photos/800/400?random=3',
    type: 'Wellness',
    services: ['Massage', 'Yoga', 'Meditation', 'Acupuncture'],
    rating: 4.9,
    totalReviews: 428,
    gender: 'Unisex',
    address: '789 Zen Way, Wellness Park',
    popularServices: [
      { name: 'Deep Tissue Massage', price: 99.99 },
      { name: 'Private Yoga Session', price: 79.99 },
      { name: 'Acupuncture Treatment', price: 119.99 }
    ],
    nextAvailable: '2024-02-09T11:00:00Z',
    description: 'Holistic wellness services for mind and body'
  }
]

const categories = ['All', 'Spa', 'Salon', 'Barber', 'Wellness', 'Yoga']
const serviceTypes = ['Hair', 'Nails', 'Massage', 'Facial', 'Beard', 'Yoga', 'Meditation', 'Acupuncture']
const genderOptions = ['All', 'Men', 'Women', 'Unisex']

export default function HealthBeautyPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProviders = providers.filter(provider => {
    if (selectedCategory !== 'All' && !provider.type.includes(selectedCategory)) {
      return false
    }
    
    if (selectedServices.length > 0) {
      if (!selectedServices.some(service => provider.services.includes(service))) {
        return false
      }
    }

    if (selectedGender !== 'All' && provider.gender !== selectedGender && provider.gender !== 'Unisex') {
      return false
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        provider.name.toLowerCase().includes(query) ||
        provider.description.toLowerCase().includes(query) ||
        provider.services.some(service => service.toLowerCase().includes(query)) ||
        provider.popularServices.some(service => service.name.toLowerCase().includes(query))
      )
    }
    return true
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  }

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
          alt="Health & Beauty"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl w-full mx-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
              Book Health & Beauty Services
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for services or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ServiceFilters
        categories={categories}
        services={serviceTypes}
        genderOptions={genderOptions}
        selectedCategory={selectedCategory}
        selectedServices={selectedServices}
        selectedGender={selectedGender}
        onCategoryChange={setSelectedCategory}
        onServiceToggle={(service) => {
          setSelectedServices(prev =>
            prev.includes(service)
              ? prev.filter(s => s !== service)
              : [...prev, service]
          )
        }}
        onGenderChange={setSelectedGender}
      />

      {/* Provider Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => router.push(`/health-beauty/${provider.id}`)}
              className="group bg-card-background rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors text-left"
            >
              <div className="relative h-48">
                <Image
                  src={provider.image}
                  alt={provider.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-medium text-white mb-2">{provider.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{provider.description}</p>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm mb-4">
                  <span className="text-gray-400">{provider.type}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-white">{provider.rating}</span>
                    <span className="text-gray-400">({provider.totalReviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{provider.address}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {provider.popularServices.slice(0, 3).map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-400">{service.name}</span>
                      <span className="text-primary-blue">${service.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Next available: {formatDate(provider.nextAvailable)}
                    </span>
                  </div>
                  <span className="text-sm text-primary-blue">Book Now →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 