'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Star, Clock, ShoppingBag } from 'lucide-react'
import Header from '@/components/layout/Header'
import StoreFilters from '@/components/features/groceries/StoreFilters'

// Mock data - In a real app, this would come from an API
const stores = [
  {
    id: 1,
    name: 'Fresh Market',
    image: 'https://picsum.photos/800/400?random=1',
    type: 'Supermarket',
    rating: 4.8,
    deliveryTime: '20-30 min',
    minOrder: 20,
    priceRange: '$$',
    description: 'Fresh produce, groceries, and household essentials',
    tags: ['organic', 'fresh', 'local']
  },
  {
    id: 2,
    name: 'Green Grocer',
    image: 'https://picsum.photos/800/400?random=2',
    type: 'Organic Store',
    rating: 4.6,
    deliveryTime: '25-35 min',
    minOrder: 25,
    priceRange: '$$$',
    description: 'Organic and locally sourced produce',
    tags: ['organic', 'local', 'sustainable']
  },
  {
    id: 3,
    name: 'Value Mart',
    image: 'https://picsum.photos/800/400?random=3',
    type: 'Supermarket',
    rating: 4.3,
    deliveryTime: '30-45 min',
    minOrder: 15,
    priceRange: '$',
    description: 'Everyday groceries at great prices',
    tags: ['value', 'groceries']
  }
]

const storeTypes = [
  'All',
  'Supermarket',
  'Local Market',
  'Organic Store',
  'International',
  'Specialty'
]

export default function GroceriesPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStores = stores.filter(store => {
    if (selectedType !== 'All' && store.type !== selectedType) return false
    if (selectedPriceRange && store.priceRange !== selectedPriceRange) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        store.name.toLowerCase().includes(query) ||
        store.description.toLowerCase().includes(query) ||
        store.tags.some(tag => tag.toLowerCase().includes(query))
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
          alt="Groceries"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl w-full mx-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
              Order Groceries Online
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for stores or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <StoreFilters
        types={storeTypes}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={setSelectedPriceRange}
      />

      {/* Store Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <button
              key={store.id}
              onClick={() => router.push(`/groceries/${store.id}`)}
              className="group bg-card-background rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="relative h-48">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-medium text-white mb-2">{store.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{store.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">{store.type}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-white">{store.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{store.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">Min ${store.minOrder}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 