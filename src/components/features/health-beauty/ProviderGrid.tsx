'use client'

import { Star, Clock, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'

// Enhanced provider data with tags and description
const providers = [
  {
    id: 1,
    name: 'Glow Beauty Spa',
    type: 'Spa & Beauty',
    image: 'https://picsum.photos/400/300?random=10',
    rating: 4.8,
    openHours: '9AM - 8PM',
    location: 'Downtown',
    services: ['Facial', 'Massage', 'Skincare'],
    popularServices: [
      { name: 'Signature Facial', price: '$89' },
      { name: 'Deep Tissue Massage', price: '$120' }
    ],
    description: 'Luxury spa offering premium beauty and wellness treatments',
    tags: ['spa', 'facial', 'massage', 'skincare', 'luxury'],
    gender: 'unisex'
  },
  {
    id: 2,
    name: 'Elite Hair Studio',
    type: 'Salon & Hair',
    image: 'https://picsum.photos/400/300?random=11',
    rating: 4.9,
    openHours: '10AM - 7PM',
    location: 'Midtown',
    services: ['Hair Cut', 'Color', 'Styling'],
    popularServices: [
      { name: 'Haircut & Style', price: '$75' },
      { name: 'Color & Highlights', price: '$150' }
    ],
    description: 'Premium hair salon specializing in cuts, color, and styling',
    tags: ['hair', 'salon', 'color', 'styling', 'premium'],
    gender: 'unisex'
  },
  {
    id: 3,
    name: 'Zen Wellness Center',
    type: 'Wellness',
    image: 'https://picsum.photos/400/300?random=12',
    rating: 4.7,
    openHours: '8AM - 9PM',
    location: 'Westside',
    services: ['Yoga', 'Massage', 'Meditation'],
    popularServices: [
      { name: 'Swedish Massage', price: '$95' },
      { name: 'Private Yoga', price: '$80' }
    ],
    description: 'Holistic wellness center offering massage, yoga, and meditation',
    tags: ['wellness', 'massage', 'yoga', 'meditation', 'holistic'],
    gender: 'unisex'
  },
  {
    id: 4,
    name: 'Luxe Nail Bar',
    type: 'Nails',
    image: 'https://picsum.photos/400/300?random=13',
    rating: 4.6,
    openHours: '10AM - 8PM',
    location: 'Eastside',
    services: ['Manicure', 'Pedicure', 'Nail Art'],
    popularServices: [
      { name: 'Gel Manicure', price: '$45' },
      { name: 'Deluxe Pedicure', price: '$65' }
    ],
    description: 'Luxury nail salon offering premium nail care services',
    tags: ['nails', 'manicure', 'pedicure', 'nail art', 'luxury'],
    gender: 'unisex'
  },
  {
    id: 5,
    name: 'Bella Beauty Lounge',
    type: 'Spa & Beauty',
    image: 'https://picsum.photos/400/300?random=14',
    rating: 4.8,
    openHours: '9AM - 7PM',
    location: 'North End',
    services: ['Makeup', 'Facial', 'Waxing'],
    popularServices: [
      { name: 'Bridal Makeup', price: '$150' },
      { name: 'Luxury Facial', price: '$120' }
    ],
    description: 'Full-service beauty lounge specializing in makeup and skincare',
    tags: ['makeup', 'facial', 'waxing', 'bridal', 'beauty'],
    gender: 'women'
  }
]

interface ProviderGridProps {
  selectedCategory: string;
  selectedTreatment: string;
  selectedGender: string;
  searchQuery: string;
}

export default function ProviderGrid({ 
  selectedCategory, 
  selectedTreatment, 
  selectedGender,
  searchQuery 
}: ProviderGridProps) {
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
      'hair': ['salon', 'haircut', 'styling', 'color'],
      'spa': ['massage', 'facial', 'wellness', 'beauty'],
      'facial': ['skincare', 'beauty', 'spa'],
      'massage': ['spa', 'wellness', 'therapy'],
      'nails': ['manicure', 'pedicure', 'nail art'],
      'makeup': ['beauty', 'cosmetics', 'bridal'],
      'wellness': ['spa', 'massage', 'yoga', 'meditation']
    }
    return variations[term] || [term]
  }

  // Filter providers based on selected category, treatment, gender, and search query
  const filteredProviders = providers.filter(provider => {
    // Basic filters
    const matchesCategory = selectedCategory === 'All' || provider.type === selectedCategory
    const matchesTreatment = selectedTreatment === 'all' || 
      provider.services.some(service => 
        service.toLowerCase().includes(selectedTreatment) ||
        provider.tags.some(tag => tag.includes(selectedTreatment))
      )
    const matchesGender = selectedGender === 'all' || provider.gender === selectedGender

    // Search query matching
    if (searchQuery.trim()) {
      const searchTerms = processSearchTerms(searchQuery)
      const searchableText = [
        provider.name.toLowerCase(),
        provider.type.toLowerCase(),
        provider.description.toLowerCase(),
        ...provider.services.map(s => s.toLowerCase()),
        ...provider.tags,
        ...provider.popularServices.map(s => s.name.toLowerCase())
      ].join(' ')

      // Check if any search term or its variations match
      const matchesSearch = searchTerms.some(term => {
        const variations = getTermVariations(term)
        return variations.some(variation => searchableText.includes(variation))
      })

      return matchesCategory && matchesTreatment && matchesGender && matchesSearch
    }

    return matchesCategory && matchesTreatment && matchesGender
  })

  // Sort providers by relevance if there's a search query
  const sortedProviders = searchQuery.trim()
    ? filteredProviders.sort((a, b) => {
        const getScore = (provider: typeof providers[0]) => {
          let score = 0
          const searchTerms = processSearchTerms(searchQuery)
          const searchableText = [
            provider.name.toLowerCase(),
            provider.type.toLowerCase(),
            provider.description.toLowerCase(),
            ...provider.services.map(s => s.toLowerCase()),
            ...provider.tags,
            ...provider.popularServices.map(s => s.name.toLowerCase())
          ].join(' ')

          searchTerms.forEach(term => {
            const variations = getTermVariations(term)
            // Name matches get highest score
            if (provider.name.toLowerCase().includes(term)) score += 10
            // Type matches get high score
            if (provider.type.toLowerCase().includes(term)) score += 8
            // Service matches get high score
            if (provider.services.some(service => 
              service.toLowerCase().includes(term)
            )) score += 8
            // Tag matches get medium score
            if (provider.tags.some(tag => tag.includes(term))) score += 5
            // Popular service matches get medium score
            if (provider.popularServices.some(service => 
              service.name.toLowerCase().includes(term)
            )) score += 5
            // Description matches get base score
            if (provider.description.toLowerCase().includes(term)) score += 3
            // Variation matches get lower scores
            variations.forEach(variation => {
              if (searchableText.includes(variation)) score += 2
            })
          })

          return score
        }

        return getScore(b) - getScore(a)
      })
    : filteredProviders

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {sortedProviders.map((provider) => (
        <Link
          key={provider.id}
          href={`/health-beauty/${provider.id}`}
          className="group bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-blue transition-all"
        >
          {/* Provider Image */}
          <div className="relative h-[150px] md:h-[200px] overflow-hidden">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Provider Info */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{provider.type}</span>
              <div className="flex items-center text-yellow-500">
                <Star size={16} className="fill-current" />
                <span className="ml-1 text-sm">{provider.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-blue transition-colors">
              {provider.name}
            </h3>

            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center text-gray-400">
                <Clock size={14} className="mr-1" />
                {provider.openHours}
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin size={14} className="mr-1" />
                {provider.location}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {provider.services.map((service, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* Popular Services */}
            <div className="space-y-2">
              {provider.popularServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm text-gray-400"
                >
                  <span>{service.name}</span>
                  <span>{service.price}</span>
                </div>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 