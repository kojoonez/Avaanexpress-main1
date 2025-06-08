'use client'

import { Star, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'

// Enhanced store data with tags and description
const stores = [
  {
    id: 1,
    name: 'Fresh Market',
    type: 'Supermarket',
    image: 'https://picsum.photos/400/300?random=1',
    rating: 4.8,
    deliveryTime: '30-45 min',
    minOrder: '$20',
    trending: '+25% orders today',
    description: 'Premium supermarket with fresh produce and organic options',
    tags: ['organic', 'fresh', 'produce', 'groceries', 'premium'],
    priceRange: '$$$'
  },
  {
    id: 2,
    name: 'Organic Valley',
    type: 'Organic',
    image: 'https://picsum.photos/400/300?random=2',
    rating: 4.6,
    deliveryTime: '40-55 min',
    minOrder: '$25',
    trending: '+15% orders today',
    description: 'Certified organic products and health foods',
    tags: ['organic', 'health', 'vegan', 'natural'],
    priceRange: '$$'
  },
  {
    id: 3,
    name: 'Local Farmers Market',
    type: 'Local Market',
    image: 'https://picsum.photos/400/300?random=3',
    rating: 4.9,
    deliveryTime: '25-40 min',
    minOrder: '$15',
    trending: '+30% orders today',
    description: 'Fresh local produce and artisanal products',
    tags: ['local', 'fresh', 'artisanal', 'produce'],
    priceRange: '$'
  },
  {
    id: 4,
    name: 'International Foods',
    type: 'International',
    image: 'https://picsum.photos/400/300?random=4',
    rating: 4.7,
    deliveryTime: '35-50 min',
    minOrder: '$30',
    trending: '+20% orders today',
    description: 'Wide selection of international and ethnic groceries',
    tags: ['international', 'ethnic', 'specialty', 'imported'],
    priceRange: '$$'
  },
  {
    id: 5,
    name: 'Budget Mart',
    type: 'Supermarket',
    image: 'https://picsum.photos/400/300?random=5',
    rating: 4.3,
    deliveryTime: '20-35 min',
    minOrder: '$10',
    trending: '+10% orders today',
    description: 'Affordable groceries and household essentials',
    tags: ['budget', 'affordable', 'essentials', 'groceries'],
    priceRange: '$'
  }
]

interface StoreGridProps {
  selectedType: string;
  selectedPrice: string;
  searchQuery: string;
}

export default function StoreGrid({ selectedType, selectedPrice, searchQuery }: StoreGridProps) {
  // Process search terms
  const processSearchTerms = (query: string): string[] => {
    return query.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 1)
  }

  // Get term variations for better matching
  const getTermVariations = (term: string): string[] => {
    const variations: Record<string, string[]> = {
      'organic': ['natural', 'healthy', 'fresh'],
      'fresh': ['organic', 'produce', 'local'],
      'local': ['fresh', 'farmers', 'artisanal'],
      'budget': ['affordable', 'cheap', 'discount'],
      'international': ['ethnic', 'imported', 'specialty'],
      'groceries': ['food', 'produce', 'essentials']
    }
    return variations[term] || [term]
  }

  // Filter stores based on selected type, price, and search query
  const filteredStores = stores.filter(store => {
    // Basic filters
    const matchesType = selectedType === 'All Stores' || store.type === selectedType
    const matchesPrice = selectedPrice === 'any' || 
      (selectedPrice === 'low' && store.priceRange === '$') ||
      (selectedPrice === 'medium' && store.priceRange === '$$') ||
      (selectedPrice === 'high' && store.priceRange === '$$$')

    // Search query matching
    if (searchQuery.trim()) {
      const searchTerms = processSearchTerms(searchQuery)
      const searchableText = [
        store.name.toLowerCase(),
        store.type.toLowerCase(),
        store.description.toLowerCase(),
        ...store.tags
      ].join(' ')

      // Check if any search term or its variations match
      const matchesSearch = searchTerms.some(term => {
        const variations = getTermVariations(term)
        return variations.some(variation => searchableText.includes(variation))
      })

      return matchesType && matchesPrice && matchesSearch
    }

    return matchesType && matchesPrice
  })

  // Sort stores by relevance if there's a search query
  const sortedStores = searchQuery.trim()
    ? filteredStores.sort((a, b) => {
        const getScore = (store: typeof stores[0]) => {
          let score = 0
          const searchTerms = processSearchTerms(searchQuery)
          const searchableText = [
            store.name.toLowerCase(),
            store.type.toLowerCase(),
            store.description.toLowerCase(),
            ...store.tags
          ].join(' ')

          searchTerms.forEach(term => {
            const variations = getTermVariations(term)
            // Name matches get highest score
            if (store.name.toLowerCase().includes(term)) score += 10
            // Type matches get high score
            if (store.type.toLowerCase().includes(term)) score += 8
            // Tag matches get medium score
            if (store.tags.some(tag => tag.includes(term))) score += 5
            // Description matches get base score
            if (store.description.toLowerCase().includes(term)) score += 3
            // Variation matches get lower scores
            variations.forEach(variation => {
              if (searchableText.includes(variation)) score += 2
            })
          })

          return score
        }

        return getScore(b) - getScore(a)
      })
    : filteredStores

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {sortedStores.map((store) => (
        <Link
          key={store.id}
          href={`/groceries/store/${store.id}`}
          className="group bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-blue transition-all"
        >
          {/* Store Image */}
          <div className="relative h-[150px] md:h-[200px] overflow-hidden">
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Store Info */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{store.type}</span>
              <div className="flex items-center text-yellow-500">
                <Star size={16} className="fill-current" />
                <span className="ml-1 text-sm">{store.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-blue transition-colors">
              {store.name}
            </h3>

            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center text-gray-400">
                <Clock size={14} className="mr-1" />
                {store.deliveryTime}
              </div>
              <div className="flex items-center text-green-500">
                <TrendingUp size={14} className="mr-1" />
                {store.trending}
              </div>
            </div>

            <div className="text-sm text-gray-400 mb-3">
              Min. order: {store.minOrder}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {store.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 