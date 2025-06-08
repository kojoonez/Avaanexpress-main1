'use client'

import { Star, Clock, Shield, Phone } from 'lucide-react'
import Link from 'next/link'

// Enhanced pharmacy data with tags and description
const pharmacies = [
  {
    id: 1,
    name: 'City Pharmacy',
    type: 'Retail',
    image: 'https://picsum.photos/400/300?random=1',
    rating: 4.8,
    openHours: '24/7',
    services: ['Prescription', 'OTC', 'Consultation'],
    insurance: 'Major providers accepted',
    description: 'Full-service retail pharmacy with prescription and OTC medications',
    tags: ['retail', 'prescription', 'otc', 'consultation', '24/7']
  },
  {
    id: 2,
    name: 'Hospital Pharmacy',
    type: 'Hospital',
    image: 'https://picsum.photos/400/300?random=2',
    rating: 4.9,
    openHours: '8AM - 10PM',
    services: ['Prescription', 'Medical Supplies', 'Consultation'],
    insurance: 'All insurance accepted',
    description: 'Hospital-based pharmacy with specialized medications and supplies',
    tags: ['hospital', 'prescription', 'medical supplies', 'consultation']
  },
  {
    id: 3,
    name: 'Wellness Plus',
    type: 'Specialty',
    image: 'https://picsum.photos/400/300?random=3',
    rating: 4.7,
    openHours: '9AM - 9PM',
    services: ['Specialty Meds', 'Consultation', 'Compounding'],
    insurance: 'Most insurance plans accepted',
    description: 'Specialty pharmacy focusing on compounded medications',
    tags: ['specialty', 'compounding', 'consultation', 'custom medications']
  },
  {
    id: 4,
    name: 'QuickMeds',
    type: '24/7',
    image: 'https://picsum.photos/400/300?random=4',
    rating: 4.6,
    openHours: '24/7',
    services: ['Prescription', 'OTC', 'Emergency'],
    insurance: 'Insurance verification available',
    description: '24/7 pharmacy for emergency prescriptions and medications',
    tags: ['24/7', 'emergency', 'prescription', 'otc']
  },
  {
    id: 5,
    name: 'Custom Care Pharmacy',
    type: 'Compounding',
    image: 'https://picsum.photos/400/300?random=5',
    rating: 4.8,
    openHours: '9AM - 7PM',
    services: ['Compounding', 'Consultation', 'Custom Medications'],
    insurance: 'Select insurance plans accepted',
    description: 'Specialized compounding pharmacy for custom medications',
    tags: ['compounding', 'custom medications', 'consultation']
  }
]

interface PharmacyGridProps {
  selectedType: string;
  selectedService: string;
  searchQuery: string;
}

export default function PharmacyGrid({ selectedType, selectedService, searchQuery }: PharmacyGridProps) {
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
      'prescription': ['rx', 'medicine', 'medication'],
      'otc': ['over the counter', 'medicine', 'medication'],
      'emergency': ['24/7', 'urgent', 'immediate'],
      'compounding': ['custom', 'specialized', 'personalized'],
      'consultation': ['consult', 'pharmacist', 'advice'],
      'supplies': ['medical supplies', 'equipment', 'devices']
    }
    return variations[term] || [term]
  }

  // Filter pharmacies based on selected type, service, and search query
  const filteredPharmacies = pharmacies.filter(pharmacy => {
    // Basic filters
    const matchesType = selectedType === 'All' || pharmacy.type === selectedType
    const matchesService = selectedService === 'all' || 
      pharmacy.services.some(service => 
        service.toLowerCase().includes(selectedService) ||
        pharmacy.tags.some(tag => tag.includes(selectedService))
      )

    // Search query matching
    if (searchQuery.trim()) {
      const searchTerms = processSearchTerms(searchQuery)
      const searchableText = [
        pharmacy.name.toLowerCase(),
        pharmacy.type.toLowerCase(),
        pharmacy.description.toLowerCase(),
        ...pharmacy.services.map(s => s.toLowerCase()),
        ...pharmacy.tags
      ].join(' ')

      // Check if any search term or its variations match
      const matchesSearch = searchTerms.some(term => {
        const variations = getTermVariations(term)
        return variations.some(variation => searchableText.includes(variation))
      })

      return matchesType && matchesService && matchesSearch
    }

    return matchesType && matchesService
  })

  // Sort pharmacies by relevance if there's a search query
  const sortedPharmacies = searchQuery.trim()
    ? filteredPharmacies.sort((a, b) => {
        const getScore = (pharmacy: typeof pharmacies[0]) => {
          let score = 0
          const searchTerms = processSearchTerms(searchQuery)
          const searchableText = [
            pharmacy.name.toLowerCase(),
            pharmacy.type.toLowerCase(),
            pharmacy.description.toLowerCase(),
            ...pharmacy.services.map(s => s.toLowerCase()),
            ...pharmacy.tags
          ].join(' ')

          searchTerms.forEach(term => {
            const variations = getTermVariations(term)
            // Name matches get highest score
            if (pharmacy.name.toLowerCase().includes(term)) score += 10
            // Type matches get high score
            if (pharmacy.type.toLowerCase().includes(term)) score += 8
            // Service matches get high score
            if (pharmacy.services.some(service => 
              service.toLowerCase().includes(term)
            )) score += 8
            // Tag matches get medium score
            if (pharmacy.tags.some(tag => tag.includes(term))) score += 5
            // Description matches get base score
            if (pharmacy.description.toLowerCase().includes(term)) score += 3
            // Variation matches get lower scores
            variations.forEach(variation => {
              if (searchableText.includes(variation)) score += 2
            })
          })

          return score
        }

        return getScore(b) - getScore(a)
      })
    : filteredPharmacies

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {sortedPharmacies.map((pharmacy) => (
        <Link
          key={pharmacy.id}
          href={`/pharmacies/${pharmacy.id}`}
          className="group bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-blue transition-all"
        >
          {/* Pharmacy Image */}
          <div className="relative h-[150px] md:h-[200px] overflow-hidden">
            <img
              src={pharmacy.image}
              alt={pharmacy.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Pharmacy Info */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{pharmacy.type}</span>
              <div className="flex items-center text-yellow-500">
                <Star size={16} className="fill-current" />
                <span className="ml-1 text-sm">{pharmacy.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-blue transition-colors">
              {pharmacy.name}
            </h3>

            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center text-gray-400">
                <Clock size={14} className="mr-1" />
                {pharmacy.openHours}
              </div>
              <div className="flex items-center text-gray-400">
                <Phone size={14} className="mr-1" />
                Available
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {pharmacy.services.map((service, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="flex items-center text-sm text-gray-400">
              <Shield size={14} className="mr-1" />
              {pharmacy.insurance}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 